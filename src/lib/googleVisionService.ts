import { createClient } from '@supabase/supabase-js';

interface ClassificationResult {
  label: string;
  confidence: number;
  scientificName?: string;
  taxonomy?: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
}

export class GoogleVisionService {
  private supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  async classifyWildlife(file: File): Promise<ClassificationResult> {
    try {
      // Convert file to base64
      const base64Data = await this.fileToBase64(file);
      
      console.log('🚀 Sending image to Google Vision AI...');
      
      // Call our Supabase Edge Function
      const { data, error } = await this.supabase.functions.invoke('classify-wildlife', {
        body: {
          imageData: base64Data
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Classification failed: ${error.message}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      console.log('✅ Google Vision AI classification complete');
      return data as ClassificationResult;

    } catch (error) {
      console.error('Google Vision Service error:', error);
      throw error;
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          // Remove the data:image/jpeg;base64, prefix
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('File reading failed'));
      reader.readAsDataURL(file);
    });
  }

  // Fallback method for when API key is not configured
  async mockClassification(file: File): Promise<ClassificationResult> {
    console.log('⚠️ Using mock classification - Google Vision API not configured');
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const filename = file.name.toLowerCase();
    
    // Try to guess from filename
    const commonAnimals = [
      'tiger', 'lion', 'elephant', 'bear', 'wolf', 'deer', 'eagle', 'owl',
      'snake', 'crocodile', 'turtle', 'butterfly', 'bee', 'leopard', 'cheetah',
      'giraffe', 'zebra', 'rhinoceros', 'panda', 'penguin'
    ];
    
    for (const animal of commonAnimals) {
      if (filename.includes(animal)) {
        return {
          label: animal.charAt(0).toUpperCase() + animal.slice(1),
          confidence: 0.75,
          scientificName: `${animal} species (demo mode)`
        };
      }
    }
    
    return {
      label: 'Wildlife specimen',
      confidence: 0.60,
      scientificName: 'Demo mode - Configure Google Vision API for accurate identification'
    };
  }
}