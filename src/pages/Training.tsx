import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { petDatabase, PetType } from '@/lib/petData';
import { Link } from 'react-router-dom';

const petOrder: PetType[] = ['dog', 'cat', 'rabbit', 'bird', 'hamster', 'guinea_pig'];

export default function TrainingPage() {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="font-display text-4xl font-bold mb-4 text-center">Training & Behavior Hub</h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Find solutions to common pet behavior problems and learn training tips!
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {petOrder.map((type) => {
            const pet = petDatabase[type];
            return (
              <Card key={type} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{pet.emoji}</span>
                    {pet.name} Training
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pet.commonIssues.slice(0, 2).map((issue, i) => (
                      <div key={i} className="border-l-2 border-primary/30 pl-3">
                        <p className="font-medium text-sm">{issue.title}</p>
                        <p className="text-xs text-muted-foreground">{issue.solution}</p>
                      </div>
                    ))}
                  </div>
                  <Link to={`/learn/${type}`} className="text-primary text-sm hover:underline mt-4 inline-block">
                    View full guide →
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
