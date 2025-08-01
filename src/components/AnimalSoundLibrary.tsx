import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Volume2, Play, Pause, Download, ExternalLink } from 'lucide-react';

interface AnimalSoundLibraryProps {
  animalName: string;
}

export const AnimalSoundLibrary: React.FC<AnimalSoundLibraryProps> = ({ animalName }) => {
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  const getSoundData = (animalName: string) => {
    const name = animalName.toLowerCase();
    
    if (name.includes('bird')) {
      return [
        { name: 'Morning Call', duration: '0:15', type: 'Territorial', file: 'bird_call.mp3' },
        { name: 'Mating Song', duration: '0:32', type: 'Courtship', file: 'bird_song.mp3' },
        { name: 'Alarm Call', duration: '0:08', type: 'Warning', file: 'bird_alarm.mp3' }
      ];
    } else if (name.includes('whale')) {
      return [
        { name: 'Whale Song', duration: '1:45', type: 'Communication', file: 'whale_song.mp3' },
        { name: 'Echo Location', duration: '0:22', type: 'Navigation', file: 'whale_click.mp3' }
      ];
    } else if (name.includes('lion')) {
      return [
        { name: 'Roar', duration: '0:18', type: 'Territorial', file: 'lion_roar.mp3' },
        { name: 'Growl', duration: '0:12', type: 'Warning', file: 'lion_growl.mp3' }
      ];
    } else if (name.includes('elephant')) {
      return [
        { name: 'Trumpet', duration: '0:25', type: 'Communication', file: 'elephant_trumpet.mp3' },
        { name: 'Rumble', duration: '0:30', type: 'Long Distance', file: 'elephant_rumble.mp3' }
      ];
    } else if (name.includes('wolf')) {
      return [
        { name: 'Howl', duration: '0:45', type: 'Pack Communication', file: 'wolf_howl.mp3' },
        { name: 'Bark', duration: '0:05', type: 'Alert', file: 'wolf_bark.mp3' }
      ];
    } else {
      return [
        { name: 'Vocalization', duration: '0:20', type: 'Communication', file: 'generic_call.mp3' },
        { name: 'Alert Sound', duration: '0:10', type: 'Warning', file: 'generic_alert.mp3' }
      ];
    }
  };

  const sounds = getSoundData(animalName);

  const handlePlaySound = (soundName: string) => {
    if (playingSound === soundName) {
      setPlayingSound(null);
    } else {
      setPlayingSound(soundName);
      // Simulate sound playback
      setTimeout(() => setPlayingSound(null), 3000);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'territorial': return 'destructive';
      case 'courtship': return 'secondary';
      case 'warning': case 'alert': return 'outline';
      case 'communication': return 'default';
      default: return 'outline';
    }
  };

  const openExternalSoundLibrary = () => {
    const searchTerm = encodeURIComponent(`${animalName} sounds`);
    window.open(`https://www.xeno-canto.org/explore?query=${searchTerm}`, '_blank');
  };

  return (
    <Card className="border-l-4 border-l-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Sound Library - {animalName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Listen to authentic {animalName} vocalizations and learn about their communication.
        </p>
        
        <div className="space-y-3">
          {sounds.map((sound, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/5 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{sound.name}</span>
                  <Badge variant={getTypeColor(sound.type)} className="text-xs">
                    {sound.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Duration: {sound.duration}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePlaySound(sound.name)}
                  className="gap-2"
                >
                  {playingSound === sound.name ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Playing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Play
                    </>
                  )}
                </Button>
                
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={openExternalSoundLibrary}
            className="gap-2"
          >
            <Volume2 className="w-4 h-4" />
            More Sounds on Xeno-Canto
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="bg-accent/10 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            🎵 Sounds are simulated for demo purposes. In production, integrate with wildlife sound databases.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};