import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ProjectPager.module.scss';

/*
 * Prev / next between case studies, replacing the bottom "Back to work" link.
 * Someone who just finished one project page is the likeliest person to want
 * another. No wrap-around, so an empty side keeps its grid column.
 */
const ProjectPager = ({ prev, next }) => (
  <nav className={styles.pager} aria-label="Project navigation">
    <div className={styles.sides}>
      {prev ? (
        <Link to={`/work/${prev.slug}`} className={`${styles.side} ${styles.prev}`}>
          <span className={styles.kicker}>
            <ChevronLeft size={13} /> Previous
          </span>
          <span className={styles.title}>{prev.title}</span>
        </Link>
      ) : (
        <span className={styles.side} />
      )}

      {next ? (
        <Link to={`/work/${next.slug}`} className={`${styles.side} ${styles.next}`}>
          <span className={styles.kicker}>
            Next <ChevronRight size={13} />
          </span>
          <span className={styles.title}>{next.title}</span>
        </Link>
      ) : (
        <span className={styles.side} />
      )}
    </div>

    <Link to="/work" className={styles.all}>
      All work
    </Link>
  </nav>
);

export default ProjectPager;
