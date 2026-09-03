import { PROFILE } from '@/content';
import useDocumentMeta from '@/hooks/useDocumentMeta';
import PageSection from '@/components/PageSection';
import SectionHead from '@/components/SectionHead';
import ContactActions from '@/features/contact/ContactActions';

const ContactPage = () => {
  useDocumentMeta({
    title: `Get in touch — ${PROFILE.name}`,
    description: `Reach ${PROFILE.name} — ${PROFILE.role} based in ${PROFILE.location}. Open to new opportunities.`,
  });

  return (
    <PageSection>
      <SectionHead num="05" title="Get in touch" />
      <ContactActions />
    </PageSection>
  );
};

export default ContactPage;
