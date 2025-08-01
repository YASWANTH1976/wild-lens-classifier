import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Heart, AlertTriangle, ExternalLink } from 'lucide-react';

interface ConservationAlertsProps {
  animalName: string;
  conservationStatus: string;
}

export const ConservationAlerts: React.FC<ConservationAlertsProps> = ({ 
  animalName, 
  conservationStatus 
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'critically endangered':
        return 'destructive';
      case 'endangered':
        return 'destructive';
      case 'vulnerable':
        return 'secondary';
      case 'near threatened':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'critically endangered':
      case 'endangered':
        return <AlertTriangle className="w-4 h-4" />;
      case 'vulnerable':
      case 'near threatened':
        return <Shield className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  const getDonationUrl = (animalName: string) => {
    const searchTerm = encodeURIComponent(`${animalName} conservation`);
    return `https://www.worldwildlife.org/species/${searchTerm}`;
  };

  return (
    <Card className="border-l-4 border-l-nature">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(conservationStatus)}
          Conservation Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant={getStatusColor(conservationStatus)} className="text-sm">
            {conservationStatus}
          </Badge>
          {(conservationStatus.toLowerCase().includes('endangered') || 
            conservationStatus.toLowerCase().includes('vulnerable')) && (
            <Badge variant="destructive" className="animate-pulse">
              Action Needed
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Help protect {animalName} and their habitat through conservation efforts.
        </p>
        
        <div className="flex gap-2">
          <Button 
            variant="nature" 
            size="sm"
            onClick={() => window.open(getDonationUrl(animalName), '_blank')}
            className="gap-2"
          >
            <Heart className="w-4 h-4" />
            Support Conservation
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};