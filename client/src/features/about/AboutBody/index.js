import { ABOUT } from '@/content';
import FactList from '@/components/FactList';
import styles from './AboutBody.module.scss';

const AboutBody = () => (
  <div className={styles.about}>
    <div className={styles.body}>
      {ABOUT.map((para, i) => (
        <p key={i} className={i === 0 ? styles.lead : ''}>
          {para}
        </p>
      ))}
    </div>
    <FactList column />
  </div>
);

export default AboutBody;
