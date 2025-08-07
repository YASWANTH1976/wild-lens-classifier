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
  XCircle
} from 'lucide-react';
import { WildlifeRecognitionService } from '@/lib/wildlifeRecognitionService';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface WildlifeRecognitionResult {
  isWild: boolean;
  commonName?: string;
  scientificName?: string;
  message?: string;
}

export const WildlifeRecognitionClassifier: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<WildlifeRecognitionResult | null>(null);
  
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
    
    toast.success('Image uploaded successfully!');
  }, []);

  const handleRecognition = useCallback(async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setIsLoading(true);
    
    try {
      toast.info('🔍 Analyzing image for wildlife recognition...');
      
      const result = await wildlifeRecognitionService.recognizeWildlife(selectedFile);
      setRecognitionResult(result);
      
      if (result.isWild) {
        toast.success(`✅ Wild animal identified: ${result.commonName}`);
      } else {
        toast.info('ℹ️ This is not a wild animal');
      }
      
    } catch (error) {
      console.error('Recognition error:', error);
      toast.error('Recognition failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, wildlifeRecognitionService]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setSelectedImage(null);
    setRecognitionResult(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast.success('Reset completed');
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
          Wildlife Recognition System
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert wildlife recognition. Upload an image to identify wild animals or confirm if it's not a wild animal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-nature" />
              Upload Image
            </CardTitle>
            <CardDescription>
              Upload an image of an animal for wildlife recognition
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {selectedImage ? (
                <div className="space-y-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="max-w-full h-64 object-cover rounded-lg mx-auto"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium">Upload an image</p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG, or JPEG up to 15MB
                    </p>
                  </div>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
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
            
            <div className="flex gap-2">
              <Button 
                onClick={handleRecognition}
                disabled={!selectedFile || isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner className="w-4 h-4 mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Recognize Wildlife
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleReset}
                disabled={isLoading}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-nature" />
              Recognition Result
            </CardTitle>
            <CardDescription>
              Wildlife recognition results
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="text-center py-8">
                <LoadingSpinner className="w-8 h-8 mx-auto mb-4" />
                <p className="text-muted-foreground">Analyzing image...</p>
              </div>
            )}
            
            {!isLoading && !recognitionResult && (
              <div className="text-center py-8">
                <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Upload an image and click "Recognize Wildlife" to get started
                </p>
              </div>
            )}
            
            {!isLoading && recognitionResult && (
              <div className="space-y-4">
                {recognitionResult.isWild ? (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-green-600">
                        Wild Animal Identified
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Common Name</p>
                          <p className="text-xl font-semibold text-green-700 dark:text-green-300">
                            {recognitionResult.commonName}
                          </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Scientific Name</p>
                          <p className="text-xl font-semibold text-green-700 dark:text-green-300 italic">
                            {recognitionResult.scientificName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <XCircle className="w-16 h-16 text-red-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-red-600">
                        Not a Wild Animal
                      </h3>
                      <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
                        <p className="text-lg font-semibold text-red-700 dark:text-red-300">
                          {recognitionResult.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Information Section */}
      <Card className="mt-8 bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-nature" />
            About Wildlife Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">For Wild Animals:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Common Name (e.g., "Bengal Tiger")</li>
                <li>• Scientific Name (e.g., "Panthera tigris tigris")</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Non-Wild Animals:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• "This is not a wild animal."</li>
              </ul>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-center">
            <Badge variant="secondary" className="text-sm">
              Supported Wild Species: {wildlifeRecognitionService.getSupportedWildSpeciesCount()}+ (639+ Total)
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};