interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Demo credentials
const DEMO_CREDENTIALS = {
  email: 'demo@wild',
  password: 'Demo1234',
  user: {
    id: 'demo-user-001',
    email: 'demo@wild',
    name: 'Wildlife Demo User',
    role: 'researcher'
  }
};

// Additional demo users
const DEMO_USERS = [
  {
    email: 'researcher@wild',
    password: 'Research123',
    user: {
      id: 'researcher-001',
      email: 'researcher@wild',
      name: 'Dr. Wildlife Researcher',
      role: 'researcher'
    }
  },
  {
    email: 'admin@wild',
    password: 'Admin123',
    user: {
      id: 'admin-001',
      email: 'admin@wild',
      name: 'Wildlife Admin',
      role: 'admin'
    }
  }
];

export class AuthService {
  private static instance: AuthService;
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
  };
  private listeners: ((state: AuthState) => void)[] = [];

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  constructor() {
    // Check for existing session on initialization
    this.checkExistingSession();
  }

  private checkExistingSession() {
    const savedUser = localStorage.getItem('wildlife_auth_user');
    const sessionExpiry = localStorage.getItem('wildlife_auth_expiry');
    
    if (savedUser && sessionExpiry) {
      const expiry = new Date(sessionExpiry);
      if (expiry > new Date()) {
        this.authState = {
          user: JSON.parse(savedUser),
          isAuthenticated: true,
          isLoading: false
        };
        this.notifyListeners();
      } else {
        this.logout();
      }
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check demo credentials
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        return this.authenticateUser(DEMO_CREDENTIALS.user);
      }

      // Check additional demo users
      const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password);
      if (demoUser) {
        return this.authenticateUser(demoUser.user);
      }

      // Invalid credentials
      this.setLoading(false);
      return {
        success: false,
        error: 'Invalid email or password. Try demo@wild / Demo1234'
      };

    } catch (error) {
      this.setLoading(false);
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  }

  async signup(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    this.setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Basic validation
      if (!email.includes('@') || password.length < 6 || !name.trim()) {
        this.setLoading(false);
        return {
          success: false,
          error: 'Please provide valid email, password (6+ chars), and name'
        };
      }

      // Check if user already exists (demo mode)
      const existingUser = [DEMO_CREDENTIALS, ...DEMO_USERS].find(u => u.email === email);
      if (existingUser) {
        this.setLoading(false);
        return {
          success: false,
          error: 'User already exists. Try logging in instead.'
        };
      }

      // Create new demo user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: name.trim(),
        role: 'user'
      };

      return this.authenticateUser(newUser);

    } catch (error) {
      this.setLoading(false);
      return {
        success: false,
        error: 'Signup failed. Please try again.'
      };
    }
  }

  private authenticateUser(user: User): { success: boolean; error?: string } {
    // Set session expiry (24 hours)
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);

    // Save to localStorage
    localStorage.setItem('wildlife_auth_user', JSON.stringify(user));
    localStorage.setItem('wildlife_auth_expiry', expiry.toISOString());

    this.authState = {
      user,
      isAuthenticated: true,
      isLoading: false
    };

    this.notifyListeners();

    return { success: true };
  }

  logout() {
    localStorage.removeItem('wildlife_auth_user');
    localStorage.removeItem('wildlife_auth_expiry');

    this.authState = {
      user: null,
      isAuthenticated: false,
      isLoading: false
    };

    this.notifyListeners();
  }

  getCurrentUser(): User | null {
    return this.authState.user;
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  isLoading(): boolean {
    return this.authState.isLoading;
  }

  private setLoading(loading: boolean) {
    this.authState = {
      ...this.authState,
      isLoading: loading
    };
    this.notifyListeners();
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    // Immediately call with current state
    listener(this.authState);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  // Get demo credentials for UI display
  getDemoCredentials() {
    return {
      primary: { email: 'demo@wild', password: 'Demo1234' },
      additional: [
        { email: 'researcher@wild', password: 'Research123', role: 'Researcher' },
        { email: 'admin@wild', password: 'Admin123', role: 'Admin' }
      ]
    };
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();