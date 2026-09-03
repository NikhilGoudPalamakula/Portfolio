import { PROFILE } from '@/content';
import useDocumentMeta from '@/hooks/useDocumentMeta';
import PageSection from '@/components/PageSection';
import SectionHead from '@/components/SectionHead';
import CtaBanner from '@/components/CtaBanner';
import SkillGrid from '@/features/skills/SkillGrid';

const SkillsPage = () => {
  useDocumentMeta({
    title: `Capabilities — ${PROFILE.name}`,
    description:
      'Frontend, backend, DevOps and tooling: React, TypeScript, Node.js, NestJS, Python, MongoDB, Docker and AWS.',
  });

  return (
    <>
      <PageSection>
        <SectionHead num="03" title="Capabilities" />
        <SkillGrid />
      </PageSection>
      <CtaBanner />
    </>
  );
};

export default SkillsPage;
