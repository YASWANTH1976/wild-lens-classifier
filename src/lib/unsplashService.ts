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

export class UnsplashService {
  private readonly accessKey = 'demo-key'; // Using demo mode
  
  async searchWildlifePhotos(query: string = 'wildlife animals', count: number = 12): Promise<UnsplashPhoto[]> {
    try {
      // Demo photos for development - replace with real API in production
      const demoPhotos: UnsplashPhoto[] = [
        {
          id: '1',
          urls: {
            small: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400',
            regular: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800',
            full: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200'
          },
          alt_description: 'Tiger in nature',
          user: { name: 'Unsplash' },
          links: { download: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800' }
        },
        {
          id: '2',
          urls: {
            small: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400',
            regular: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800',
            full: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=1200'
          },
          alt_description: 'Lion portrait',
          user: { name: 'Unsplash' },
          links: { download: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800' }
        },
        {
          id: '3',
          urls: {
            small: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400',
            regular: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800',
            full: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=1200'
          },
          alt_description: 'Elephant in savanna',
          user: { name: 'Unsplash' },
          links: { download: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800' }
        },
        {
          id: '4',
          urls: {
            small: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400',
            regular: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
            full: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200'
          },
          alt_description: 'Giraffe in wild',
          user: { name: 'Unsplash' },
          links: { download: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800' }
        },
        {
          id: '5',
          urls: {
            small: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400',
            regular: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800',
            full: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200'
          },
          alt_description: 'Zebra grazing',
          user: { name: 'Unsplash' },
          links: { download: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800' }
        },
        {
          id: '6',
          urls: {
            small: 'https://images.unsplash.com/photo-1535338554006-5b35dc92be9c?w=400',
            regular: 'https://images.unsplash.com/photo-1535338554006-5b35dc92be9c?w=800',
            full: 'https://images.unsplash.com/photo-1535338554006-5b35dc92be9c?w=1200'
          },
          alt_description: 'Wolf portrait',
          user: { name: 'Unsplash' },
          links: { download: 'https://images.unsplash.com/photo-1535338554006-5b35dc92be9c?w=800' }
        },
        {
          id: '7',
          urls: {
            small: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
            regular: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
            full: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200'
          },
          alt_description: 'Cheetah running',
          user: { name: 'Unsplash' },
          links: { download: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800' }
        },
        {
          id: '8',
          urls: {
            small: 'https://images.unsplash.com/photo-1605500844686-0ad1e9e5b6ff?w=400',
            regular: 'https://images.unsplash.com/photo-1605500844686-0ad1e9e5b6ff?w=800',
            full: 'https://images.unsplash.com/photo-1605500844686-0ad1e9e5b6ff?w=1200'
          },
          alt_description: 'Polar bear',
          user: { name: 'Unsplash' },
          links: { download: 'https://images.unsplash.com/photo-1605500844686-0ad1e9e5b6ff?w=800' }
        }
      ];

      return demoPhotos.slice(0, count);
    } catch (error) {
      console.error('Error fetching Unsplash photos:', error);
      return [];
    }
  }

  async downloadImage(photoUrl: string): Promise<Blob> {
    const response = await fetch(photoUrl);
    if (!response.ok) {
      throw new Error('Failed to download image');
    }
    return await response.blob();
  }
}