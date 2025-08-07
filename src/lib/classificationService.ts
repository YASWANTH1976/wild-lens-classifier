import { HuggingFaceService } from './huggingFaceService';

interface ClassificationResult {
  label: string;
  confidence: number;
  scientificName?: string;
  taxonomy?: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
}

export class ClassificationService {
  private huggingFaceService = new HuggingFaceService();

  async classifyAnimal(file: File): Promise<ClassificationResult> {
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('Please upload a valid image file');
    }

    if (file.size > 15 * 1024 * 1024) {
      throw new Error('Image too large. Please use an image smaller than 15MB');
    }

    try {
      console.log('🔍 Starting wildlife classification with Hugging Face Transformers...');
      
      return await this.huggingFaceService.classifyAnimal(file);

    } catch (error) {
      console.error('❌ Classification failed completely:', error);
      
      // Last resort fallback
      return {
        label: 'Classification unavailable',
        confidence: 0.1,
        scientificName: 'Please check your internet connection and try again'
      };
    }
  }

  // Get model information for display
  getModelInfo() {
    return this.huggingFaceService.getModelInfo();
  }

  getSupportedSpeciesCount(): number {
    return 50; // Now supporting 50+ animal species with comprehensive database
  }

  async getSimilarAnimals(animalLabel: string): Promise<string[]> {
    return await this.huggingFaceService.getSimilarAnimals(animalLabel);
  }
}