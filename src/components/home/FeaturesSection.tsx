import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Heart, ClipboardList, Trophy, Users } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Pet Care Library',
    description: 'Easy-to-understand guides for dogs, cats, fish, birds, and more. Written for kids and parents!',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: GraduationCap,
    title: 'Training Tips',
    description: 'Step-by-step training guides and solutions for common behavior problems.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Heart,
    title: 'Health Tracking',
    description: 'Keep track of vet visits, vaccinations, and health records in one place.',
    color: 'text-destructive',
    bg: 'bg-destructive/10',
  },
  {
    icon: ClipboardList,
    title: 'Chore Manager',
    description: 'Assign feeding, walking, and cleaning tasks to family members.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: Trophy,
    title: 'Rewards & Badges',
    description: 'Kids earn stars and badges for completing pet care tasks!',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    icon: Users,
    title: 'Family Accounts',
    description: 'Parents and children can all track and manage pet care together.',
    color: 'text-primary',
    bg: 'bg-secondary',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Everything Your Family Needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From learning to tracking, we've got all the tools to make pet care fun and easy!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-none shadow-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-2`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="font-display">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
