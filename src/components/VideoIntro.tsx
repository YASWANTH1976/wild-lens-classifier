import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

interface VideoIntroProps {
  onComplete: () => void;
}

export const VideoIntro: React.FC<VideoIntroProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Animated frames for the "video" intro
  const frames = [
    "🌍 Welcome to Wildlife Classification System",
    "🧠 Powered by Advanced Neural Networks",
    "📷 Upload Images or Audio Files",
    "🔍 Get Instant Species Identification",
    "🏞️ Habitat Suitability Analysis",
    "📚 Comprehensive Species Information",
    "🌿 Conservation Status & Safety Tips",
    "🚀 Ready to Explore Wildlife?",
  ];

  const descriptions = [
    "Discover the amazing world of wildlife identification",
    "Using state-of-the-art AI and machine learning",
    "Support for multiple file formats",
    "Real-time classification with confidence scores",
    "Detailed environmental compatibility analysis",
    "Complete animal profiles and interesting facts",
    "Important feeding guidelines and habitat details",
    "Let's start your wildlife journey!",
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= frames.length - 1) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, frames.length, onComplete]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skipIntro = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <Card className="w-full max-w-4xl mx-4 bg-gradient-to-br from-nature/20 to-accent/20 border-nature/30">
        <CardContent className="p-8">
          {/* Video-like header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Wildlife Intro • Live</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={skipIntro}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Main content area */}
          <div className="text-center space-y-8">
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-background/50 to-muted/30 rounded-lg border border-border">
              <div className="space-y-4 animate-fade-in">
                <div className="text-6xl animate-scale-in">
                  {frames[currentFrame]?.split(' ')[0] || '🌍'}
                </div>
                <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  {frames[currentFrame]?.split(' ').slice(1).join(' ') || 'Loading...'}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {descriptions[currentFrame]}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-nature to-accent rounded-full transition-all duration-300"
                  style={{ width: `${((currentFrame + 1) / frames.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-muted-foreground">
                {currentFrame + 1} / {frames.length}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlay}
                className="gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
                className="gap-2"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isMuted ? 'Unmuted' : 'Muted'}
              </Button>

              <Button
                variant="hero"
                onClick={skipIntro}
                className="gap-2"
              >
                Skip Intro
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};