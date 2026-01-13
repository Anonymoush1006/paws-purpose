import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { petDatabase, PetType } from '@/lib/petData';

const petOrder: PetType[] = ['dog', 'cat', 'rabbit', 'fish', 'bird', 'hamster', 'guinea_pig', 'turtle', 'other'];

export default function LearnPage() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Pet Care Education Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn everything about caring for your pets! Click on any pet to see detailed care guides.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {petOrder.map((type) => {
            const pet = petDatabase[type];
            return (
              <Link key={type} to={`/learn/${type}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-2 border-2 hover:border-primary/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{pet.emoji}</div>
                    <h3 className="font-display font-bold">{pet.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{pet.careLevel} care • {pet.lifespan}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
