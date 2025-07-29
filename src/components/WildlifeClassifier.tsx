import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Camera, 
  Mic, 
  Upload, 
  Brain, 
  MapPin, 
  Thermometer, 
  TreePine, 
  Info,
  Zap,
  Eye,
  BarChart3,
  Shield
} from 'lucide-react';
import { ClassificationService } from '@/lib/classificationService';
import { AnimalInfoService } from '@/lib/animalInfoService';
import { HabitatAnalysisService } from '@/lib/habitatAnalysisService';
import { StatisticsPanel } from '@/components/StatisticsPanel';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { VideoIntro } from '@/components/VideoIntro';
import { TechnicalInfoPanel } from '@/components/TechnicalInfoPanel';

interface ClassificationResult {
  label: string;
  confidence: number;
  scientificName?: string;
}

interface AnimalInfo {
  description: string;
  diet: string;
  size: string;
  conservationStatus: string;
  interestingFacts: string[];
  habitat: string;
  lifespan: string;
  weight: string;
  dangerousFoods: string[];
  nativeLocations: string[];
  wikipediaUrl: string;
}

interface HabitatSuitability {
  suitable: boolean;
  confidence: number;
  factors: string[];
  recommendations: string[];
  climate: {
    temperature: string;
    humidity: string;
    precipitation: string;
  };
  geography: {
    elevation: string;
    terrain: string;
    biome: string;
  };
}

export const WildlifeClassifier: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);
  const [animalInfo, setAnimalInfo] = useState<AnimalInfo | null>(null);
  const [habitatSuitability, setHabitatSuitability] = useState<HabitatSuitability | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [showStatistics, setShowStatistics] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  
  const classificationService = new ClassificationService();
  const animalInfoService = new AnimalInfoService();
  const habitatAnalysisService = new HabitatAnalysisService();

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const validAudioTypes = ['audio/mp3', 'audio/wav', 'audio/mpeg'];
    
    if (!validImageTypes.includes(file.type) && !validAudioTypes.includes(file.type)) {
      toast.error('Please select a valid image (JPG, PNG, WEBP) or audio file (MP3, WAV)');
      return;
    }

    setSelectedFile(file);
    
    // Create preview for images
    if (validImageTypes.includes(file.type)) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    // Clear previous results
    setClassificationResult(null);
    setAnimalInfo(null);
    setHabitatSuitability(null);
    setActiveTab('upload');
    
    toast.success(`File selected: ${file.name}`);
  }, []);

  const handleClassify = useCallback(async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsClassifying(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Classify the animal
      const result = await classificationService.classifyAnimal(selectedFile);
      setClassificationResult(result);
      
      // Get animal information
      const info = await animalInfoService.getAnimalInfo(result.label);
      setAnimalInfo(info);
      
      // Analyze habitat suitability
      const habitat = await habitatAnalysisService.analyzeHabitat(result.label);
      setHabitatSuitability(habitat);
      
      setActiveTab('results');
      toast.success(`Successfully classified: ${result.label}`);
      
    } catch (error) {
      console.error('Classification error:', error);
      toast.error('Classification failed. Please try again.');
    } finally {
      setIsClassifying(false);
      setUploadProgress(0);
    }
  }, [selectedFile, classificationService, animalInfoService, habitatAnalysisService]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setClassificationResult(null);
    setAnimalInfo(null);
    setHabitatSuitability(null);
    setActiveTab('upload');
    setUploadProgress(0);
    
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (audioInputRef.current) audioInputRef.current.value = '';
    
    toast.success('Reset completed');
  }, []);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAudioUpload = () => {
    audioInputRef.current?.click();
  };

  if (showIntro) {
    return <VideoIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Wildlife Classification System
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Advanced neural network-powered system for identifying wildlife from images and audio. 
          Get instant species identification, habitat analysis, and conservation information.
        </p>
      </div>

      {/* Statistics Toggle */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => setShowStatistics(!showStatistics)}
          className="gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          {showStatistics ? 'Hide' : 'Show'} Statistics
        </Button>
      </div>

      {/* Statistics Panel */}
      {showStatistics && (
        <div className="space-y-6">
          <StatisticsPanel />
          <TechnicalInfoPanel />
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!classificationResult} className="gap-2">
            <Eye className="w-4 h-4" />
            Classification
          </TabsTrigger>
          <TabsTrigger value="habitat" disabled={!habitatSuitability} className="gap-2">
            <MapPin className="w-4 h-4" />
            Habitat Analysis
          </TabsTrigger>
          <TabsTrigger value="info" disabled={!animalInfo} className="gap-2">
            <Info className="w-4 h-4" />
            Species Info
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Neural Network Classification
              </CardTitle>
              <CardDescription>
                Upload an image or audio file to identify wildlife species using advanced AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="upload" 
                  size="xl" 
                  onClick={handleImageUpload}
                  className="h-32 flex-col gap-3"
                >
                  <Camera className="w-8 h-8" />
                  <span className="text-lg font-semibold">Upload Image</span>
                  <span className="text-sm opacity-80">JPG, PNG, WEBP</span>
                </Button>
                
                <Button 
                  variant="upload" 
                  size="xl" 
                  onClick={handleAudioUpload}
                  className="h-32 flex-col gap-3"
                >
                  <Mic className="w-8 h-8" />
                  <span className="text-lg font-semibold">Upload Audio</span>
                  <span className="text-sm opacity-80">MP3, WAV</span>
                </Button>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Preview */}
              {selectedFile && (
                <Card className="bg-gradient-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{selectedFile.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedFile.type} • {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Badge variant="secondary">{selectedFile.type.startsWith('image') ? 'Image' : 'Audio'}</Badge>
                    </div>
                    
                    {previewUrl && (
                      <div className="mb-4">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-full max-w-md mx-auto rounded-lg shadow-nature"
                        />
                      </div>
                    )}

                    {/* Upload Progress */}
                    {isClassifying && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Processing...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="w-full" />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <Button 
                        variant="hero" 
                        onClick={handleClassify} 
                        disabled={isClassifying}
                        className="flex-1 gap-2"
                      >
                        {isClassifying ? <LoadingSpinner /> : <Zap className="w-4 h-4" />}
                        {isClassifying ? 'Classifying...' : 'Classify Wildlife'}
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          {classificationResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Classification Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
                  <div>
                    <h3 className="text-2xl font-bold">{classificationResult.label}</h3>
                    {classificationResult.scientificName && (
                      <p className="text-muted-foreground italic">{classificationResult.scientificName}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="text-3xl font-bold text-nature">
                      {(classificationResult.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Classification Confidence</span>
                    <span>{(classificationResult.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={classificationResult.confidence * 100} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Habitat Tab */}
        <TabsContent value="habitat" className="space-y-6">
          {habitatSuitability && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Habitat Suitability Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className={`p-4 rounded-lg border-2 ${
                  habitatSuitability.suitable 
                    ? 'bg-nature/10 border-nature' 
                    : 'bg-destructive/10 border-destructive'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">
                      {habitatSuitability.suitable ? 'Suitable Habitat' : 'Unsuitable Habitat'}
                    </h3>
                    <Badge variant={habitatSuitability.suitable ? 'default' : 'destructive'}>
                      {(habitatSuitability.confidence * 100).toFixed(0)}% Confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on environmental factors and species requirements
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Climate Factors */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Thermometer className="w-4 h-4" />
                        Climate Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Temperature</p>
                        <p className="text-sm text-muted-foreground">{habitatSuitability.climate.temperature}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Humidity</p>
                        <p className="text-sm text-muted-foreground">{habitatSuitability.climate.humidity}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Precipitation</p>
                        <p className="text-sm text-muted-foreground">{habitatSuitability.climate.precipitation}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Geographic Factors */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TreePine className="w-4 h-4" />
                        Geographic Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Elevation</p>
                        <p className="text-sm text-muted-foreground">{habitatSuitability.geography.elevation}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Terrain</p>
                        <p className="text-sm text-muted-foreground">{habitatSuitability.geography.terrain}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Biome</p>
                        <p className="text-sm text-muted-foreground">{habitatSuitability.geography.biome}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Factors and Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Factors</h4>
                    <ul className="space-y-2">
                      {habitatSuitability.factors.map((factor, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Badge variant="outline" className="mt-0.5">•</Badge>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {habitatSuitability.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Badge variant="secondary" className="mt-0.5">→</Badge>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Info Tab */}
        <TabsContent value="info" className="space-y-6">
          {animalInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Species Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <h3>Description</h3>
                  <p>{animalInfo.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Physical Characteristics</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Size: </span>
                        <span className="text-muted-foreground">{animalInfo.size}</span>
                      </div>
                      <div>
                        <span className="font-medium">Weight: </span>
                        <span className="text-muted-foreground">{animalInfo.weight}</span>
                      </div>
                      <div>
                        <span className="font-medium">Lifespan: </span>
                        <span className="text-muted-foreground">{animalInfo.lifespan}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Ecology</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Diet: </span>
                        <span className="text-muted-foreground">{animalInfo.diet}</span>
                      </div>
                      <div>
                        <span className="font-medium">Habitat: </span>
                        <span className="text-muted-foreground">{animalInfo.habitat}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Conservation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <Badge 
                          variant={animalInfo.conservationStatus.includes('Endangered') ? 'destructive' : 'default'}
                        >
                          {animalInfo.conservationStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Native Locations</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {animalInfo.nativeLocations.map((location, index) => (
                      <Badge key={index} variant="secondary">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3 text-red-600">⚠️ Dangerous Foods - Never Feed</h4>
                  <ul className="space-y-2">
                    {animalInfo.dangerousFoods.map((food, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Badge variant="destructive" className="mt-1">⚠️</Badge>
                        {food}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Interesting Facts</h4>
                  <ul className="space-y-2">
                    {animalInfo.interestingFacts.map((fact, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Badge variant="outline" className="mt-1">•</Badge>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Learn More</h4>
                  <Button
                    variant="outline"
                    onClick={() => window.open(animalInfo.wikipediaUrl, '_blank')}
                    className="gap-2"
                  >
                    <Info className="w-4 h-4" />
                    View on Wikipedia
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};