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
      'Selected work: a seafood ERP, a multi-tenant factory intelligence platform, an energy management system, a hospital ERP, and pharma automation projects.',
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
