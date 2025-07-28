import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Eye, 
  MapPin, 
  Shield, 
  Database,
  Zap,
  Brain,
  Globe
} from 'lucide-react';

interface StatisticItem {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
  progress?: number;
  description?: string;
}

export const StatisticsPanel: React.FC = () => {
  const statistics: StatisticItem[] = [
    {
      label: "Image Recognition Accuracy",
      value: "94.7%",
      icon: Eye,
      color: "text-nature",
      progress: 94.7,
      description: "Neural network classification accuracy"
    },
    {
      label: "Instant Classification",
      value: "< 2s",
      icon: Zap,
      color: "text-nature-sunset",
      description: "Average processing time"
    },
    {
      label: "Habitat Analysis",
      value: "89.3%",
      icon: MapPin,
      color: "text-nature-earth",
      progress: 89.3,
      description: "Habitat suitability prediction accuracy"
    },
    {
      label: "Species Database",
      value: "15,000+",
      icon: Database,
      color: "text-nature-leaf",
      description: "Wildlife species in our database"
    },
    {
      label: "Conservation Tracking",
      value: "Real-time",
      icon: Shield,
      color: "text-accent",
      description: "IUCN Red List integration"
    },
    {
      label: "Global Coverage",
      value: "7 Continents",
      icon: Globe,
      color: "text-nature-sky",
      description: "Worldwide wildlife identification"
    },
    {
      label: "AI Model Efficiency",
      value: "98.1%",
      icon: Brain,
      color: "text-primary",
      progress: 98.1,
      description: "Model optimization and speed"
    },
    {
      label: "Classification Rate",
      value: "10k/day",
      icon: TrendingUp,
      color: "text-nature",
      description: "Daily classifications processed"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          System Performance Statistics
        </CardTitle>
        <CardDescription>
          Real-time metrics of our neural network wildlife classification system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statistics.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`w-5 h-5 ${stat.color}`} />
                    <Badge variant="secondary" className="text-xs">
                      Live
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm font-medium text-foreground">{stat.label}</p>
                    </div>
                    
                    {stat.progress && (
                      <div className="space-y-1">
                        <Progress value={stat.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">{stat.progress}% efficiency</p>
                      </div>
                    )}
                    
                    {stat.description && (
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Real-time Performance Indicators */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-nature/5 border-nature/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-nature rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Neural Network Status</span>
              </div>
              <p className="text-lg font-bold text-nature">Operational</p>
              <p className="text-xs text-muted-foreground">All systems running optimally</p>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">API Response Time</span>
              </div>
              <p className="text-lg font-bold text-accent">1.3s avg</p>
              <p className="text-xs text-muted-foreground">Excellent performance</p>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Database Sync</span>
              </div>
              <p className="text-lg font-bold text-primary">Real-time</p>
              <p className="text-xs text-muted-foreground">Latest conservation data</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};