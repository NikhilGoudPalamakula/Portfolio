import { PROFILE } from '@/content';
import useDocumentMeta from '@/hooks/useDocumentMeta';
import PageSection from '@/components/PageSection';
import SectionHead from '@/components/SectionHead';
import CtaBanner from '@/components/CtaBanner';
import ProjectList from '@/features/work/ProjectList';

const WorkPage = () => {
  useDocumentMeta({
    title: `Selected Work — ${PROFILE.name}`,
    description:
      'Selected work by employer — from PLC and SCADA engineering in pharma and manufacturing to full-stack development: a seafood ERP, a multi-tenant factory intelligence platform, an energy management system and a hospital ERP.',
  });

  return (
    <>
      <PageSection>
        <SectionHead num="01" title="Selected Work" />
        <ProjectList />
      </PageSection>
      <CtaBanner />
    </>
  );
};

export default WorkPage;
