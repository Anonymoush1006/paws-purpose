import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-20 left-10 text-4xl animate-float opacity-20">🐾</div>
        <div className="absolute top-40 right-20 text-3xl animate-float-delayed opacity-20">🐾</div>
        <div className="absolute bottom-40 left-20 text-5xl animate-float opacity-15">🐾</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-float-delayed opacity-20">🐾</div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      {/* Content */}
      <div className="container relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 shadow-soft mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Pet Care Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
            <span className="block mb-2">Because Every Paw</span>
            <span className="text-gradient">Deserves Love, Care</span>
            <span className="block mt-2">&amp; Purpose</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed fade-in-up-delayed">
            Your family's complete pet care companion. Learn, track, and nurture your 
            furry, feathered, and scaly friends with AI-powered guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 fade-in-up-delayed">
            <Link to="/learn">
              <Button size="lg" className="btn-glow w-full sm:w-auto gap-2 text-lg px-8 py-6 rounded-full">
                Explore Pet Care
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto gap-2 text-lg px-8 py-6 rounded-full bg-card/80 backdrop-blur-sm border-2 hover:bg-card hover:border-primary/50 transition-all"
              onClick={() => {
                // Trigger PawsBot opening
                const pawsBotButton = document.querySelector('[aria-label="Open PawsBot chat"]') as HTMLButtonElement;
                if (pawsBotButton) pawsBotButton.click();
              }}
            >
              <MessageCircle className="h-5 w-5" />
              Meet PawsBot
            </Button>
          </div>

          {/* Pet Icons Row */}
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { emoji: '🐕', label: 'Dogs', delay: '0ms' },
              { emoji: '🐱', label: 'Cats', delay: '100ms' },
              { emoji: '🐰', label: 'Rabbits', delay: '200ms' },
              { emoji: '🐟', label: 'Fish', delay: '300ms' },
              { emoji: '🐦', label: 'Birds', delay: '400ms' },
              { emoji: '🐹⚙️', label: 'Hamsters', delay: '500ms' },
              { emoji: '🐹🥕', label: 'Guinea Pigs', delay: '600ms' },
              { emoji: '🐢', label: 'Turtles', delay: '700ms' },
            ].map(({ emoji, label, delay }) => (
              <Link 
                key={label} 
                to={`/learn/${label.toLowerCase().replace(' ', '_')}`}
                className="group"
              >
                <div 
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card/60 backdrop-blur-sm border border-transparent hover:border-primary/30 hover:bg-card/90 transition-all duration-300 hover:shadow-glow-pink hover:-translate-y-1"
                  style={{ animationDelay: delay }}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
