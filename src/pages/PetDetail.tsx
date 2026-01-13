import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Clock, Home, Utensils, Scissors, Zap, AlertTriangle } from 'lucide-react';
import { petDatabase, PetType } from '@/lib/petData';

export default function PetDetailPage() {
  const { petType } = useParams<{ petType: string }>();
  const pet = petDatabase[petType as PetType];

  if (!pet) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <p>Pet not found.</p>
          <Link to="/learn" className="text-primary hover:underline">Back to all pets</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/learn" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to all pets
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-6xl">{pet.emoji}</span>
          <div>
            <h1 className="font-display text-4xl font-bold">{pet.name}</h1>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{pet.careLevel} Care</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{pet.lifespan}</Badge>
            </div>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">{pet.description}</p>

        {/* Quick Facts */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💡</span>
              <span className="font-display font-bold text-primary">Fun Fact!</span>
            </div>
            <p className="text-lg">{pet.funFact}</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Home className="h-5 w-5" />Space Needed</CardTitle></CardHeader>
            <CardContent><p>{pet.spaceNeeded}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Daily Care</CardTitle></CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {pet.dailyCare.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Guides */}
        <Accordion type="multiple" className="space-y-4">
          <AccordionItem value="feeding" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-display"><Utensils className="h-5 w-5 mr-2" />Feeding Guide</AccordionTrigger>
            <AccordionContent>
              <p className="font-medium mb-2">{pet.feedingGuide.frequency}</p>
              <ul className="list-disc list-inside space-y-1">
                {pet.feedingGuide.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="grooming" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-display"><Scissors className="h-5 w-5 mr-2" />Grooming</AccordionTrigger>
            <AccordionContent>
              <p className="font-medium mb-2">{pet.grooming.frequency}</p>
              <ul className="list-disc list-inside space-y-1">
                {pet.grooming.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="exercise" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-display"><Zap className="h-5 w-5 mr-2" />Exercise & Play</AccordionTrigger>
            <AccordionContent>
              <p className="font-medium mb-2">{pet.exercise.amount}</p>
              <ul className="list-disc list-inside space-y-1">
                {pet.exercise.activities.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="issues" className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-display"><AlertTriangle className="h-5 w-5 mr-2" />Common Issues & Solutions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {pet.commonIssues.map((issue, i) => (
                  <div key={i}>
                    <p className="font-medium">{issue.title}</p>
                    <p className="text-muted-foreground">{issue.solution}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Layout>
  );
}
