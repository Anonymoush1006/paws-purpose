import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, PawPrint, BookOpen, GraduationCap, Heart, ClipboardList, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/learn', label: 'Pet Care', icon: BookOpen },
  { href: '/training', label: 'Training', icon: GraduationCap },
  { href: '/health', label: 'Health Tracker', icon: Heart },
  { href: '/tasks', label: 'Chore Manager', icon: ClipboardList },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <PawPrint className="h-7 w-7" />
          <span className="hidden sm:inline">PetFamily Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} to={href}>
              <Button
                variant="ghost"
                className={cn(
                  "gap-2",
                  location.pathname === href && "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  My Pets
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <div className="flex flex-col gap-4 mt-8">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 font-display text-xl font-bold text-primary mb-4">
                <PawPrint className="h-6 w-6" />
                PetFamily Hub
              </Link>
              
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link key={href} to={href} onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3",
                      location.pathname === href && "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Button>
                </Link>
              ))}

              <div className="border-t pt-4 mt-2">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-3 mb-2">
                        <User className="h-5 w-5" />
                        My Pets
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => { signOut(); setOpen(false); }}>
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start mb-2">Sign In</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
