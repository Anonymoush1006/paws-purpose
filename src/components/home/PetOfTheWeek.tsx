import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { petOfTheWeekFacts, petDatabase } from '@/lib/petData';

export function PetOfTheWeek() {
  const [currentFact, setCurrentFact] = useState(0);

  const getRandomFact = () => {
    const newIndex = Math.floor(Math.random() * petOfTheWeekFacts.length);
    setCurrentFact(newIndex);
  };

  useEffect(() => {
    // Set initial random fact
    getRandomFact();
  }, []);

  const fact = petOfTheWeekFacts[currentFact];
  const pet = petDatabase[fact?.pet as keyof typeof petDatabase];

  if (!fact || !pet) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="container">
        <Card className="max-w-2xl mx-auto border-2 border-primary/20 shadow-lg overflow-hidden">
          <div className="bg-primary/10 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-primary">Fun Pet Fact!</span>
            </div>
            <Button variant="ghost" size="sm" onClick={getRandomFact} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              New Fact
            </Button>
          </div>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-5xl flex-shrink-0">
                {pet.emoji}
              </div>
              <div>
                <p className="text-lg font-medium mb-2">{fact.fact}</p>
                <p className="text-sm text-muted-foreground">
                  Did you know? Share this with your family!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
