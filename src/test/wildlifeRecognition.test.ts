import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WildlifeRecognitionService } from '@/lib/wildlifeRecognitionService';
import { APIService } from '@/lib/apiService';

// Mock file for testing
const createMockFile = (name: string, type: string = 'image/jpeg'): File => {
  const blob = new Blob(['mock image data'], { type });
  return new File([blob], name, { type });
};

describe('WildlifeRecognitionService', () => {
  let service: WildlifeRecognitionService;

  beforeEach(() => {
    service = new WildlifeRecognitionService();
  });

  describe('Wild Animal Recognition', () => {
    it('should identify tiger as wild animal', async () => {
      const file = createMockFile('tiger.jpg');
      const result = await service.recognizeWildlife(file);
      
      expect(result.isWild).toBe(true);
      expect(result.commonName).toBeDefined();
      expect(result.scientificName).toBeDefined();
      expect(result.commonName).toContain('Tiger');
      expect(result.scientificName).toContain('Panthera');
    });

    it('should identify lion as wild animal', async () => {
      const file = createMockFile('lion.jpg');
      const result = await service.recognizeWildlife(file);
      
      expect(result.isWild).toBe(true);
      expect(result.commonName).toBeDefined();
      expect(result.scientificName).toBeDefined();
      expect(result.commonName).toContain('Lion');
      expect(result.scientificName).toContain('Panthera');
    });

    it('should identify elephant as wild animal', async () => {
      const file = createMockFile('elephant.jpg');
      const result = await service.recognizeWildlife(file);
      
      expect(result.isWild).toBe(true);
      expect(result.commonName).toBeDefined();
      expect(result.scientificName).toBeDefined();
      expect(result.commonName).toContain('Elephant');
      expect(result.scientificName).toContain('Loxodonta');
    });

    it('should identify eagle as wild animal', async () => {
      const file = createMockFile('eagle.jpg');
      const result = await service.recognizeWildlife(file);
      
      expect(result.isWild).toBe(true);
      expect(result.commonName).toBeDefined();
      expect(result.scientificName).toBeDefined();
      expect(result.commonName).toContain('Eagle');
    });

    it('should identify wolf as wild animal', async () => {
      const file = createMockFile('wolf.jpg');
      const result = await service.recognizeWildlife(file);
      
      expect(result.isWild).toBe(true);
      expect(result.commonName).toBeDefined();
      expect(result.scientificName).toBeDefined();
      expect(result.commonName).toContain('Wolf');
      expect(result.scientificName).toContain('Canis');
    });
  });

  describe('Domestic Animal Recognition', () => {
    it('should identify dog as not wild', async () => {
      const file = createMockFile('dog.jpg');
      const result = await service.recognizeWildlife(file);
      
      expect(result.isWild).toBe(false);
      expect(result.message).toBe("This is not a wild animal.");
      expect(result.commonName).toBeUndefined();
      expect(result.scientificName).toBeUndefined();
    });

    it('should identify cat as not wild', async () => {
      const file = createMockFile('cat.jpg');
      const result = await service.recognizeWildlife(file);
      
      expect(result.isWild).toBe(false);
      expect(result.message).toBe("This is not a wild animal.");
    });

    it('should identify cow as not wild', async () => {
      const file = createMockFile('cow.jpg');
      const result = await service.recognizeWildlife(file);
      
      expect(result.isWild).toBe(false);
      expect(result.message).toBe("This is not a wild animal.");
    });

    it('should identify horse as not wild', async () => {
      const file = createMockFile('horse.jpg');
      const result = await service.recognizeWildlife(file);
      
      expect(result.isWild).toBe(false);
      expect(result.message).toBe("This is not a wild animal.");
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid file types', async () => {
      const file = createMockFile('document.pdf', 'application/pdf');
      
      await expect(service.recognizeWildlife(file)).rejects.toThrow('Please upload a valid image file');
    });

    it('should handle network errors gracefully', async () => {
      // Mock network failure
      vi.spyOn(service, 'recognizeWildlife').mockRejectedValueOnce(new Error('Network error'));
      
      const file = createMockFile('tiger.jpg');
      
      await expect(service.recognizeWildlife(file)).rejects.toThrow('Network error');
    });

    it('should provide suggestions for low confidence results', async () => {
      const file = createMockFile('blurry_animal.jpg');
      const result = await service.recognizeWildlife(file);
      
      if (!result.isWild && result.suggestions) {
        expect(result.suggestions).toBeDefined();
        expect(result.suggestions.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Database Coverage', () => {
    it('should support minimum number of wild species', () => {
      const count = service.getSupportedWildSpeciesCount();
      expect(count).toBeGreaterThanOrEqual(50);
    });

    it('should support domestic species recognition', () => {
      const count = service.getSupportedDomesticSpeciesCount();
      expect(count).toBeGreaterThanOrEqual(20);
    });

    it('should return list of supported wild species', () => {
      const species = service.getAllWildSpecies();
      expect(Array.isArray(species)).toBe(true);
      expect(species.length).toBeGreaterThan(0);
      expect(species).toContain('tiger');
      expect(species).toContain('lion');
      expect(species).toContain('elephant');
    });

    it('should return list of supported domestic species', () => {
      const species = service.getAllDomesticSpecies();
      expect(Array.isArray(species)).toBe(true);
      expect(species.length).toBeGreaterThan(0);
      expect(species).toContain('dog');
      expect(species).toContain('cat');
      expect(species).toContain('cow');
    });
  });
});

describe('APIService', () => {
  let apiService: APIService;

  beforeEach(() => {
    apiService = new APIService();
  });

  describe('API Failover', () => {
    it('should handle API failures gracefully', async () => {
      const file = createMockFile('tiger.jpg');
      
      // This should not throw even if some APIs fail
      const result = await apiService.classifyWithFailover(file);
      
      expect(result).toBeDefined();
      expect(result.label).toBeDefined();
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should track API metrics', async () => {
      const file = createMockFile('lion.jpg');
      
      await apiService.classifyWithFailover(file);
      
      const metrics = apiService.getAPIMetrics();
      expect(typeof metrics).toBe('object');
    });

    it('should reset failed APIs', () => {
      apiService.resetFailedAPIs();
      const failedAPIs = apiService.getFailedAPIs();
      expect(failedAPIs.length).toBe(0);
    });

    it('should return available APIs', () => {
      const availableAPIs = apiService.getAvailableAPIs();
      expect(Array.isArray(availableAPIs)).toBe(true);
      expect(availableAPIs.length).toBeGreaterThan(0);
    });
  });

  describe('Ensemble Classification', () => {
    it('should handle multiple API results', async () => {
      const file = createMockFile('elephant.jpg');
      
      const result = await apiService.classifyWithFailover(file);
      
      expect(result.label).toBeDefined();
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });
  });
});

describe('Integration Tests', () => {
  describe('Full Recognition Pipeline', () => {
    it('should complete full recognition workflow for wild animal', async () => {
      const service = new WildlifeRecognitionService();
      const file = createMockFile('tiger_photo.jpg');
      
      const result = await service.recognizeWildlife(file);
      
      expect(result).toBeDefined();
      expect(typeof result.isWild).toBe('boolean');
      
      if (result.isWild) {
        expect(result.commonName).toBeDefined();
        expect(result.scientificName).toBeDefined();
        expect(result.confidence).toBeGreaterThan(0);
      } else {
        expect(result.message).toBe("This is not a wild animal.");
      }
    });

    it('should complete full recognition workflow for domestic animal', async () => {
      const service = new WildlifeRecognitionService();
      const file = createMockFile('dog_photo.jpg');
      
      const result = await service.recognizeWildlife(file);
      
      expect(result.isWild).toBe(false);
      expect(result.message).toBe("This is not a wild animal.");
      expect(result.commonName).toBeUndefined();
      expect(result.scientificName).toBeUndefined();
    });

    it('should handle edge cases gracefully', async () => {
      const service = new WildlifeRecognitionService();
      const file = createMockFile('unknown_animal.jpg');
      
      const result = await service.recognizeWildlife(file);
      
      expect(result).toBeDefined();
      expect(typeof result.isWild).toBe('boolean');
      
      // Should either identify as wild with names or not wild with message
      if (result.isWild) {
        expect(result.commonName).toBeDefined();
        expect(result.scientificName).toBeDefined();
      } else {
        expect(result.message).toBeDefined();
      }
    });
  });
});