import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Syringe, Stethoscope, Weight } from 'lucide-react';

export default function HealthPage() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="font-display text-4xl font-bold mb-4 text-center">Health Tracker</h1>
        <p className="text-lg text-muted-foreground text-center mb-8">
          Keep track of your pet's health records, vaccinations, and vet visits.
        </p>

        {!user ? (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <Heart className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Sign In Required</h3>
              <p className="text-muted-foreground mb-4">Create an account to track your pet's health records.</p>
              <Link to="/signup"><Button>Get Started Free</Button></Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader><CardTitle className="flex items-center gap-2"><Syringe className="h-5 w-5 text-primary" />Vaccinations</CardTitle></CardHeader>
              <CardContent><CardDescription>Track vaccines and upcoming boosters</CardDescription></CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader><CardTitle className="flex items-center gap-2"><Stethoscope className="h-5 w-5 text-accent" />Vet Visits</CardTitle></CardHeader>
              <CardContent><CardDescription>Log appointments and notes</CardDescription></CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader><CardTitle className="flex items-center gap-2"><Weight className="h-5 w-5 text-success" />Weight Log</CardTitle></CardHeader>
              <CardContent><CardDescription>Monitor weight over time</CardDescription></CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
