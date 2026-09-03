import { Navigate, useParams } from 'react-router-dom';
import { PROFILE, getProjectBySlug, getProjectIndex } from '@/content';
import useDocumentMeta from '@/hooks/useDocumentMeta';
import PageSection from '@/components/PageSection';
import ProjectDetail from '@/features/work/ProjectDetail';

const ProjectPage = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const index = getProjectIndex(slug);

  useDocumentMeta({
    title: project ? `${project.title} — ${PROFILE.name}` : `Not found — ${PROFILE.name}`,
    description: project?.blurb,
  });

  // Unknown slug — send them back to the list rather than a dead end.
  if (!project) return <Navigate to="/work" replace />;

  return (
    <PageSection>
      <ProjectDetail project={project} num={String(index + 1).padStart(2, '0')} />
    </PageSection>
  );
};

export default ProjectPage;
