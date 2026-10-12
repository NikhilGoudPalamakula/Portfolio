import { ABOUT, PROFILE } from '@/content';
import FactList from '@/components/FactList';
import portrait from '@/assets/portrait.jpg';
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
    <figure className={styles.portrait}>
      <img src={portrait} alt={PROFILE.name} width="960" height="1200" />
      <figcaption>{PROFILE.location}</figcaption>
    </figure>
    <div className={styles.facts}>
      <FactList column />
    </div>
  </div>
);

export default AboutBody;
