import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Heart, ClipboardList } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pet emojis animation */}
          <div className="flex justify-center gap-3 mb-6 text-4xl md:text-5xl">
            <span className="animate-bounce-gentle" style={{ animationDelay: '0ms' }}>🐕</span>
            <span className="animate-bounce-gentle" style={{ animationDelay: '200ms' }}>🐱</span>
            <span className="animate-bounce-gentle" style={{ animationDelay: '400ms' }}>🐰</span>
            <span className="animate-bounce-gentle" style={{ animationDelay: '600ms' }}>🐟</span>
            <span className="animate-bounce-gentle" style={{ animationDelay: '800ms' }}>🐦</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Your Family's{' '}
            <span className="text-primary">Pet Care</span>{' '}
            Adventure Starts Here!
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn how to care for your furry, feathered, and finned friends together as a family. 
            Track health, manage chores, and become the best pet parents!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/learn">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-lg">
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg">
                Create Free Account
              </Button>
            </Link>
          </div>

          {/* Quick Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link to="/learn" className="group">
              <div className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-all hover:-translate-y-1">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-display font-semibold">Care Guides</p>
                <p className="text-sm text-muted-foreground">For all pets</p>
              </div>
            </Link>
            <Link to="/health" className="group">
              <div className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-all hover:-translate-y-1">
                <Heart className="h-8 w-8 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-display font-semibold">Health Tracker</p>
                <p className="text-sm text-muted-foreground">Vet & vaccines</p>
              </div>
            </Link>
            <Link to="/tasks" className="group">
              <div className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-all hover:-translate-y-1">
                <ClipboardList className="h-8 w-8 text-success mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-display font-semibold">Chore Manager</p>
                <p className="text-sm text-muted-foreground">Family tasks</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
