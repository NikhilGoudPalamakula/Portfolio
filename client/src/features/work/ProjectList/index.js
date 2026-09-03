import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/content';
import BrandIcon from '@/components/BrandIcon';
import styles from './ProjectList.module.scss';

const ProjectList = () => (
  <div className={styles.list}>
    {PROJECTS.map((p, i) => (
      <Link
        key={p.slug}
        to={`/work/${p.slug}`}
        className={styles.project}
        style={{ '--tint': p.tint, '--i': i }}
      >
        <div className={styles.left}>
          <span className={styles.tops}>
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            {p.year && <span className={styles.year}>{p.year}</span>}
          </span>
          <h3 className={styles.title}>{p.title}</h3>
          <div className={styles.meta}>
            {p.category}
            {p.org ? ` · ${p.org}` : ''}
          </div>
        </div>

        <div className={styles.right}>
          <p className={styles.blurb}>{p.blurb}</p>
          <div className={styles.tags}>
            {p.tags.slice(0, 5).map((t) => (
              <span key={t}>
                <BrandIcon name={t} /> {t}
              </span>
            ))}
          </div>
          <span className={styles.more}>
            Read more <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>
    ))}
  </div>
);

export default ProjectList;
