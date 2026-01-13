import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Heart, ClipboardList } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return <Layout><div className="container py-12 text-center">Loading...</div></Layout>;
  if (!user) return <Navigate to="/login" />;

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="font-display text-3xl font-bold mb-2">My Pet Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome back! Manage your pets and tasks here.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-8 text-center">
              <PlusCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="font-display font-bold">Add Your First Pet</p>
              <p className="text-sm text-muted-foreground">Click to add a pet profile</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/health">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-destructive" />Health Tracker</CardTitle>
                <CardDescription>Track vaccinations, vet visits, and health records</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/tasks">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-success" />Chore Manager</CardTitle>
                <CardDescription>Assign and track pet care tasks for the family</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
