import { PATH } from '@/content';
import styles from './Timeline.module.scss';

const Timeline = () => (
  <ol className={styles.path}>
    {PATH.map((job, i) => (
      <li key={`${job.year}-${job.role}`} className={styles.item} style={{ '--i': i }}>
        <span className={styles.year}>{job.year}</span>
        <div className={styles.body}>
          <h4>
            {job.role} <span className={styles.org}>· {job.org}</span>
          </h4>
          <p>{job.note}</p>
        </div>
      </li>
    ))}
  </ol>
);

export default Timeline;
