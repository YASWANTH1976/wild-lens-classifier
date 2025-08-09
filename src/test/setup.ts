import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-url');
global.URL.revokeObjectURL = vi.fn();

// Mock FileReader
global.FileReader = class {
  result: string | null = null;
  onload: ((event: any) => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  
  readAsDataURL(file: File) {
    setTimeout(() => {
      this.result = 'data:image/jpeg;base64,mock-base64-data';
      if (this.onload) {
        this.onload({ target: this });
      }
    }, 0);
  }
  
  readAsArrayBuffer(file: File) {
    setTimeout(() => {
      this.result = new ArrayBuffer(8);
      if (this.onload) {
        this.onload({ target: this });
      }
    }, 0);
  }
} as any;

// Mock fetch
global.fetch = vi.fn();

// Mock console methods to reduce test noise
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_GOOGLE_VISION_API_KEY: 'mock-api-key',
    VITE_AWS_ACCESS_KEY_ID: 'mock-aws-key',
    VITE_AWS_SECRET_ACCESS_KEY: 'mock-aws-secret',
    VITE_AWS_REGION: 'us-east-1'
  }
}));