import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Heart } from 'lucide-react';

export const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  return (
    <footer ref={ref} className="border-t bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary mb-3">
              <PawPrint className="h-5 w-5" />
              PetFamily Hub
            </Link>
            <p className="text-sm text-muted-foreground">
              Helping families care for their furry, feathered, and finned friends together!
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-display font-semibold mb-3">Learn</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/learn" className="hover:text-primary transition-colors">Pet Care Guides</Link></li>
              <li><Link to="/training" className="hover:text-primary transition-colors">Training Tips</Link></li>
              <li><Link to="/learn/quiz" className="hover:text-primary transition-colors">Pet Quiz</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-display font-semibold mb-3">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/health" className="hover:text-primary transition-colors">Health Tracker</Link></li>
              <li><Link to="/tasks" className="hover:text-primary transition-colors">Chore Manager</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">My Pets</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display font-semibold mb-3">Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for pet families everywhere
          </p>
          <p>© {new Date().getFullYear()} PetFamily Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
