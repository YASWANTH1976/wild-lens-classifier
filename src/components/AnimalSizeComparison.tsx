import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ruler, User } from 'lucide-react';

interface AnimalSizeComparisonProps {
  animalName: string;
  size: string;
  weight: string;
}

export const AnimalSizeComparison: React.FC<AnimalSizeComparisonProps> = ({ 
  animalName, 
  size, 
  weight 
}) => {
  const getComparison = (animalName: string, size: string) => {
    const name = animalName.toLowerCase();
    
    if (name.includes('elephant')) {
      return {
        comparison: '20x larger than an average human',
        icon: '🐘',
        relative: 'As tall as a two-story building'
      };
    } else if (name.includes('giraffe')) {
      return {
        comparison: '3x taller than an average human',
        icon: '🦒',
        relative: 'Head reaches second floor windows'
      };
    } else if (name.includes('mouse') || name.includes('hamster')) {
      return {
        comparison: '100x smaller than an average human',
        icon: '🐭',
        relative: 'Fits in the palm of your hand'
      };
    } else if (name.includes('whale')) {
      return {
        comparison: '30x longer than an average human',
        icon: '🐋',
        relative: 'Length of 3 school buses'
      };
    } else if (name.includes('lion') || name.includes('tiger')) {
      return {
        comparison: '1.5x the height of an average human',
        icon: '🦁',
        relative: 'About the size of a large dog when standing'
      };
    } else if (name.includes('bear')) {
      return {
        comparison: '2x taller than an average human when standing',
        icon: '🐻',
        relative: 'Can look over most cars'
      };
    } else {
      return {
        comparison: 'Similar size range to common pets',
        icon: '🦎',
        relative: 'Comparable to household animals'
      };
    }
  };

  const comparison = getComparison(animalName, size);

  return (
    <Card className="bg-gradient-subtle">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="w-5 h-5" />
          Size Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="text-4xl">{comparison.icon}</div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {comparison.comparison}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="font-medium flex items-center gap-1">
              <User className="w-3 h-3" />
              Physical Size
            </p>
            <p className="text-muted-foreground">{size}</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Weight</p>
            <p className="text-muted-foreground">{weight}</p>
          </div>
        </div>
        
        <div className="bg-background/50 rounded-lg p-3">
          <p className="text-sm text-muted-foreground text-center">
            {comparison.relative}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};