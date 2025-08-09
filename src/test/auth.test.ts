import { describe, it, expect, beforeEach } from 'vitest';
import { authService } from '@/lib/authService';

describe('AuthService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    authService.logout();
  });

  describe('Login', () => {
    it('should login with demo credentials', async () => {
      const result = await authService.login('demo@wild', 'Demo1234');
      
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(authService.isAuthenticated()).toBe(true);
      
      const user = authService.getCurrentUser();
      expect(user).toBeDefined();
      expect(user?.email).toBe('demo@wild');
      expect(user?.name).toBe('Wildlife Demo User');
    });

    it('should login with researcher credentials', async () => {
      const result = await authService.login('researcher@wild', 'Research123');
      
      expect(result.success).toBe(true);
      expect(authService.isAuthenticated()).toBe(true);
      
      const user = authService.getCurrentUser();
      expect(user?.role).toBe('researcher');
    });

    it('should login with admin credentials', async () => {
      const result = await authService.login('admin@wild', 'Admin123');
      
      expect(result.success).toBe(true);
      expect(authService.isAuthenticated()).toBe(true);
      
      const user = authService.getCurrentUser();
      expect(user?.role).toBe('admin');
    });

    it('should reject invalid credentials', async () => {
      const result = await authService.login('invalid@email.com', 'wrongpassword');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should reject empty credentials', async () => {
      const result = await authService.login('', '');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Signup', () => {
    it('should create new account with valid data', async () => {
      const result = await authService.signup('newuser@wild', 'Password123', 'New User');
      
      expect(result.success).toBe(true);
      expect(authService.isAuthenticated()).toBe(true);
      
      const user = authService.getCurrentUser();
      expect(user?.email).toBe('newuser@wild');
      expect(user?.name).toBe('New User');
      expect(user?.role).toBe('user');
    });

    it('should reject signup with existing email', async () => {
      const result = await authService.signup('demo@wild', 'Password123', 'Test User');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('already exists');
    });

    it('should reject invalid email format', async () => {
      const result = await authService.signup('invalid-email', 'Password123', 'Test User');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject short password', async () => {
      const result = await authService.signup('test@wild', '123', 'Test User');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject empty name', async () => {
      const result = await authService.signup('test@wild', 'Password123', '');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Session Management', () => {
    it('should maintain session after login', async () => {
      await authService.login('demo@wild', 'Demo1234');
      
      expect(authService.isAuthenticated()).toBe(true);
      expect(authService.getCurrentUser()).toBeDefined();
    });

    it('should clear session after logout', async () => {
      await authService.login('demo@wild', 'Demo1234');
      authService.logout();
      
      expect(authService.isAuthenticated()).toBe(false);
      expect(authService.getCurrentUser()).toBeNull();
    });

    it('should persist session in localStorage', async () => {
      await authService.login('demo@wild', 'Demo1234');
      
      const savedUser = localStorage.getItem('wildlife_auth_user');
      const savedExpiry = localStorage.getItem('wildlife_auth_expiry');
      
      expect(savedUser).toBeDefined();
      expect(savedExpiry).toBeDefined();
      
      const user = JSON.parse(savedUser!);
      expect(user.email).toBe('demo@wild');
    });
  });

  describe('Demo Credentials', () => {
    it('should provide demo credentials', () => {
      const credentials = authService.getDemoCredentials();
      
      expect(credentials.primary).toBeDefined();
      expect(credentials.primary.email).toBe('demo@wild');
      expect(credentials.primary.password).toBe('Demo1234');
      
      expect(credentials.additional).toBeDefined();
      expect(Array.isArray(credentials.additional)).toBe(true);
      expect(credentials.additional.length).toBeGreaterThan(0);
    });
  });

  describe('User Roles', () => {
    it('should assign correct role for demo user', async () => {
      await authService.login('demo@wild', 'Demo1234');
      const user = authService.getCurrentUser();
      expect(user?.role).toBe('researcher');
    });

    it('should assign correct role for researcher', async () => {
      await authService.login('researcher@wild', 'Research123');
      const user = authService.getCurrentUser();
      expect(user?.role).toBe('researcher');
    });

    it('should assign correct role for admin', async () => {
      await authService.login('admin@wild', 'Admin123');
      const user = authService.getCurrentUser();
      expect(user?.role).toBe('admin');
    });

    it('should assign user role for new signups', async () => {
      await authService.signup('newuser@wild', 'Password123', 'New User');
      const user = authService.getCurrentUser();
      expect(user?.role).toBe('user');
    });
  });
});