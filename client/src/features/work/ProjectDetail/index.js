import { Link } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Lock } from 'lucide-react';
import Button from '@/components/Button';
import Bullets from '@/components/Bullets';
import BrandIcon from '@/components/BrandIcon';
import styles from './ProjectDetail.module.scss';

const BackLink = () => (
  <Link to="/work" className={styles.back}>
    <ChevronLeft size={16} /> Back to work
  </Link>
);

const SUMMARY_ROWS = [
  ['problem', 'The problem'],
  ['role', 'My role'],
  ['result', 'Result'],
];

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
        {p.summary && (
          <dl className={styles.summary}>
            {SUMMARY_ROWS.map(([key, label]) => (
              <div key={key} className={styles.summaryRow}>
                <dt>{label}</dt>
                <dd>{p.summary[key]}</dd>
              </div>
            ))}
          </dl>
        )}

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

        {p.built && (
          <section className={styles.group}>
            <h4 className={styles.groupTitle}>What I built</h4>
            <Bullets items={p.built} />
          </section>
        )}

        {p.more?.map((g) => (
          <section className={styles.group} key={g.label}>
            <h4 className={styles.groupTitle}>{g.label}</h4>
            <Bullets items={g.items} />
          </section>
        ))}

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
    </article>
  );
};

export default ProjectDetail;
