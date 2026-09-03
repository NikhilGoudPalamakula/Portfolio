import { ArrowUpRight } from 'lucide-react';
import useDocumentMeta from '@/hooks/useDocumentMeta';
import PageSection from '@/components/PageSection';
import Button from '@/components/Button';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  useDocumentMeta({ title: 'Page not found' });

  return (
    <PageSection>
      <div className={styles.wrapper}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>That page doesn&apos;t exist.</h1>
        <Button variant="solid" to="/">
          Back home <ArrowUpRight size={15} />
        </Button>
      </div>
    </PageSection>
  );
};

export default NotFoundPage;
