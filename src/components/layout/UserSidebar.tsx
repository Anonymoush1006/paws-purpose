import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Settings, 
  PawPrint, 
  Heart, 
  Trophy, 
  Bell, 
  LogOut,
  ChevronRight,
  X,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: PawPrint, label: 'My Pets', href: '/dashboard', description: 'Manage your furry friends' },
    { icon: Heart, label: 'Health Tracker', href: '/health', description: 'Track wellness & vet visits' },
    { icon: Trophy, label: 'Achievements', href: '/tasks', description: 'View your badges & points' },
    { icon: Bell, label: 'Reminders', href: '/tasks', description: 'Care reminders & schedules' },
    { icon: Settings, label: 'Settings', href: '/dashboard', description: 'Account preferences' },
  ];

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Pet Lover';
  const userInitials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-sidebar z-50 shadow-2xl transition-transform duration-300 ease-out",
          "border-l border-sidebar-border",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 gradient-peach-yellow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-lg text-foreground">My Account</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="hover:bg-foreground/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile Card */}
          {user ? (
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-background shadow-lg">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate">
                  {displayName}
                </h3>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Trophy className="h-3 w-3 text-gold" />
                  <span className="text-xs text-muted-foreground">Pet Parent Pro</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-sm mb-4">Sign in to access your account</p>
              <div className="flex gap-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full" onClick={onClose}>
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button size="sm" className="w-full" onClick={onClose}>
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        {user && (
          <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                    isActive 
                      ? "bg-primary/15 text-primary" 
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    isActive ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium block">{item.label}</span>
                    <span className="text-xs text-muted-foreground truncate block">
                      {item.description}
                    </span>
                  </div>
                  <ChevronRight className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    "group-hover:translate-x-1"
                  )} />
                </Link>
              );
            })}
          </nav>
        )}

        {/* Footer */}
        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border bg-sidebar">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                signOut();
                onClose();
              }}
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}

// Trigger button to open the sidebar
export function UserSidebarTrigger({ onClick }: { onClick: () => void }) {
  const { user } = useAuth();
  
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'U';
  const userInitials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="relative group"
      aria-label="Open user menu"
    >
      {user ? (
        <Avatar className="h-8 w-8 border-2 border-primary/30 group-hover:border-primary transition-colors">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-bold">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      ) : (
        <User className="h-5 w-5" />
      )}
    </Button>
  );
}