import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { petDatabase, PetType } from '@/lib/petData';
import { cn } from '@/lib/utils';

const petOrder: PetType[] = ['dog', 'cat', 'rabbit', 'fish', 'bird', 'hamster', 'guinea_pig', 'turtle'];

export function PetTypeCards() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Choose Your Pet Type
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any pet to learn everything about caring for them!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {petOrder.map((type) => {
            const pet = petDatabase[type];
            return (
              <Link key={type} to={`/learn/${type}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-2 overflow-hidden border-2 hover:border-primary/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform">
                      {pet.emoji}
                    </div>
                    <h3 className="font-display font-bold text-lg">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pet.careLevel} care
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link to="/learn" className="text-primary hover:underline font-medium">
            View all pet care guides →
          </Link>
        </div>
      </div>
    </section>
  );
}
