import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authService } from '@/lib/authService';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Camera, Sparkles } from 'lucide-react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const demoCredentials = authService.getDemoCredentials();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authService.login(email, password);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast({
        title: "Welcome back!",
        description: "Successfully signed in to Wildlife Classifier.",
      });
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authService.signup(email, password, name);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast({
        title: "Account created!",
        description: "Welcome to Wildlife Classifier!",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail(demoCredentials.primary.email);
    setPassword(demoCredentials.primary.password);
    
    const result = await authService.login(demoCredentials.primary.email, demoCredentials.primary.password);
    if (result.success) {
      toast({
        title: "Demo Login Successful!",
        description: "Welcome to Wildlife Classifier demo.",
      });
    }
  };
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      {/* Animated Background */}
      <div className="absolute inset-0 wildlife-background opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-pulse">
        <Sparkles className="h-8 w-8 text-primary/40" />
      </div>
      <div className="absolute top-40 right-20 animate-pulse delay-1000">
        <Camera className="h-6 w-6 text-secondary/40" />
      </div>
      <div className="absolute bottom-32 left-1/4 animate-pulse delay-2000">
        <Sparkles className="h-4 w-4 text-accent/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center space-x-2">
              <Camera className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                WildTracker
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              AI-Powered Wildlife Classification
            </p>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Powered by Hugging Face Transformers</span>
            </div>
          </div>

          {/* Auth Form */}
          <Card className="wildlife-card border-0 shadow-2xl animate-scale-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome</CardTitle>
              <CardDescription>
                Sign in to start identifying wildlife with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="border-muted pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : null}
                      Sign In
                    </Button>
                  </form>
                  
                  {/* Demo Login Section */}
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Demo Access
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full"
                      onClick={handleDemoLogin}
                      disabled={isLoading}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Try Demo Login
                    </Button>
                    
                    <div className="text-xs text-center text-muted-foreground space-y-1">
                      <p><strong>Demo:</strong> {demoCredentials.primary.email} / {demoCredentials.primary.password}</p>
                      {demoCredentials.additional.map((cred, i) => (
                        <p key={i}><strong>{cred.role}:</strong> {cred.email} / {cred.password}</p>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                          className="border-muted pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : null}
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 text-center animate-fade-in">
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Upload Images</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-secondary" />
              </div>
              <p className="text-sm font-medium">AI Classification</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-accent" />
              </div>
              <p className="text-sm font-medium">Explore Wildlife</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};