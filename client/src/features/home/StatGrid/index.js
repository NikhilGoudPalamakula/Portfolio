import { STATS } from '@/content';
import Counter from '@/components/Counter';
import styles from './StatGrid.module.scss';

const StatGrid = () => (
  <div className={styles.stats}>
    {STATS.map((s, i) => (
      <div className={styles.stat} key={s.k} style={{ '--i': i }}>
        <span className={styles.value}>
          <Counter to={s.n} suffix={s.suffix} />
        </span>
        <span className={styles.label}>{s.k}</span>
      </div>
    ))}
  </div>
);

export default StatGrid;
