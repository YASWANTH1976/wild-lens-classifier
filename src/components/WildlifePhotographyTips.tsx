import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Clock, MapPin, Lightbulb } from 'lucide-react';

interface WildlifePhotographyTipsProps {
  animalName: string;
  habitat: string;
}

export const WildlifePhotographyTips: React.FC<WildlifePhotographyTipsProps> = ({ 
  animalName, 
  habitat 
}) => {
  const getPhotographyTips = (animalName: string, habitat: string) => {
    const name = animalName.toLowerCase();
    
    if (name.includes('bird')) {
      return {
        bestTime: 'Early morning (5-8 AM)',
        equipment: 'Telephoto lens (300mm+), fast autofocus',
        technique: 'Use burst mode, focus on the eye',
        location: 'Near water sources, feeding areas',
        difficulty: 'Medium',
        settings: 'Fast shutter (1/1000s+), aperture f/5.6-f/8'
      };
    } else if (name.includes('mammal') || name.includes('deer') || name.includes('bear')) {
      return {
        bestTime: 'Dawn and dusk (golden hours)',
        equipment: 'Telephoto lens (200-400mm), tripod',
        technique: 'Patience, stay downwind, minimal movement',
        location: 'Forest edges, clearings, water sources',
        difficulty: 'Hard',
        settings: 'Higher ISO, wide aperture for bokeh'
      };
    } else if (name.includes('reptile') || name.includes('snake') || name.includes('lizard')) {
      return {
        bestTime: 'Mid-morning when basking (9-11 AM)',
        equipment: 'Macro lens or telephoto, diffused flash',
        technique: 'Slow movements, ground-level angles',
        location: 'Rocks, logs, sunny spots',
        difficulty: 'Easy',
        settings: 'Small aperture for depth of field'
      };
    } else if (name.includes('marine') || name.includes('fish') || name.includes('whale')) {
      return {
        bestTime: 'Calm seas, early morning',
        equipment: 'Waterproof housing, wide-angle lens',
        technique: 'Get close, use natural light, be patient',
        location: 'Coral reefs, coastal waters',
        difficulty: 'Very Hard',
        settings: 'Fast shutter, high ISO underwater'
      };
    } else {
      return {
        bestTime: 'Golden hour (sunrise/sunset)',
        equipment: 'Telephoto lens (200mm+), tripod',
        technique: 'Respect distance, use camouflage',
        location: 'Natural habitat, quiet areas',
        difficulty: 'Medium',
        settings: 'Aperture priority, focus on eyes'
      };
    }
  };

  const tips = getPhotographyTips(animalName, habitat);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'default';
      case 'medium': return 'secondary';
      case 'hard': return 'destructive';
      case 'very hard': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="border-t-4 border-t-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Photography Tips for {animalName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant={getDifficultyColor(tips.difficulty)}>
            {tips.difficulty} Difficulty
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 text-accent" />
              <div>
                <p className="font-medium text-sm">Best Time</p>
                <p className="text-sm text-muted-foreground">{tips.bestTime}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-accent" />
              <div>
                <p className="font-medium text-sm">Location</p>
                <p className="text-sm text-muted-foreground">{tips.location}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Camera className="w-4 h-4 mt-0.5 text-accent" />
              <div>
                <p className="font-medium text-sm">Equipment</p>
                <p className="text-sm text-muted-foreground">{tips.equipment}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 mt-0.5 text-accent" />
              <div>
                <p className="font-medium text-sm">Technique</p>
                <p className="text-sm text-muted-foreground">{tips.technique}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-accent/10 rounded-lg p-3">
          <p className="text-sm font-medium mb-1">Camera Settings</p>
          <p className="text-sm text-muted-foreground">{tips.settings}</p>
        </div>
      </CardContent>
    </Card>
  );
};