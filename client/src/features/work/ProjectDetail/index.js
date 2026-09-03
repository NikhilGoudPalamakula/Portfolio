import { Link } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Lock } from 'lucide-react';
import Button from '@/components/Button';
import Bullets from '@/components/Bullets';
import BrandIcon from '@/components/BrandIcon';
import styles from './ProjectDetail.module.scss';

const BackLink = ({ className = '' }) => (
  <Link to="/work" className={`${styles.back} ${className}`}>
    <ChevronLeft size={16} /> Back to work
  </Link>
);

const ProjectDetail = ({ project, num }) => {
  const p = project;

  return (
    <article className={styles.detail}>
      <BackLink />

      <header className={styles.head}>
        <div className={styles.eyebrow}>
          <span className={styles.num}>{num}</span>
          {p.category}
          {p.org ? ` · ${p.org}` : ''}
          {p.year ? ` · ${p.year}` : ''}
        </div>
        <h2 className={styles.title}>{p.title}</h2>
        <p className={styles.blurb}>{p.blurb}</p>

        <div className={styles.actions}>
          {p.live ? (
            <Button variant="solid" href={p.live}>
              Visit site <ExternalLink size={15} />
            </Button>
          ) : (
            <span className={styles.confidential}>
              <Lock size={13} /> Confidential — no public link
            </span>
          )}
        </div>
      </header>

      <div className={styles.body}>
        {p.metrics && (
          <section className={styles.metrics}>
            <h4 className={styles.groupTitle}>Key numbers</h4>
            <div className={styles.metricGrid}>
              {p.metrics.map((m, mi) => (
                <div className={styles.metric} key={m.k} style={{ '--i': mi }}>
                  <span className={styles.metricValue}>{m.v}</span>
                  <span className={styles.metricLabel}>{m.k}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {p.groups?.map((g) => (
          <section className={styles.group} key={g.label}>
            <h4 className={styles.groupTitle}>{g.label}</h4>
            <Bullets items={g.items} />
          </section>
        ))}

        {p.build && (
          <section className={styles.group}>
            <h4 className={styles.groupTitle}>What I built</h4>
            {p.build.map((sub) => (
              <div className={styles.build} key={sub.label}>
                <h5 className={styles.buildSub}>{sub.label}</h5>
                <Bullets items={sub.items} />
              </div>
            ))}
          </section>
        )}

        {p.highlights && (
          <section className={styles.group}>
            <h4 className={styles.groupTitle}>Highlights</h4>
            <Bullets items={p.highlights} />
          </section>
        )}

        {p.detail && <p className={styles.prose}>{p.detail}</p>}

        <section className={styles.group}>
          <h4 className={styles.groupTitle}>Built with</h4>
          <div className={styles.tags}>
            {p.tags.map((t) => (
              <span className={styles.tag} key={t}>
                <BrandIcon name={t} /> {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      <BackLink className={styles.backBottom} />
    </article>
  );
};

export default ProjectDetail;
