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
  Upload, 
  Brain, 
  MapPin, 
  Thermometer, 
  TreePine, 
  Info,
  Zap,
  Eye,
  BarChart3,
  Shield,
  Globe,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { ClassificationService } from '@/lib/classificationService';
import { AnimalInfoService } from '@/lib/animalInfoService';
import { HabitatAnalysisService } from '@/lib/habitatAnalysisService';
import { StatisticsPanel } from '@/components/StatisticsPanel';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { VideoIntro } from '@/components/VideoIntro';
import { TechnicalInfoPanel } from '@/components/TechnicalInfoPanel';
import { ConservationAlerts } from '@/components/ConservationAlerts';
import { AnimalSizeComparison } from '@/components/AnimalSizeComparison';
import { WildlifePhotographyTips } from '@/components/WildlifePhotographyTips';
import { EcoTourismRecommendations } from '@/components/EcoTourismRecommendations';
import { AnimalSoundLibrary } from '@/components/AnimalSoundLibrary';
import { ResearchDataExport } from '@/components/ResearchDataExport';
import { BatchProcessing } from '@/components/BatchProcessing';
import { CitizenSciencePortal } from '@/components/CitizenSciencePortal';
import { WildlifeMonitoringDashboard } from '@/components/WildlifeMonitoringDashboard';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);
  const [animalInfo, setAnimalInfo] = useState<AnimalInfo | null>(null);
  const [habitatSuitability, setHabitatSuitability] = useState<HabitatSuitability | null>(null);
  const [showWebSearch, setShowWebSearch] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showStatistics, setShowStatistics] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const classificationService = new ClassificationService();
  const animalInfoService = new AnimalInfoService();
  const habitatAnalysisService = new HabitatAnalysisService();

  console.log('🔍 WildlifeClassifier Debug:', { 
    showIntro, 
    showStatistics, 
    classificationResult: !!classificationResult,
    animalInfo: !!animalInfo,
    habitatSuitability: !!habitatSuitability 
  });

  if (showIntro) {
    console.log('🎬 Showing video intro');
    return <VideoIntro onComplete={() => setShowIntro(false)} />;
  }

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('Image too large. Please use an image smaller than 15MB');
      return;
    }

    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    
    // Reset previous results
    setClassificationResult(null);
    setAnimalInfo(null);
    setHabitatSuitability(null);
    
    toast.success('Image uploaded successfully!');
  }, []);

  const handleClassification = useCallback(async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setIsLoading(true);
    
    try {
      toast.info('🧠 Analyzing with advanced AI models...');
      
      // Classification
      const result = await classificationService.classifyAnimal(selectedFile);
      setClassificationResult(result);
      
      if (result.confidence < 0.60) {
        toast.warning(`⚠️ Low confidence: ${result.label} (${(result.confidence * 100).toFixed(1)}%)`);
      } else {
        toast.success(`✅ Identified: ${result.label} (${(result.confidence * 100).toFixed(1)}%)`);
      }
      
      // Get detailed info
      const info = await animalInfoService.getAnimalInfo(result.label);
      setAnimalInfo(info);
      
      // Habitat analysis
      const habitat = await habitatAnalysisService.analyzeHabitat(result.label);
      setHabitatSuitability(habitat);
      
    } catch (error) {
      console.error('Classification error:', error);
      toast.error('Classification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, classificationService, animalInfoService, habitatAnalysisService]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setSelectedImage(null);
    setClassificationResult(null);
    setAnimalInfo(null);
    setHabitatSuitability(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast.success('Reset completed');
  }, []);

  return (
    <div className="min-h-screen wildlife-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            🦁 Wildlife Classifier
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Advanced AI-powered wildlife identification system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="wildlife-card p-8 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center text-emerald-700 mb-2">
                Upload Wildlife Image
              </CardTitle>
              <p className="text-center text-gray-600">
                Identify any wildlife species with AI precision
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  ref={fileInputRef}
                  disabled={isLoading}
                />
                <div className="space-y-4">
                  <Button 
                    variant="hero"
                    size="xl"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="w-full text-lg py-6 rounded-xl"
                  >
                    <Upload className="w-6 h-6 mr-3" />
                    Choose Image from Device
                  </Button>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <span className="text-sm text-gray-500 bg-white px-3 rounded-full">or</span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                  </div>
                  
                  <Button 
                    variant="upload"
                    size="xl"
                    onClick={() => window.open('https://unsplash.com/s/photos/wildlife', '_blank')}
                    disabled={isLoading}
                    className="w-full text-lg py-6 rounded-xl"
                  >
                    <Globe className="w-6 h-6 mr-3" />
                    Search Wildlife Images Online
                  </Button>
                </div>
              </div>

              {isLoading && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <LoadingSpinner />
                    <span className="font-medium text-blue-800">Processing...</span>
                  </div>
                  <p className="text-sm text-blue-600">
                    Using advanced AI models for accurate species identification
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="wildlife-card p-8 rounded-2xl">
            {selectedImage ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <img 
                      src={selectedImage} 
                      alt="Selected wildlife" 
                      className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover border-4 border-white/50"
                      style={{ maxHeight: '320px' }}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={handleClassification}
                    disabled={isLoading}
                    variant="nature"
                    size="xl"
                    className="text-lg py-6 px-8 rounded-xl min-w-[140px]"
                  >
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <Brain className="w-6 h-6 mr-3" />
                        Classify
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    size="xl"
                    className="text-lg py-6 px-8 rounded-xl border-2 hover:bg-gray-50"
                  >
                    <RotateCcw className="w-6 h-6 mr-3" />
                    Reset
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <div className="relative">
                  <Camera className="w-20 h-20 mx-auto mb-6 opacity-30" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 border-4 border-emerald-200 rounded-full animate-ping"></div>
                </div>
                <p className="text-xl font-medium text-gray-600 mb-2">No Image Selected</p>
                <p className="text-gray-500">Upload an image to begin wildlife identification</p>
              </div>
            )}
          </Card>
        </div>

        {/* Classification Results */}
        {classificationResult && (
          <div className="mt-8">
            <Card className="species-card p-8 rounded-2xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-emerald-800 mb-2">
                  {classificationResult.label}
                </h2>
                <p className="text-lg text-emerald-600 italic">
                  {classificationResult.scientificName}
                </p>
                <div className="flex justify-center mt-4">
                  <Badge 
                    variant={classificationResult.confidence > 0.8 ? "default" : 
                             classificationResult.confidence > 0.6 ? "secondary" : "destructive"}
                    className="text-sm px-4 py-2"
                  >
                    {(classificationResult.confidence * 100).toFixed(1)}% Confidence
                  </Badge>
                </div>
              </div>

              {/* Enhanced Tabs for All Information */}
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 gap-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="habitat">Habitat</TabsTrigger>
                  <TabsTrigger value="conservation">Conservation</TabsTrigger>
                  <TabsTrigger value="size">Size</TabsTrigger>
                  <TabsTrigger value="photography">Photography</TabsTrigger>
                  <TabsTrigger value="tourism">Eco-Tourism</TabsTrigger>
                  <TabsTrigger value="sounds">Sounds</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6">
                  {animalInfo && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-emerald-700 mb-2">Description</h4>
                          <p className="text-gray-700">{animalInfo.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-700 mb-2">Diet</h4>
                          <p className="text-gray-700">{animalInfo.diet}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-700 mb-2">Conservation Status</h4>
                          <Badge variant="outline" className="text-sm">
                            {animalInfo.conservationStatus}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-emerald-700 mb-2">Physical Characteristics</h4>
                          <p className="text-gray-700">Size: {animalInfo.size}</p>
                          <p className="text-gray-700">Weight: {animalInfo.weight}</p>
                          <p className="text-gray-700">Lifespan: {animalInfo.lifespan}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-700 mb-2">Interesting Facts</h4>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {animalInfo.interestingFacts.map((fact, index) => (
                              <li key={index} className="text-sm">{fact}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="habitat" className="mt-6">
                  {habitatSuitability && (
                    <div className="space-y-6">
                      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                        <h4 className="font-semibold text-emerald-800 mb-4">Habitat Analysis</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-emerald-700 mb-2">Climate Requirements</h5>
                            <p className="text-sm text-gray-700">Temperature: {habitatSuitability.climate.temperature}</p>
                            <p className="text-sm text-gray-700">Humidity: {habitatSuitability.climate.humidity}</p>
                            <p className="text-sm text-gray-700">Precipitation: {habitatSuitability.climate.precipitation}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-emerald-700 mb-2">Geographic Features</h5>
                            <p className="text-sm text-gray-700">Elevation: {habitatSuitability.geography.elevation}</p>
                            <p className="text-sm text-gray-700">Terrain: {habitatSuitability.geography.terrain}</p>
                            <p className="text-sm text-gray-700">Biome: {habitatSuitability.geography.biome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="conservation" className="mt-6">
                  <ConservationAlerts 
                    animalName={classificationResult.label} 
                    conservationStatus={animalInfo?.conservationStatus || "Unknown"}
                  />
                </TabsContent>

                <TabsContent value="size" className="mt-6">
                  <AnimalSizeComparison 
                    animalName={classificationResult.label}
                    size={animalInfo?.size || "Unknown"}
                    weight={animalInfo?.weight || "Unknown"}
                  />
                </TabsContent>

                <TabsContent value="photography" className="mt-6">
                  <WildlifePhotographyTips 
                    animalName={classificationResult.label} 
                    habitat={animalInfo?.habitat || "Various habitats"} 
                  />
                </TabsContent>

                <TabsContent value="tourism" className="mt-6">
                  <EcoTourismRecommendations 
                    animalName={classificationResult.label}
                    nativeLocations={animalInfo?.nativeLocations || []}
                  />
                </TabsContent>

                <TabsContent value="sounds" className="mt-6">
                  <AnimalSoundLibrary animalName={classificationResult.label} />
                </TabsContent>

                <TabsContent value="research" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResearchDataExport classificationData={classificationResult ? [{
                      id: crypto.randomUUID(),
                      timestamp: new Date(),
                      species: classificationResult.label,
                      confidence: classificationResult.confidence,
                      scientificName: classificationResult.scientificName || 'Unknown',
                      habitat: animalInfo?.habitat || 'Unknown',
                      conservationStatus: animalInfo?.conservationStatus || 'Unknown',
                      imageUrl: selectedImage || undefined
                    }] : []} />
                    <CitizenSciencePortal />
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        )}

        {/* Additional Features */}
        <div className="mt-8 space-y-6">
          {/* Statistics and Technical Info */}
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowStatistics(!showStatistics)}
              className="bg-white/90 backdrop-blur-sm"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              {showStatistics ? 'Hide' : 'Show'} System Statistics
            </Button>
          </div>

          {showStatistics && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatisticsPanel />
              <TechnicalInfoPanel />
            </div>
          )}

          {/* Advanced Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="wildlife-card p-6 rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-700">Batch Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <BatchProcessing onBatchComplete={() => toast.success('Batch processing completed!')} />
              </CardContent>
            </Card>

            <Card className="wildlife-card p-6 rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-700">Wildlife Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <WildlifeMonitoringDashboard />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};