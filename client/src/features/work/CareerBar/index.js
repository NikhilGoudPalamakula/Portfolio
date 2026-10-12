import styles from './CareerBar.module.scss';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "Nov 2020" → months since year 0; "Present" → now.
const toMonth = (s) => {
  if (/present/i.test(s)) {
    const d = new Date();
    return d.getFullYear() * 12 + d.getMonth() + 1;
  }
  const [mon, year] = s.trim().split(/\s+/);
  return Number(year) * 12 + MONTHS.indexOf(mon.slice(0, 3));
};

// An employer's span: earliest role start to latest role end.
const spanOf = (job) => {
  const ranges = job.roles.map((r) => r.year.split(/\s*[–-]\s*/).map(toMonth));
  return {
    start: Math.min(...ranges.map(([s]) => s)),
    end: Math.max(...ranges.map(([, e]) => e)),
  };
};

const years = (start, end) => {
  const out = [];
  for (let y = Math.ceil(start / 12); y * 12 <= end; y++) out.push(y);
  return out;
};

/*
 * Whole career on one proportional bar, oldest on the left. Hovering a block
 * highlights that employer's group below; clicking opens it and scrolls to it.
 */
const CareerBar = ({ jobs, active, onHover, onSelect }) => {
  const spans = jobs.map((job) => ({ job, ...spanOf(job) }));
  const min = Math.min(...spans.map((s) => s.start));
  const max = Math.max(...spans.map((s) => s.end));
  const pct = (m) => ((m - min) / (max - min)) * 100;

  return (
    <div className={styles.career}>
      <div className={styles.bar} onMouseLeave={() => onHover(null)}>
        {spans.map(({ job, start, end }) => (
          <button
            key={job.org}
            type="button"
            className={`${styles.segment} ${active === job.org ? styles.active : ''}`}
            style={{ left: `${pct(start)}%`, width: `${pct(end) - pct(start)}%` }}
            onMouseEnter={() => onHover(job.org)}
            onFocus={() => onHover(job.org)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(job.org)}
            aria-label={`${job.org}, ${job.roles.map((r) => r.year).join(', ')} — show projects`}
          >
            <span className={styles.label}>{job.short ?? job.org}</span>
          </button>
        ))}
      </div>

      <div className={styles.ticks} aria-hidden="true">
        {years(min, max).map((y) => (
          <span key={y} style={{ left: `${pct(y * 12)}%` }}>
            {y}
          </span>
        ))}
        <span className={styles.now} style={{ left: '100%' }}>
          Now
        </span>
      </div>
    </div>
  );
};

export default CareerBar;
