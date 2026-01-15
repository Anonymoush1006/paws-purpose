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
      "flex items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-200 shadow-soft",
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
      "flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200 shadow-soft",
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
      "flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 to-cyan-200 shadow-soft",
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
      "flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-soft",
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
      "flex items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-pink-200 shadow-soft",
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
      "flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 shadow-soft",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Turtle">🐢</span>
    </div>
  );
}

// CRITICAL: Hamster with wheel icon for differentiation
export function HamsterIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 shadow-soft relative",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Hamster" className="relative">
        🐹
        <span className="absolute -bottom-1 -right-2 text-[0.5em] opacity-80">⚙️</span>
      </span>
    </div>
  );
}

// CRITICAL: Guinea Pig with carrot icon for differentiation
export function GuineaPigIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-200 shadow-soft relative",
      sizeClasses[size],
      className
    )}>
      <span role="img" aria-label="Guinea Pig" className="relative">
        🐹
        <span className="absolute -bottom-1 -right-2 text-[0.5em] opacity-80">🥕</span>
      </span>
    </div>
  );
}

export function OtherPetsIcon({ className, size = 'md' }: PetIconProps) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 shadow-soft",
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
export function getPetEmoji(petType: string): string {
  const emojis: Record<string, string> = {
    dog: '🐕',
    cat: '🐱',
    fish: '🐟',
    bird: '🐦',
    rabbit: '🐰',
    turtle: '🐢',
    hamster: '🐹⚙️',
    guinea_pig: '🐹🥕',
    other: '🐾',
  };
  return emojis[petType] || '🐾';
}
