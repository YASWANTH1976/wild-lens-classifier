import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from './LoadingSpinner';
import { ClassificationService } from '@/lib/classificationService';
import { Search } from 'lucide-react';

interface SimilarAnimalsProps {
  animalLabel: string;
}

export const SimilarAnimals: React.FC<SimilarAnimalsProps> = ({ animalLabel }) => {
  const [similarAnimals, setSimilarAnimals] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const classificationService = new ClassificationService();

  useEffect(() => {
    const fetchSimilarAnimals = async () => {
      setLoading(true);
      try {
        const similar = await classificationService.getSimilarAnimals(animalLabel);
        setSimilarAnimals(similar);
      } catch (error) {
        console.error('Failed to fetch similar animals:', error);
      } finally {
        setLoading(false);
      }
    };

    if (animalLabel) {
      fetchSimilarAnimals();
    }
  }, [animalLabel]);

  if (loading) {
    return (
      <Card className="wildlife-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <LoadingSpinner size="sm" className="mr-2" />
            <span className="text-sm text-muted-foreground">Finding similar animals...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (similarAnimals.length === 0) {
    return null;
  }

  return (
    <Card className="wildlife-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="h-5 w-5" />
          <span>Similar Animals</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {similarAnimals.map((animal, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="text-center py-2 hover:bg-primary/10 transition-colors cursor-pointer"
            >
              {animal}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          These animals share similar characteristics or habitats
        </p>
      </CardContent>
    </Card>
  );
};