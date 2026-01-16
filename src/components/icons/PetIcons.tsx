import { cn } from '@/lib/utils';

interface PetIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-base',
  md: 'w-12 h-12 text-xl',
  lg: 'w-16 h-16 text-2xl',
  xl: 'w-24 h-24 text-4xl',
};

// Custom icon components for consistent visual differentiation

export function DogIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-glow-peach/30 to-glow-yellow/30 shadow-soft",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Dog">🐕</span>
    </div>
  );
}

export function CatIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-glow-periwinkle/30 to-accent/30 shadow-soft",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Cat">🐱</span>
    </div>
  );
}

export function FishIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-glow-sky/30 to-primary/30 shadow-soft",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Fish">🐟</span>
    </div>
  );
}

export function BirdIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-glow-yellow/30 to-glow-mint/30 shadow-soft",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Bird">🐦</span>
    </div>
  );
}

export function RabbitIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-pink-200/50 to-glow-peach/30 shadow-soft",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Rabbit">🐰</span>
    </div>
  );
}

export function TurtleIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-glow-mint/40 to-emerald-200/40 shadow-soft",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Turtle">🐢</span>
    </div>
  );
}

// CRITICAL: Hamster uses 🐿️ (chipmunk) for clear differentiation
export function HamsterIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-glow-peach/40 to-amber-200/40 shadow-soft",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Hamster">🐿️</span>
    </div>
  );
}

// CRITICAL: Guinea Pig uses 🦔 (hedgehog) for clear differentiation - round body similar look
export function GuineaPigIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-glow-mint/40 to-glow-yellow/40 shadow-soft",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Guinea Pig">🦔</span>
    </div>
  );
}

export function OtherPetsIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-glow-sky/30 to-glow-periwinkle/30 shadow-soft",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Other Pets">🐾</span>
    </div>
  );
}

// Utility to get icon by pet type
export function getPetIcon(petType: string, props?: PetIconProps) {
  const icons: Record<string, React.FC<PetIconProps>> = {
    dog: DogIcon,
    cat: CatIcon,
    fish: FishIcon,
    bird: BirdIcon,
    rabbit: RabbitIcon,
    turtle: TurtleIcon,
    hamster: HamsterIcon,
    guinea_pig: GuineaPigIcon,
    other: OtherPetsIcon,
  };

  const IconComponent = icons[petType] || OtherPetsIcon;
  return <IconComponent {...props} />;
}

// Display text with proper emoji differentiation
// Hamster: 🐿️ (chipmunk - small energetic rodent)
// Guinea Pig: 🦔 (hedgehog - round body pet)
export function getPetEmoji(petType: string): string {
  const emojis: Record<string, string> = {
    dog: '🐕',
    cat: '🐱',
    fish: '🐟',
    bird: '🐦',
    rabbit: '🐰',
    turtle: '🐢',
    hamster: '🐿️',
    guinea_pig: '🦔',
    other: '🐾',
  };
  return emojis[petType] || '🐾';
}