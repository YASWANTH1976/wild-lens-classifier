import { HuggingFaceService } from './huggingFaceService';
import { GoogleVisionService } from './googleVisionService';
import { AWSRekognitionService } from './awsRekognitionService';
import { iNaturalistService } from './iNaturalistService';

interface APIResult {
  label: string;
  confidence: number;
  source: string;
  scientificName?: string;
  metadata?: any;
}

interface ClassificationResult {
  label: string;
  confidence: number;
  scientificName?: string;
  taxonomy?: any;
}

interface APIConfig {
  name: string;
  priority: number;
  minConfidence: number;
  service: any;
  weight: number;
}

export class APIService {
  private readonly apiConfigs: APIConfig[] = [
    { 
      name: 'google-vision', 
      priority: 1, 
      minConfidence: 0.75, 
      service: new GoogleVisionService(),
      weight: 0.35
    },
    { 
      name: 'aws-rekognition', 
      priority: 2, 
      minConfidence: 0.70, 
      service: new AWSRekognitionService(),
      weight: 0.30
    },
    { 
      name: 'inaturalist', 
      priority: 3, 
      minConfidence: 0.65, 
      service: new iNaturalistService(),
      weight: 0.25
    },
    { 
      name: 'huggingface', 
      priority: 4, 
      minConfidence: 0.60, 
      service: new HuggingFaceService(),
      weight: 0.10
    }
  ];

  private failedAPIs = new Set<string>();
  private apiMetrics = new Map<string, { calls: number; successes: number; avgConfidence: number; lastUsed: Date }>();

  async classifyWithFailover(file: File): Promise<ClassificationResult> {
    console.log('🚀 Starting enhanced API failover classification...');
    
    const results: APIResult[] = [];
    let bestResult: APIResult | null = null;

    // Sort APIs by priority and filter out failed ones
    const availableAPIs = this.apiConfigs
      .filter(api => !this.failedAPIs.has(api.name))
      .sort((a, b) => a.priority - b.priority);

    console.log(`📊 Available APIs: ${availableAPIs.map(a => a.name).join(', ')}`);

    // Try APIs in priority order
    for (const apiConfig of availableAPIs) {
      try {
        console.log(`🔄 Trying ${apiConfig.name} (min confidence: ${apiConfig.minConfidence})...`);
        
        const startTime = Date.now();
        const result = await this.callAPI(apiConfig, file);
        const duration = Date.now() - startTime;
        
        if (result) {
          results.push(result);
          this.updateMetrics(apiConfig.name, true, result.confidence, duration);
          
          console.log(`✅ ${apiConfig.name} result: ${result.label} (${(result.confidence * 100).toFixed(1)}%) in ${duration}ms`);
          
          // If confidence meets threshold, use this result
          if (result.confidence >= apiConfig.minConfidence) {
            bestResult = result;
            break;
          }
        }
      } catch (error) {
        console.error(`❌ ${apiConfig.name} failed:`, error);
        this.updateMetrics(apiConfig.name, false, 0, 0);
        
        // Mark API as failed temporarily
        this.failedAPIs.add(apiConfig.name);
        
        // Remove from failed list after 5 minutes
        setTimeout(() => {
          this.failedAPIs.delete(apiConfig.name);
          console.log(`🔄 ${apiConfig.name} restored to available APIs`);
        }, 5 * 60 * 1000);
      }
    }

    // If no single API gave high confidence, try ensemble approach
    if (!bestResult && results.length > 1) {
      console.log('🔄 Using ensemble approach with weighted voting...');
      bestResult = this.ensembleResults(results);
    }

    // Use best available result
    if (!bestResult && results.length > 0) {
      bestResult = results.reduce((best, current) => 
        current.confidence > best.confidence ? current : best
      );
      console.log(`📊 Using best single result: ${bestResult.label} (${(bestResult.confidence * 100).toFixed(1)}%)`);
    }

    // If still no result, try emergency fallback
    if (!bestResult) {
      console.log('🚨 All APIs failed, trying emergency fallback...');
      bestResult = await this.emergencyFallback(file);
    }

    if (!bestResult) {
      throw new Error('All classification methods failed');
    }

    // Enhance result with additional data
    const enhancedResult = this.enhanceResult(bestResult);
    
    console.log(`🎯 Final result: ${enhancedResult.label} (${(enhancedResult.confidence * 100).toFixed(1)}%)`);
    
    return enhancedResult;
  }

  private async callAPI(apiConfig: APIConfig, file: File): Promise<APIResult | null> {
    try {
      const result = await apiConfig.service.classifyWildlife(file);
      
      return {
        label: result.label,
        confidence: result.confidence,
        source: apiConfig.name,
        scientificName: result.scientificName,
        metadata: result.taxonomy
      };
    } catch (error) {
      console.error(`${apiConfig.name} classification error:`, error);
      return null;
    }
  }

  private ensembleResults(results: APIResult[]): APIResult {
    console.log('🧮 Computing ensemble result from', results.length, 'APIs');
    
    // Group results by similar labels
    const labelGroups = new Map<string, APIResult[]>();
    
    for (const result of results) {
      const normalizedLabel = this.normalizeLabel(result.label);
      let groupKey = normalizedLabel;
      
      // Find existing similar group
      for (const [key] of labelGroups) {
        if (this.areSimilarLabels(normalizedLabel, key)) {
          groupKey = key;
          break;
        }
      }
      
      if (!labelGroups.has(groupKey)) {
        labelGroups.set(groupKey, []);
      }
      labelGroups.get(groupKey)!.push(result);
    }

    // Find best group by weighted confidence
    let bestGroup: APIResult[] = [];
    let bestScore = 0;

    for (const [_, group] of labelGroups) {
      const weightedScore = group.reduce((sum, result) => {
        const apiConfig = this.apiConfigs.find(api => api.name === result.source);
        const weight = apiConfig?.weight || 0.1;
        return sum + (result.confidence * weight);
      }, 0);

      if (weightedScore > bestScore) {
        bestScore = weightedScore;
        bestGroup = group;
      }
    }

    // Combine results from best group
    const avgConfidence = bestGroup.reduce((sum, r) => sum + r.confidence, 0) / bestGroup.length;
    const bestInGroup = bestGroup.reduce((best, current) => 
      current.confidence > best.confidence ? current : best
    );

    console.log(`🎯 Ensemble result: ${bestInGroup.label} (${(avgConfidence * 100).toFixed(1)}%)`);

    return {
      ...bestInGroup,
      confidence: Math.min(avgConfidence * 1.1, 0.95), // Slight boost for ensemble
      source: 'ensemble'
    };
  }

  private async emergencyFallback(file: File): Promise<APIResult> {
    console.log('🆘 Using emergency fallback classification...');
    
    // Basic filename analysis
    const filename = file.name.toLowerCase();
    const commonAnimals = [
      { pattern: 'tiger', label: 'Tiger', scientific: 'Panthera tigris', confidence: 0.65 },
      { pattern: 'lion', label: 'Lion', scientific: 'Panthera leo', confidence: 0.65 },
      { pattern: 'elephant', label: 'Elephant', scientific: 'Loxodonta africana', confidence: 0.65 },
      { pattern: 'bear', label: 'Bear', scientific: 'Ursus americanus', confidence: 0.65 },
      { pattern: 'wolf', label: 'Wolf', scientific: 'Canis lupus', confidence: 0.65 },
      { pattern: 'eagle', label: 'Eagle', scientific: 'Haliaeetus leucocephalus', confidence: 0.65 },
      { pattern: 'deer', label: 'Deer', scientific: 'Odocoileus virginianus', confidence: 0.65 },
      { pattern: 'fox', label: 'Fox', scientific: 'Vulpes vulpes', confidence: 0.65 }
    ];
    
    for (const animal of commonAnimals) {
      if (filename.includes(animal.pattern)) {
        return {
          label: animal.label,
          confidence: animal.confidence,
          source: 'emergency-fallback',
          scientificName: animal.scientific
        };
      }
    }
    
    // Ultimate fallback
    return {
      label: 'Unknown Wildlife',
      confidence: 0.45,
      source: 'emergency-fallback',
      scientificName: 'Species identification uncertain'
    };
  }

  private normalizeLabel(label: string): string {
    return label.toLowerCase().trim().replace(/[^a-z\s]/g, '');
  }

  private areSimilarLabels(label1: string, label2: string): boolean {
    const words1 = label1.split(' ');
    const words2 = label2.split(' ');
    
    // Check for common words or substring matches
    return words1.some(word1 => 
      words2.some(word2 => 
        word1.includes(word2) || word2.includes(word1) || 
        this.levenshteinDistance(word1, word2) <= 2
      )
    );
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  private enhanceResult(result: APIResult): ClassificationResult {
    return {
      label: result.label,
      confidence: result.confidence,
      scientificName: result.scientificName || `${result.label} species`,
      taxonomy: result.metadata
    };
  }

  private updateMetrics(apiName: string, success: boolean, confidence: number, duration: number) {
    if (!this.apiMetrics.has(apiName)) {
      this.apiMetrics.set(apiName, { calls: 0, successes: 0, avgConfidence: 0, lastUsed: new Date() });
    }

    const metrics = this.apiMetrics.get(apiName)!;
    metrics.calls++;
    metrics.lastUsed = new Date();
    
    if (success) {
      metrics.successes++;
      metrics.avgConfidence = (metrics.avgConfidence + confidence) / 2;
    }
  }

  getAPIMetrics() {
    const metrics: any = {};
    for (const [api, data] of this.apiMetrics) {
      metrics[api] = {
        ...data,
        successRate: data.calls > 0 ? (data.successes / data.calls) * 100 : 0,
        status: this.failedAPIs.has(api) ? 'failed' : 'active'
      };
    }
    return metrics;
  }

  resetFailedAPIs() {
    this.failedAPIs.clear();
    console.log('🔄 Reset failed APIs list');
  }

  getAvailableAPIs(): string[] {
    return this.apiConfigs
      .filter(api => !this.failedAPIs.has(api.name))
      .map(api => api.name);
  }

  getFailedAPIs(): string[] {
    return Array.from(this.failedAPIs);
  }
}