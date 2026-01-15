import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, Mail, Lock, User, PawPrint, Loader2, Sparkles, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    };
    
    Object.values(checks).forEach(passed => { if (passed) score++; });
    
    return {
      score,
      checks,
      label: score <= 1 ? 'Weak' : score <= 3 ? 'Medium' : score <= 4 ? 'Strong' : 'Very Strong',
      color: score <= 1 ? 'bg-destructive' : score <= 3 ? 'bg-warning' : 'bg-success',
    };
  }, [password]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);
    
    if (error) {
      toast({ 
        title: 'Oops! Something went wrong 🐾', 
        description: error.message, 
        variant: 'destructive' 
      });
    } else {
      toast({ 
        title: 'Welcome to the family! 🎉', 
        description: "Your account has been created. Let's set up your pet profiles!"
      });
      navigate('/dashboard');
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 gradient-pastel">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 text-6xl opacity-10 animate-float">🐰</div>
          <div className="absolute bottom-20 left-10 text-5xl opacity-10 animate-float-delayed">🐦</div>
          <div className="absolute top-1/3 left-20 text-4xl opacity-10 animate-float">🐾</div>
        </div>

        <Card className="w-full max-w-md relative z-10 shadow-card border-2 border-transparent hover:border-primary/20 transition-all duration-300">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-pink animate-pulse-glow">
              <PawPrint className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="font-display text-3xl text-gradient">Join Lovable Paws!</CardTitle>
            <CardDescription className="text-base mt-2">
              Start your pet care journey with us 🐾
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Your Name
                </Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="What should we call you?"
                  className={cn(
                    errors.name && "border-destructive focus-visible:ring-destructive/20"
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="you@example.com"
                  className={cn(
                    errors.email && "border-destructive focus-visible:ring-destructive/20"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Password
                </Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'}
                    value={password} 
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    placeholder="Create a secure password"
                    className={cn(
                      "pr-12",
                      errors.password && "border-destructive focus-visible:ring-destructive/20"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                    {errors.password}
                  </p>
                )}

                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2 animate-fade-in">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            "h-1.5 flex-1 rounded-full transition-all duration-300",
                            passwordStrength.score >= level ? passwordStrength.color : "bg-muted"
                          )}
                        />
                      ))}
                    </div>
                    <p className={cn(
                      "text-xs font-medium",
                      passwordStrength.score <= 1 ? "text-destructive" : 
                      passwordStrength.score <= 3 ? "text-warning-foreground" : "text-success"
                    )}>
                      Password strength: {passwordStrength.label}
                    </p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {[
                        { key: 'length', label: '8+ characters' },
                        { key: 'uppercase', label: 'Uppercase' },
                        { key: 'lowercase', label: 'Lowercase' },
                        { key: 'number', label: 'Number' },
                      ].map(({ key, label }) => (
                        <div 
                          key={key}
                          className={cn(
                            "flex items-center gap-1",
                            passwordStrength.checks[key as keyof typeof passwordStrength.checks] 
                              ? "text-success" 
                              : "text-muted-foreground"
                          )}
                        >
                          {passwordStrength.checks[key as keyof typeof passwordStrength.checks] 
                            ? <Check className="h-3 w-3" /> 
                            : <X className="h-3 w-3" />}
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-base btn-glow" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-primary font-semibold hover:underline underline-offset-4 transition-all"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
