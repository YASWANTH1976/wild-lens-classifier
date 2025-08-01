import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Plane, Star, ExternalLink, Calendar } from 'lucide-react';

interface EcoTourismRecommendationsProps {
  animalName: string;
  nativeLocations: string[];
}

export const EcoTourismRecommendations: React.FC<EcoTourismRecommendationsProps> = ({ 
  animalName, 
  nativeLocations 
}) => {
  const getRecommendations = (animalName: string, locations: string[]) => {
    const name = animalName.toLowerCase();
    
    const recommendations = [
      {
        location: locations[0] || 'National Parks',
        country: locations[1] || 'Various Countries',
        bestSeason: name.includes('bird') ? 'Spring Migration' : 
                   name.includes('whale') ? 'Summer Months' : 'Year Round',
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        description: `Experience ${animalName} in their natural habitat with expert guides`,
        activities: [
          'Wildlife Photography Safari',
          'Guided Nature Walks',
          'Conservation Education Tours'
        ]
      },
      {
        location: locations[2] || 'Wildlife Reserves',
        country: locations[0] || 'Protected Areas',
        bestSeason: 'Dry Season',
        rating: Math.floor(Math.random() * 2) + 4,
        description: `Sustainable tourism supporting ${animalName} conservation`,
        activities: [
          'Eco-lodge Stays',
          'Research Participation',
          'Community Conservation Projects'
        ]
      }
    ];
    
    return recommendations;
  };

  const recommendations = getRecommendations(animalName, nativeLocations);

  const getBookingUrl = (location: string, animal: string) => {
    const searchTerm = encodeURIComponent(`${location} ${animal} eco tourism`);
    return `https://www.viator.com/tours/search?text=${searchTerm}`;
  };

  return (
    <Card className="bg-gradient-to-br from-background to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="w-5 h-5" />
          Eco-Tourism Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Sustainable travel experiences to see {animalName} while supporting conservation efforts.
        </p>
        
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <Card key={index} className="border border-accent/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {rec.location}
                    </h4>
                    <p className="text-sm text-muted-foreground">{rec.country}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < rec.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm mb-3">{rec.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-accent" />
                  <Badge variant="outline">{rec.bestSeason}</Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  <p className="text-sm font-medium">Activities:</p>
                  <div className="flex flex-wrap gap-1">
                    {rec.activities.map((activity, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(getBookingUrl(rec.location, animalName), '_blank')}
                  className="gap-2"
                >
                  Find Tours
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-nature/10 border border-nature/20 rounded-lg p-3">
          <p className="text-sm font-medium text-nature mb-1">🌱 Eco-Tourism Impact</p>
          <p className="text-xs text-muted-foreground">
            Your visit supports local communities and wildlife conservation efforts.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};