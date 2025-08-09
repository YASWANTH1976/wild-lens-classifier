import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Camera, 
  Upload, 
  Brain, 
  Shield,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Globe,
  RefreshCw,
  TrendingUp,
  Clock,
  Activity
} from 'lucide-react';
import { WildlifeRecognitionService } from '@/lib/wildlifeRecognitionService';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface WildlifeRecognitionResult {
  isWild: boolean;
  commonName?: string;
  scientificName?: string;
  message?: string;
  confidence?: number;
  apiSource?: string;
  suggestions?: string[];
}

export const WildlifeRecognitionClassifier: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<WildlifeRecognitionResult | null>(null);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [apiMetrics, setApiMetrics] = useState<any>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wildlifeRecognitionService = React.useMemo(() => new WildlifeRecognitionService(), []);

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
    setRecognitionResult(null);
    setProcessingStep('');
    setProcessingProgress(0);
    
    toast.success('Image uploaded successfully!');
  }, []);

  const handleRecognition = useCallback(async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setIsLoading(true);
    setProcessingStep('Initializing AI models...');
    setProcessingProgress(10);
    
    try {
      toast.info('🚀 Starting advanced wildlife recognition...');
      
      // Simulate progressive loading
      const progressSteps = [
        { step: 'Preprocessing image...', progress: 20 },
        { step: 'Trying Google Vision API...', progress: 30 },
        { step: 'Analyzing with AWS Rekognition...', progress: 50 },
        { step: 'Checking iNaturalist database...', progress: 70 },
        { step: 'Processing results...', progress: 85 },
        { step: 'Finalizing classification...', progress: 95 }
      ];

      for (const { step, progress } of progressSteps) {
        setProcessingStep(step);
        setProcessingProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Actual recognition
      const result = await wildlifeRecognitionService.recognizeWildlife(selectedFile);
      
      setProcessingStep('Recognition complete!');
      setProcessingProgress(100);
      
      setRecognitionResult(result);
      setApiMetrics(wildlifeRecognitionService.getAPIMetrics());
      
      // Success feedback
      if (result.isWild && result.confidence && result.confidence > 0.8) {
        toast.success(`✅ High confidence: ${result.commonName} (${(result.confidence * 100).toFixed(1)}%)`);
      } else if (result.isWild) {
        toast.success(`✅ Wild animal identified: ${result.commonName}`);
      } else {
        toast.info('ℹ️ This is not a wild animal');
      }
      
    } catch (error) {
      console.error('Recognition error:', error);
      setProcessingStep('Recognition failed');
      setProcessingProgress(0);
      toast.error('Recognition failed. Please check your connection and try again.');
      
      // Show error result with suggestions
      setRecognitionResult({
        isWild: false,
        message: "Classification temporarily unavailable. Please try again.",
        confidence: 0.1,
        apiSource: 'error',
        suggestions: [
          'Check your internet connection',
          'Try a different image',
          'Ensure the animal is clearly visible',
          'Contact support if the issue persists'
        ]
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setProcessingStep('');
        setProcessingProgress(0);
      }, 2000);
    }
  }, [selectedFile, wildlifeRecognitionService]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setSelectedImage(null);
    setRecognitionResult(null);
    setProcessingStep('');
    setProcessingProgress(0);
    setApiMetrics({});
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast.success('Reset completed');
  }, []);

  const handleRetryWithDifferentAPI = useCallback(async () => {
    if (!selectedFile) return;
    
    wildlifeRecognitionService.resetFailedAPIs();
    toast.info('🔄 Retrying with different APIs...');
    await handleRecognition();
  }, [selectedFile, wildlifeRecognitionService, handleRecognition]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          Wildlife Recognition System
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Expert wildlife recognition with multi-API failover. Upload an image to identify wild animals 
          or confirm if it's not a wild animal with scientific accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="wildlife-card border-0 shadow-nature">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Camera className="w-6 h-6 text-nature" />
              Upload Image
            </CardTitle>
            <CardDescription className="text-base">
              Upload an image of an animal for expert wildlife recognition
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-nature/30 rounded-xl p-8 text-center bg-gradient-to-br from-nature/5 to-accent/5">
              {selectedImage ? (
                <div className="space-y-4">
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Selected" 
                      className="max-w-full h-64 object-cover rounded-xl mx-auto shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 hover:border-nature/50"
                    disabled={isLoading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <Camera className="w-20 h-20 text-nature/40 mx-auto" />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 border-4 border-nature/20 rounded-full animate-ping" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-foreground mb-2">Upload an image</p>
                    <p className="text-muted-foreground">
                      PNG, JPG, or JPEG up to 15MB
                    </p>
                  </div>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose File
                  </Button>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <div className="flex gap-3">
              <Button 
                onClick={handleRecognition}
                disabled={!selectedFile || isLoading}
                variant="nature"
                size="xl"
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner className="w-5 h-5 mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Recognize Wildlife
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleReset}
                disabled={isLoading}
                size="xl"
                className="border-2"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Enhanced Processing Status */}
            {isLoading && (
              <div className="bg-gradient-to-r from-blue-50 to-nature/10 dark:from-blue-950/20 dark:to-nature/10 p-4 rounded-xl border border-blue-200/50">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <LoadingSpinner size="sm" />
                    <span className="font-medium text-blue-700 dark:text-blue-300">
                      {processingStep}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{processingProgress}%</span>
                    </div>
                    <Progress value={processingProgress} className="h-2" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="wildlife-card border-0 shadow-nature">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Shield className="w-6 h-6 text-nature" />
              Recognition Result
            </CardTitle>
            <CardDescription className="text-base">
              Wildlife recognition results with confidence scoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="text-center py-12">
                <div className="relative">
                  <LoadingSpinner className="w-12 h-12 mx-auto mb-4" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 border-4 border-nature/20 rounded-full animate-ping" />
                </div>
                <p className="text-lg font-medium mb-2">Analyzing image...</p>
                <p className="text-sm text-muted-foreground">{processingStep}</p>
                {processingProgress > 0 && (
                  <div className="mt-4 max-w-xs mx-auto">
                    <Progress value={processingProgress} className="h-2" />
                  </div>
                )}
              </div>
            )}
            
            {!isLoading && !recognitionResult && (
              <div className="text-center py-12">
                <div className="relative">
                  <Brain className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 border-4 border-nature/20 rounded-full animate-pulse" />
                </div>
                <p className="text-xl font-medium text-muted-foreground mb-2">
                  Ready for Recognition
                </p>
                <p className="text-muted-foreground">
                  Upload an image and click "Recognize Wildlife" to get started
                </p>
              </div>
            )}
            
            {!isLoading && recognitionResult && (
              <div className="space-y-6">
                {recognitionResult.isWild ? (
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <CheckCircle className="w-20 h-20 text-green-500" />
                        <div className="absolute inset-0 w-20 h-20 border-4 border-green-200 rounded-full animate-ping" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-green-600">
                        Wild Animal Identified
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gradient-to-r from-green-50 to-nature/10 dark:from-green-950/20 dark:to-nature/10 p-6 rounded-xl border border-green-200/50">
                          <p className="text-sm text-muted-foreground mb-2">Common Name</p>
                          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                            {recognitionResult.commonName}
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-50 to-accent/10 dark:from-blue-950/20 dark:to-accent/10 p-6 rounded-xl border border-blue-200/50">
                          <p className="text-sm text-muted-foreground mb-2">Scientific Name</p>
                          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 italic">
                            {recognitionResult.scientificName}
                          </p>
                        </div>
                        
                        {recognitionResult.confidence && (
                          <div className="bg-gradient-to-r from-purple-50 to-primary/10 dark:from-purple-950/20 dark:to-primary/10 p-6 rounded-xl border border-purple-200/50">
                            <p className="text-sm text-muted-foreground mb-3">Confidence Score</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">
                                  {(recognitionResult.confidence * 100).toFixed(1)}%
                                </span>
                                <Badge variant={
                                  recognitionResult.confidence > 0.8 ? "default" :
                                  recognitionResult.confidence > 0.6 ? "secondary" : "destructive"
                                }>
                                  {recognitionResult.confidence > 0.8 ? "High" :
                                   recognitionResult.confidence > 0.6 ? "Medium" : "Low"}
                                </Badge>
                              </div>
                              <Progress value={recognitionResult.confidence * 100} className="h-3" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <XCircle className="w-20 h-20 text-red-500" />
                        <div className="absolute inset-0 w-20 h-20 border-4 border-red-200 rounded-full animate-ping" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-red-600">
                        Not a Wild Animal
                      </h3>
                      
                      <div className="bg-gradient-to-r from-red-50 to-destructive/10 dark:from-red-950/20 dark:to-destructive/10 p-6 rounded-xl border border-red-200/50">
                        <p className="text-xl font-semibold text-red-700 dark:text-red-300">
                          {recognitionResult.message}
                        </p>
                      </div>
                      
                      {recognitionResult.confidence && (
                        <div className="bg-gradient-to-r from-gray-50 to-muted/10 dark:from-gray-950/20 dark:to-muted/10 p-4 rounded-xl border border-gray-200/50">
                          <p className="text-sm text-muted-foreground">
                            Confidence: {(recognitionResult.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                      )}
                      
                      {recognitionResult.suggestions && recognitionResult.suggestions.length > 0 && (
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-900/10 p-4 rounded-xl border border-yellow-200/50">
                          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                            Suggestions:
                          </p>
                          <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                            {recognitionResult.suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-yellow-500">•</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* API Source and Retry Options */}
                <div className="space-y-4">
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {recognitionResult.apiSource && (
                        <Badge variant="outline" className="text-xs">
                          <Globe className="w-3 h-3 mr-1" />
                          Source: {recognitionResult.apiSource}
                        </Badge>
                      )}
                      {recognitionResult.confidence && (
                        <Badge variant="secondary" className="text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {(recognitionResult.confidence * 100).toFixed(1)}% confidence
                        </Badge>
                      )}
                    </div>
                    
                    {recognitionResult.confidence && recognitionResult.confidence < 0.8 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRetryWithDifferentAPI}
                        className="gap-2"
                        disabled={isLoading}
                      >
                        <RefreshCw className="w-4 h-4" />
                        Try Different APIs
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* API Metrics Panel */}
      {Object.keys(apiMetrics).length > 0 && (
        <Card className="wildlife-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              API Performance Metrics
            </CardTitle>
            <CardDescription>
              Real-time performance monitoring of classification APIs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(apiMetrics).map(([api, metrics]: [string, any]) => (
                <div key={api} className="bg-gradient-card p-4 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold capitalize text-sm">
                      {api.replace('-', ' ')}
                    </h4>
                    <div className={`w-2 h-2 rounded-full ${
                      metrics.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Success Rate:</span>
                      <span className="font-medium">{metrics.successRate?.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">API Calls:</span>
                      <span className="font-medium">{metrics.calls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Confidence:</span>
                      <span className="font-medium">{(metrics.avgConfidence * 100)?.toFixed(1)}%</span>
                    </div>
                    {metrics.lastUsed && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Used:</span>
                        <span className="font-medium text-xs">
                          {new Date(metrics.lastUsed).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Section */}
      <Card className="wildlife-card border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-nature" />
            About Wildlife Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">For Wild Animals:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Common Name (e.g., "Bengal Tiger")
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Scientific Name (e.g., "Panthera tigris tigris")
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Confidence Score & API Source
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Multi-API Validation
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-red-600">For Non-Wild Animals:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    "This is not a wild animal."
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Confidence assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Helpful suggestions if needed
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Technical Features:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-card p-3 rounded-lg text-center">
                    <Zap className="w-6 h-6 text-accent mx-auto mb-1" />
                    <p className="text-sm font-medium">Multi-API</p>
                    <p className="text-xs text-muted-foreground">Failover System</p>
                  </div>
                  <div className="bg-gradient-card p-3 rounded-lg text-center">
                    <Brain className="w-6 h-6 text-nature mx-auto mb-1" />
                    <p className="text-sm font-medium">Enhanced</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="bg-gradient-card p-3 rounded-lg text-center">
                    <Clock className="w-6 h-6 text-primary mx-auto mb-1" />
                    <p className="text-sm font-medium">Real-time</p>
                    <p className="text-xs text-muted-foreground">Processing</p>
                  </div>
                  <div className="bg-gradient-card p-3 rounded-lg text-center">
                    <Globe className="w-6 h-6 text-secondary mx-auto mb-1" />
                    <p className="text-sm font-medium">639+ Species</p>
                    <p className="text-xs text-muted-foreground">Database</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center space-y-2">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Supported Wild Species: {wildlifeRecognitionService.getSupportedWildSpeciesCount()}+ (639+ Total)
            </Badge>
            <p className="text-xs text-muted-foreground">
              Powered by Google Vision AI, AWS Rekognition, iNaturalist, and Hugging Face
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};