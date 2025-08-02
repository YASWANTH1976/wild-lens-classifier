import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MapPin, 
  Camera, 
  Upload, 
  Trophy, 
  Star,
  Calendar,
  Share2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CitizenObservation {
  id: string;
  species: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  date: Date;
  observer: string;
  confidence: number;
  notes: string;
  verified: boolean;
  imageUrl?: string;
}

export const CitizenSciencePortal: React.FC = () => {
  const [observations, setObservations] = useState<CitizenObservation[]>([
    {
      id: '1',
      species: 'Panthera tigris',
      location: 'Sundarbans National Park, India',
      date: new Date('2024-01-15'),
      observer: 'Dr. Sarah Wildlife',
      confidence: 0.95,
      notes: 'Adult tiger spotted near water source during early morning patrol',
      verified: true
    },
    {
      id: '2',
      species: 'Giraffa camelopardalis',
      location: 'Serengeti National Park, Tanzania',
      date: new Date('2024-01-20'),
      observer: 'Mike Observer',
      confidence: 0.89,
      notes: 'Group of 3 giraffes feeding on acacia trees',
      verified: false
    }
  ]);

  const [newObservation, setNewObservation] = useState({
    species: '',
    location: '',
    notes: '',
    observer: ''
  });

  const { toast } = useToast();

  const submitObservation = () => {
    if (!newObservation.species || !newObservation.location || !newObservation.observer) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const observation: CitizenObservation = {
      id: Math.random().toString(36).substr(2, 9),
      species: newObservation.species,
      location: newObservation.location,
      date: new Date(),
      observer: newObservation.observer,
      confidence: 0.85, // Default confidence for citizen submissions
      notes: newObservation.notes,
      verified: false
    };

    setObservations(prev => [observation, ...prev]);
    setNewObservation({ species: '', location: '', notes: '', observer: '' });

    toast({
      title: "Observation Submitted",
      description: "Thank you for contributing to wildlife research!",
    });
  };

  const verifyObservation = (id: string) => {
    setObservations(prev => prev.map(obs => 
      obs.id === id ? { ...obs, verified: true } : obs
    ));
    toast({
      title: "Observation Verified",
      description: "This observation has been verified by experts.",
    });
  };

  const shareObservation = (observation: CitizenObservation) => {
    const shareText = `Wildlife Sighting: ${observation.species} observed at ${observation.location} on ${observation.date.toLocaleDateString()}. Contribute to wildlife research! #WildlifeConservation #CitizenScience`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Wildlife Observation',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Shared",
        description: "Observation details copied to clipboard.",
      });
    }
  };

  const leaderboard = [
    { name: 'Dr. Sarah Wildlife', contributions: 47, verifiedSightings: 43 },
    { name: 'Mike Observer', contributions: 32, verifiedSightings: 28 },
    { name: 'Nature Explorer', contributions: 28, verifiedSightings: 25 },
    { name: 'Wildlife Watcher', contributions: 21, verifiedSightings: 19 },
    { name: 'Eco Guardian', contributions: 18, verifiedSightings: 16 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Citizen Science Wildlife Portal
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Join thousands of citizen scientists contributing to global wildlife research and conservation
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit New Observation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Submit Wildlife Observation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Species Name *</label>
              <Input
                placeholder="e.g., Bengal Tiger, African Elephant"
                value={newObservation.species}
                onChange={(e) => setNewObservation(prev => ({ ...prev, species: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <Input
                placeholder="e.g., Yellowstone National Park, USA"
                value={newObservation.location}
                onChange={(e) => setNewObservation(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Observer Name *</label>
              <Input
                placeholder="Your name or organization"
                value={newObservation.observer}
                onChange={(e) => setNewObservation(prev => ({ ...prev, observer: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Behavior, habitat details, group size, etc."
                value={newObservation.notes}
                onChange={(e) => setNewObservation(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>

            <Button onClick={submitObservation} className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Submit Observation
            </Button>
          </CardContent>
        </Card>

        {/* Contributor Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Contributors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((contributor, index) => (
                <div key={contributor.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500 text-yellow-900' :
                      index === 1 ? 'bg-gray-400 text-gray-900' :
                      index === 2 ? 'bg-orange-500 text-orange-900' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{contributor.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {contributor.verifiedSightings} verified sightings
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{contributor.contributions}</div>
                    <div className="text-sm text-muted-foreground">total</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Observations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Recent Wildlife Observations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {observations.map(observation => (
              <div key={observation.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{observation.species}</h4>
                      {observation.verified ? (
                        <Badge variant="default" className="bg-green-600">
                          <Star className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending Review</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {observation.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {observation.date.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{observation.notes}</p>
                    <div className="text-xs text-muted-foreground">
                      Observed by {observation.observer} • Confidence: {(observation.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!observation.verified && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => verifyObservation(observation.id)}
                      >
                        Verify
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => shareObservation(observation)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};