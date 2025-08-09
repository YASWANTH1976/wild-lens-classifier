import { useEffect, useState } from 'react';
import { authService } from '@/lib/authService';
import { LoginPage } from './LoginPage';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface AuthWrapperProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}
export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authService.subscribe((authState) => {
      setUser(authState.user);
      setLoading(authState.isLoading);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Loading Wildlife Classifier...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
};