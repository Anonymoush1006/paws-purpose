import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList, Trophy } from 'lucide-react';

export default function TasksPage() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="font-display text-4xl font-bold mb-4 text-center">Family Chore Manager</h1>
        <p className="text-lg text-muted-foreground text-center mb-8">
          Assign pet care tasks to family members and earn rewards!
        </p>

        {!user ? (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <ClipboardList className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Sign In Required</h3>
              <p className="text-muted-foreground mb-4">Create an account to manage family pet chores.</p>
              <Link to="/signup"><Button>Get Started Free</Button></Link>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card className="mb-6 bg-gradient-to-r from-warning/20 to-gold/20 border-warning/30">
              <CardContent className="p-6 flex items-center gap-4">
                <Trophy className="h-10 w-10 text-warning" />
                <div>
                  <p className="font-display font-bold text-lg">Earn Rewards!</p>
                  <p className="text-sm text-muted-foreground">Complete tasks to earn stars and badges</p>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-8">
              <p className="text-muted-foreground">Add a pet first to create tasks for them.</p>
              <Link to="/dashboard"><Button variant="outline" className="mt-4">Go to Dashboard</Button></Link>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
