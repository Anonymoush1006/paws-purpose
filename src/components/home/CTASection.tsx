import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-primary-foreground shadow-lg">
          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Pet Care Journey?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Create a free account to track your pets' health, assign family chores, 
            and earn rewards for great pet care!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg">
                Create Free Account
              </Button>
            </Link>
            <Link to="/learn">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Browse Without Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
