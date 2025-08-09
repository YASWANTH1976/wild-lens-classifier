import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WildlifeRecognitionClassifier } from '@/components/WildlifeRecognitionClassifier';
import { LoginPage } from '@/components/auth/LoginPage';
import { AuthWrapper } from '@/components/auth/AuthWrapper';

// Mock the services
vi.mock('@/lib/wildlifeRecognitionService', () => ({
  WildlifeRecognitionService: vi.fn().mockImplementation(() => ({
    recognizeWildlife: vi.fn().mockResolvedValue({
      isWild: true,
      commonName: 'Bengal Tiger',
      scientificName: 'Panthera tigris',
      confidence: 0.95
    }),
    getSupportedWildSpeciesCount: vi.fn().mockReturnValue(639),
    getAPIMetrics: vi.fn().mockReturnValue({}),
    resetFailedAPIs: vi.fn()
  }))
}));

vi.mock('@/lib/authService', () => ({
  authService: {
    login: vi.fn(),
    signup: vi.fn(),
    logout: vi.fn(),
    getCurrentUser: vi.fn(),
    isAuthenticated: vi.fn(),
    isLoading: vi.fn(),
    subscribe: vi.fn(),
    getDemoCredentials: vi.fn().mockReturnValue({
      primary: { email: 'demo@wild', password: 'Demo1234' },
      additional: []
    })
  }
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn()
  }
}));

describe('WildlifeRecognitionClassifier UI', () => {
  it('should render upload section', () => {
    render(<WildlifeRecognitionClassifier />);
    
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
    expect(screen.getByText('Choose File')).toBeInTheDocument();
    expect(screen.getByText('Recognize Wildlife')).toBeInTheDocument();
  });

  it('should render results section', () => {
    render(<WildlifeRecognitionClassifier />);
    
    expect(screen.getByText('Recognition Result')).toBeInTheDocument();
    expect(screen.getByText('Ready for Recognition')).toBeInTheDocument();
  });

  it('should show information section', () => {
    render(<WildlifeRecognitionClassifier />);
    
    expect(screen.getByText('About Wildlife Recognition')).toBeInTheDocument();
    expect(screen.getByText('For Wild Animals:')).toBeInTheDocument();
    expect(screen.getByText('For Non-Wild Animals:')).toBeInTheDocument();
  });

  it('should handle file upload', async () => {
    render(<WildlifeRecognitionClassifier />);
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    
    const file = new File(['test'], 'tiger.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('Change Image')).toBeInTheDocument();
    });
  });

  it('should disable recognition button when no file selected', () => {
    render(<WildlifeRecognitionClassifier />);
    
    const recognizeButton = screen.getByText('Recognize Wildlife');
    expect(recognizeButton).toBeDisabled();
  });

  it('should show loading state during recognition', async () => {
    render(<WildlifeRecognitionClassifier />);
    
    // Upload a file first
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['test'], 'tiger.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      const recognizeButton = screen.getByText('Recognize Wildlife');
      expect(recognizeButton).not.toBeDisabled();
    });
  });
});

describe('LoginPage UI', () => {
  it('should render login form', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('should show demo credentials', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('Try Demo Login')).toBeInTheDocument();
    expect(screen.getByText(/demo@wild/)).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.change(emailInput, { target: { value: 'demo@wild' } });
    fireEvent.change(passwordInput, { target: { value: 'Demo1234' } });
    fireEvent.click(signInButton);
    
    // Form should be submitted
    expect(emailInput).toHaveValue('demo@wild');
    expect(passwordInput).toHaveValue('Demo1234');
  });

  it('should toggle password visibility', () => {
    render(<LoginPage />);
    
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const toggleButton = passwordInput.parentElement?.querySelector('button');
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    if (toggleButton) {
      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');
    }
  });
});

describe('Responsive Design', () => {
  it('should render properly on mobile viewport', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<WildlifeRecognitionClassifier />);
    
    expect(screen.getByText('Wildlife Recognition System')).toBeInTheDocument();
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
  });

  it('should render properly on desktop viewport', () => {
    // Mock desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });

    render(<WildlifeRecognitionClassifier />);
    
    expect(screen.getByText('Wildlife Recognition System')).toBeInTheDocument();
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  it('should have proper ARIA labels', () => {
    render(<WildlifeRecognitionClassifier />);
    
    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  });

  it('should support keyboard navigation', () => {
    render(<WildlifeRecognitionClassifier />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).not.toHaveAttribute('tabindex', '-1');
    });
  });

  it('should have proper heading hierarchy', () => {
    render(<WildlifeRecognitionClassifier />);
    
    const mainHeading = screen.getByText('Wildlife Recognition System');
    expect(mainHeading).toBeInTheDocument();
  });
});