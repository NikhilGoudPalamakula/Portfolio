import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import { PROJECTS, CAREER } from '@/content';
import CareerBar from '@/features/work/CareerBar';
import styles from './ProjectList.module.scss';

// Projects grouped under the employer they were built at, in CAREER order.
// Numbering stays global (01–06) so it matches the detail pages. A project
// whose org isn't in CAREER still renders, in a trailing "Other" group.
const groupByEmployer = () => {
  const numbered = PROJECTS.map((p, i) => ({ ...p, i }));
  const groups = CAREER.map((job) => ({
    job,
    projects: numbered.filter((p) => p.org === job.org),
  }));
  const known = new Set(CAREER.map((job) => job.org));
  const rest = numbered.filter((p) => !known.has(p.org));
  if (rest.length) groups.push({ job: { org: 'Other', roles: [] }, projects: rest });
  return groups.filter((g) => g.projects.length);
};

const GROUPS = groupByEmployer();

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// One line per project; the blurb slides in on hover (always shown on touch).
const ProjectRow = ({ p, r }) => (
  <li style={{ '--r': r }}>
    <Link to={`/work/${p.slug}`} className={styles.row} style={{ '--tint': p.tint }}>
      <span className={styles.index}>{String(p.i + 1).padStart(2, '0')}</span>
      <span className={styles.main}>
        <span className={styles.title}>{p.title}</span>
        <span className={styles.meta}>
          {[p.category, p.year].filter(Boolean).join(' · ')}
        </span>
        <span className={styles.blurbWrap}>
          <span className={styles.blurb}>{p.blurb}</span>
        </span>
      </span>
      <span className={styles.category}>{p.category}</span>
      <span className={styles.year}>{p.year}</span>
      <ArrowUpRight size={16} className={styles.arrow} />
    </Link>
  </li>
);

const groupId = (org) => `employer-${slugify(org)}`;

const Employer = ({ job, projects, open, highlight, onToggle, onHover, i }) => {
  const panelId = `work-${slugify(job.org)}`;

  return (
    <section
      id={groupId(job.org)}
      className={`${styles.group} ${open ? styles.open : ''} ${highlight ? styles.highlight : ''}`}
      style={{ '--i': i }}
      onMouseEnter={() => onHover(job.org)}
      onMouseLeave={() => onHover(null)}
    >
      <h3 className={styles.heading}>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className={styles.employerName}>
            <span className={styles.org}>{job.org}</span>
            <span className={styles.count}>
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </span>
          </span>
          <span className={styles.roles}>
            {job.roles.map((r) => (
              <span key={r.role} className={styles.roleLine}>
                <span className={styles.role}>{r.role}</span>
                <span className={styles.roleYear}>{r.year}</span>
              </span>
            ))}
          </span>
          <Plus size={18} className={styles.icon} aria-hidden="true" />
        </button>
      </h3>

      {/* grid-rows 0fr → 1fr gives a height transition without measuring. */}
      <div id={panelId} className={styles.panel} inert={!open}>
        <div className={styles.panelInner}>
          {job.note && <p className={styles.note}>{job.note}</p>}
          <ul className={styles.rows}>
            {projects.map((p, r) => (
              <ProjectRow key={p.slug} p={p} r={r} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const ProjectList = () => {
  // Most recent employer open by default, so real work shows on arrival.
  const [open, setOpen] = useState(() => new Set([GROUPS[0]?.job.org]));

  // Employer under the pointer — shared by the career bar and the groups,
  // so hovering either lights up the other.
  const [hovered, setHovered] = useState(null);

  const toggle = (org) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(org)) next.delete(org);
      else next.add(org);
      return next;
    });

  // From the career bar: open the employer (never close it) and bring it into view.
  const select = (org) => {
    setOpen((prev) => new Set(prev).add(org));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document
      .getElementById(groupId(org))
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      <CareerBar
        jobs={GROUPS.map((g) => g.job).filter((job) => job.roles.length)}
        active={hovered}
        onHover={setHovered}
        onSelect={select}
      />
      <div className={styles.list}>
        {GROUPS.map(({ job, projects }, i) => (
          <Employer
            key={job.org}
            job={job}
            projects={projects}
            open={open.has(job.org)}
            highlight={hovered === job.org}
            onToggle={() => toggle(job.org)}
            onHover={setHovered}
            i={i}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectList;
