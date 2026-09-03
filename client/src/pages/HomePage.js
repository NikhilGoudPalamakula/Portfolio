import { PROFILE, SEO_DESCRIPTION } from '@/content';
import useDocumentMeta from '@/hooks/useDocumentMeta';
import PageSection from '@/components/PageSection';
import FactList from '@/components/FactList';
import CtaBanner from '@/components/CtaBanner';
import Hero from '@/features/home/Hero';
import StatGrid from '@/features/home/StatGrid';

const HomePage = () => {
  useDocumentMeta({
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: SEO_DESCRIPTION,
  });

  return (
    <>
      <PageSection hero>
        <Hero />
        <StatGrid />
        <FactList />
      </PageSection>
      <CtaBanner />
    </>
  );
};

export default HomePage;
