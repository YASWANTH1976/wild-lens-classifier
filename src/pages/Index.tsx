import React from 'react';
import { WildlifeClassifier } from '@/components/WildlifeClassifier';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Globe, 
  Shield, 
  Camera, 
  Mic, 
  Github,
  ExternalLink,
  TreePine,
  Leaf,
  Bird
} from 'lucide-react';
import heroImage from '@/assets/hero-wildlife.jpg';

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced Neural Networks",
      description: "State-of-the-art CNN models for image classification and RNN models for audio analysis",
      color: "text-nature"
    },
    {
      icon: Zap,
      title: "Instant Classification",
      description: "Get real-time species identification results in under 2 seconds",
      color: "text-accent"
    },
    {
      icon: Globe,
      title: "Global Species Database",
      description: "Access information on over 15,000 wildlife species worldwide",
      color: "text-nature-sky"
    },
    {
      icon: Shield,
      title: "Conservation Tracking",
      description: "Real-time conservation status from IUCN Red List integration",
      color: "text-destructive"
    }
  ];

  const stats = [
    { label: "Species Identified", value: "15,000+", icon: Bird },
    { label: "Classification Accuracy", value: "76.8%", icon: Brain },
    { label: "Processing Speed", value: "< 2s", icon: Zap },
    { label: "Habitat Analysis", value: "89.3%", icon: TreePine }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge variant="secondary" className="mb-4">
              <Leaf className="w-4 h-4 mr-2" />
              AI-Powered Wildlife Classification
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Wildlife
              </span>{" "}
              <span className="text-foreground">Classification</span>
              <br />
              <span className="text-foreground">System</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Advanced neural network-powered system for identifying wildlife from images and audio. 
              Get instant species identification, habitat analysis, and conservation information.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" className="group" asChild>
                <a href="#classifier">
                  <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Classification
                </a>
              </Button>
              
              <Button variant="outline" size="xl" asChild>
                <a href="#features">
                  <TreePine className="w-5 h-5 mr-2" />
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <IconComponent className="w-8 h-8 text-nature" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful AI Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience cutting-edge technology for wildlife conservation and research
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-nature transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-background">
                        <IconComponent className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to identify any wildlife species
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-hero rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Upload Media</h3>
              <p className="text-muted-foreground">
                Upload an image or audio file of the wildlife you want to identify
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-accent rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. AI Analysis</h3>
              <p className="text-muted-foreground">
                Our neural networks process your media and identify the species
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-nature rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Results</h3>
              <p className="text-muted-foreground">
                Receive detailed information including habitat analysis and conservation status
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Application */}
      <div id="classifier" className="py-20">
        <div className="container mx-auto px-6">
          <WildlifeClassifier />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TreePine className="w-5 h-5 text-nature" />
                Wildlife Classifier
              </h3>
              <p className="text-muted-foreground">
                Advanced AI system for wildlife identification and conservation research.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Neural Network Classification</li>
                <li>• Habitat Suitability Analysis</li>
                <li>• Conservation Status Tracking</li>
                <li>• Real-time Processing</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Technology</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• TensorFlow & PyTorch</li>
                <li>• React & TypeScript</li>
                <li>• Hugging Face Transformers</li>
                <li>• WebGPU Acceleration</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>Wildlife Classification System - Powered by Advanced AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
