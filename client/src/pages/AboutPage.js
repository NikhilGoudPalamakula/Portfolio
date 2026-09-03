import { PROFILE } from '@/content';
import useDocumentMeta from '@/hooks/useDocumentMeta';
import PageSection from '@/components/PageSection';
import SectionHead from '@/components/SectionHead';
import CtaBanner from '@/components/CtaBanner';
import AboutBody from '@/features/about/AboutBody';

const AboutPage = () => {
  useDocumentMeta({
    title: `About — ${PROFILE.name}`,
    description:
      'Full-stack developer with three years in production web applications, after nearly three as an automation and SCADA engineer across pharma and manufacturing.',
  });

  return (
    <>
      <PageSection>
        <SectionHead num="02" title="About" />
        <AboutBody />
      </PageSection>
      <CtaBanner />
    </>
  );
};

export default AboutPage;
