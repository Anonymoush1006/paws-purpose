import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { PetTypeCards } from '@/components/home/PetTypeCards';
import { PetOfTheWeek } from '@/components/home/PetOfTheWeek';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PetTypeCards />
      <PetOfTheWeek />
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
