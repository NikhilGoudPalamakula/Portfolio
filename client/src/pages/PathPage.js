import { PROFILE } from '@/content';
import useDocumentMeta from '@/hooks/useDocumentMeta';
import PageSection from '@/components/PageSection';
import SectionHead from '@/components/SectionHead';
import CtaBanner from '@/components/CtaBanner';
import Timeline from '@/features/path/Timeline';

const PathPage = () => {
  useDocumentMeta({
    title: `Path — ${PROFILE.name}`,
    description:
      'From PLC and SCADA engineering in pharma and manufacturing to full-stack development on React, Node.js and NestJS.',
  });

  return (
    <>
      <PageSection>
        <SectionHead num="04" title="Path" />
        <Timeline />
      </PageSection>
      <CtaBanner />
    </>
  );
};

export default PathPage;
