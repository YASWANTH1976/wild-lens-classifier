import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { UnsplashService } from '@/lib/unsplashService';
import { LoadingSpinner } from './LoadingSpinner';
import { Search, Download, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  links: {
    download: string;
  };
}

interface ImageBrowserProps {
  onImageSelect: (file: File) => void;
}

export const ImageBrowser: React.FC<ImageBrowserProps> = ({ onImageSelect }) => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('wildlife animals');
  const [isOpen, setIsOpen] = useState(false);
  const unsplashService = new UnsplashService();
  const { toast } = useToast();

  const loadPhotos = async (query: string = searchQuery) => {
    setLoading(true);
    try {
      const results = await unsplashService.searchWildlifePhotos(query, 12);
      setPhotos(results);
    } catch (error) {
      console.error('Failed to load photos:', error);
      toast({
        title: "Error",
        description: "Failed to load wildlife photos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadPhotos();
    }
  }, [isOpen]);

  const handlePhotoSelect = async (photo: UnsplashPhoto) => {
    try {
      setLoading(true);
      toast({
        title: "Downloading image...",
        description: "Please wait while we prepare your image",
      });

      const imageBlob = await unsplashService.downloadImage(photo.urls.regular);
      const file = new File([imageBlob], `wildlife-${photo.id}.jpg`, { type: 'image/jpeg' });
      
      onImageSelect(file);
      setIsOpen(false);
      
      toast({
        title: "Image selected!",
        description: `Downloaded ${photo.alt_description || 'wildlife photo'} for classification`,
      });
    } catch (error) {
      console.error('Failed to download photo:', error);
      toast({
        title: "Download failed",
        description: "Failed to download the selected image",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadPhotos(searchQuery);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-dashed border-2">
          <Globe className="mr-2 h-4 w-4" />
          Browse Wildlife Photos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Browse Wildlife Photos</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for wildlife (e.g., tigers, elephants, birds)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <LoadingSpinner size="sm" /> : 'Search'}
            </Button>
          </form>

          {/* Photo Grid */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <Card 
                    key={photo.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow group"
                    onClick={() => handlePhotoSelect(photo)}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden rounded-lg">
                        <img
                          src={photo.urls.small}
                          alt={photo.alt_description || 'Wildlife photo'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                          <Download className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-muted-foreground truncate">
                          {photo.alt_description || 'Wildlife photo'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          by {photo.user.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {photos.length === 0 && !loading && (
            <div className="text-center py-12">
              <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No wildlife photos found. Try a different search term.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};