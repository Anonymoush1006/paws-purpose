import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { petDatabase, PetType } from '@/lib/petData';
import { getPetEmoji } from '@/components/icons/PetIcons';
import { cn } from '@/lib/utils';
import { ArrowRight, MessageCircle } from 'lucide-react';

const petOrder: PetType[] = ['dog', 'cat', 'rabbit', 'fish', 'bird', 'hamster', 'guinea_pig', 'turtle', 'other'];

// Color mappings using new palette
const petGradients: Record<PetType, string> = {
  dog: 'from-glow-peach/30 to-glow-yellow/30 hover:from-glow-peach/50 hover:to-glow-yellow/50',
  cat: 'from-glow-periwinkle/30 to-accent/30 hover:from-glow-periwinkle/50 hover:to-accent/50',
  rabbit: 'from-pink-200/40 to-glow-peach/30 hover:from-pink-200/60 hover:to-glow-peach/50',
  fish: 'from-glow-sky/30 to-primary/30 hover:from-glow-sky/50 hover:to-primary/50',
  bird: 'from-glow-yellow/30 to-glow-mint/30 hover:from-glow-yellow/50 hover:to-glow-mint/50',
  hamster: 'from-glow-peach/40 to-amber-200/30 hover:from-glow-peach/60 hover:to-amber-200/50',
  guinea_pig: 'from-glow-mint/40 to-glow-yellow/30 hover:from-glow-mint/60 hover:to-glow-yellow/50',
  turtle: 'from-glow-mint/40 to-emerald-200/30 hover:from-glow-mint/60 hover:to-emerald-200/50',
  other: 'from-glow-sky/30 to-glow-periwinkle/30 hover:from-glow-sky/50 hover:to-glow-periwinkle/50',
};

const petBorderColors: Record<PetType, string> = {
  dog: 'hover:border-glow-peach',
  cat: 'hover:border-glow-periwinkle',
  rabbit: 'hover:border-pink-400',
  fish: 'hover:border-glow-sky',
  bird: 'hover:border-glow-yellow',
  hamster: 'hover:border-amber-400',
  guinea_pig: 'hover:border-glow-mint',
  turtle: 'hover:border-emerald-400',
  other: 'hover:border-primary',
};

export function PetTypeCards() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-hero opacity-50" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Explore Pet Care
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient">Furry Friend</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any pet to discover comprehensive care guides, tips, and everything 
            you need to be the best pet parent!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
          {petOrder.map((type, index) => {
            const pet = petDatabase[type];
            const emoji = getPetEmoji(type);
            
            return (
              <Link 
                key={type} 
                to={`/learn/${type}`}
                className="group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card 
                  className={cn(
                    "cursor-pointer overflow-hidden transition-all duration-300 border-2 border-transparent",
                    "bg-gradient-to-br",
                    petGradients[type],
                    petBorderColors[type],
                    "hover:shadow-xl hover:-translate-y-2 card-glow"
                  )}
                >
                  <CardContent className="p-6 text-center relative">
                    {/* Decorative glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/40 rounded-full blur-2xl" />
                    </div>

                    {/* Emoji */}
                    <div className="relative text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {emoji}
                    </div>

                    {/* Name */}
                    <h3 className="font-display font-bold text-lg text-foreground mb-1">
                      {pet.name}
                    </h3>

                    {/* Care Level Badge */}
                    <span className={cn(
                      "inline-block px-2 py-0.5 rounded-full text-xs font-medium",
                      pet.careLevel === 'Easy' && "bg-success/20 text-success",
                      pet.careLevel === 'Medium' && "bg-warning/30 text-warning-foreground",
                      pet.careLevel === 'Advanced' && "bg-primary/20 text-primary",
                    )}>
                      {pet.careLevel} Care
                    </span>

                    {/* Hover arrow */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <ArrowRight className="h-4 w-4 mx-auto text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Ask PawsBot CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Not sure which pet is right for you?</p>
          <Button 
            variant="outline" 
            className="gap-2 rounded-full px-6"
            onClick={() => {
              const pawsBotButton = document.querySelector('[aria-label="Open PawsBot chat"]') as HTMLButtonElement;
              if (pawsBotButton) pawsBotButton.click();
            }}
          >
            <MessageCircle className="h-4 w-4" />
            Ask PawsBot 🐾
          </Button>
        </div>
      </div>
    </section>
  );
}