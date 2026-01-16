import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, PawPrint, BookOpen, GraduationCap, Heart, ClipboardList } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { UserSidebarTrigger, UserSidebar } from './UserSidebar';

const navLinks = [
  { href: '/learn', label: 'Pet Care', icon: BookOpen },
  { href: '/training', label: 'Training', icon: GraduationCap },
  { href: '/health', label: 'Health Tracker', icon: Heart },
  { href: '/tasks', label: 'Chore Manager', icon: ClipboardList },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userSidebarOpen, setUserSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
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

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* User Sidebar Trigger */}
            <UserSidebarTrigger onClick={() => setUserSidebarOpen(true)} />

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <div className="flex flex-col gap-4 mt-8">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 font-display text-xl font-bold text-primary mb-4">
                    <PawPrint className="h-6 w-6" />
                    PetFamily Hub
                  </Link>
                  
                  {navLinks.map(({ href, label, icon: Icon }) => (
                    <Link key={href} to={href} onClick={() => setMobileMenuOpen(false)}>
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* User Sidebar */}
      <UserSidebar isOpen={userSidebarOpen} onClose={() => setUserSidebarOpen(false)} />
    </>
  );
}