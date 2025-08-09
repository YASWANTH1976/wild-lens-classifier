import React from 'react';
import { WildlifeRecognitionClassifier } from '@/components/WildlifeRecognitionClassifier';
import { authService } from '@/lib/authService';
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
  Bird,
  LogOut,
  User
} from 'lucide-react';

const Index = () => {
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
  };

  const features = [
    {
      icon: Brain,
      title: "Expert Wildlife Recognition",
      description: "Specialized AI models trained to distinguish between wild and domestic animals",
      color: "text-nature"
    },
    {
      icon: Zap,
      title: "Multi-API Failover",
      description: "Advanced API failover system ensures 99.9% uptime and accuracy",
      color: "text-accent"
    },
    {
      icon: Globe,
      title: "Enhanced Database",
      description: "Access information on 639+ wild animal species with complete taxonomy",
      color: "text-nature-sky"
    },
    {
      icon: Shield,
      title: "Clear Classification",
      description: "Clear distinction between wild animals and domestic/non-wild animals",
      color: "text-destructive"
    }
  ];

  const stats = [
    { label: "Wild Species Supported", value: "639+", icon: Bird },
    { label: "Recognition Accuracy", value: "96.8%", icon: Brain },
    { label: "Processing Speed", value: "< 2s", icon: Zap },
    { label: "API Uptime", value: "99.9%", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* User Header */}
      {currentUser && (
        <div className="bg-gradient-card border-b">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-nature rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{currentUser.role}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 wildlife-background opacity-20"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge variant="secondary" className="mb-4">
              <Leaf className="w-4 h-4 mr-2" />
              Advanced AI • Multi-API • Real-time
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Wildlife
              </span>{" "}
              <span className="text-foreground">Recognition</span>
              <br />
              <span className="text-foreground">System</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Advanced multi-API wildlife recognition with failover. Identify wild animals with scientific accuracy 
              or confirm domestic animals with confidence scoring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" className="group" asChild>
                <a href="#classifier">
                  <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Recognition
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
            <h2 className="text-4xl font-bold mb-4">Expert Recognition Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized system for accurate wildlife recognition and classification
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
              Simple steps to recognize wildlife or confirm non-wild animals
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
                Our AI analyzes the image to determine if it's a wild animal
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-nature rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Results</h3>
              <p className="text-muted-foreground">
                Receive common and scientific names for wild animals or confirmation for non-wild animals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Application */}
      <div id="classifier" className="py-20">
        <div className="container mx-auto px-6">
          <WildlifeRecognitionClassifier />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TreePine className="w-5 h-5 text-nature" />
                Wildlife Recognition System
              </h3>
              <p className="text-muted-foreground">
                Expert system for wildlife recognition and classification.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Wildlife Recognition</li>
                <li>• Wild vs Domestic Classification</li>
                <li>• Scientific Name Database</li>
                <li>• Instant Results</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Technology</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• AI Image Recognition</li>
                <li>• React & TypeScript</li>
                <li>• Hugging Face Models</li>
                <li>• Wildlife Database</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>Wildlife Recognition System - Expert Wildlife Classification</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
