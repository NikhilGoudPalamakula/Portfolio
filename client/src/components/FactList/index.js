import { QUICK_FACTS } from '@/content';
import styles from './FactList.module.scss';

// `column` drops the max-width so it can sit in a narrow grid track.
const FactList = ({ facts = QUICK_FACTS, column = false }) => (
  <dl className={`${styles.facts} ${column ? styles.column : ''}`}>
    {facts.map((f) => (
      <div key={f.k} className={styles.fact}>
        <dt>{f.k}</dt>
        <dd>{f.v}</dd>
      </div>
    ))}
  </dl>
);

export default FactList;
