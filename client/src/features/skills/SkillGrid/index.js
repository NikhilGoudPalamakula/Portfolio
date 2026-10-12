import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SKILLS, SKILL_TERMS, getProjectsForSkill } from '@/content';
import BrandIcon from '@/components/BrandIcon';
import styles from './SkillGrid.module.scss';

// Resolved once: which projects each skill appears in.
const USED_IN = Object.fromEntries(
  SKILLS.flatMap((g) => g.items).map((s) => [s, getProjectsForSkill(s, SKILL_TERMS[s])]),
);

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// A skill with projects behind it is a disclosure button; the rest stay text.
const Skill = ({ name, open, onToggle }) => {
  const projects = USED_IN[name];
  const label = (
    <>
      <BrandIcon name={name} /> {name}
    </>
  );

  if (!projects.length) return <li className={styles.plain}>{label}</li>;

  const panelId = `used-${slugify(name)}`;

  return (
    <li className={`${styles.item} ${open ? styles.open : ''}`}>
      <button
        type="button"
        className={styles.skill}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {label}
        <span className={styles.count} aria-label={`used in ${projects.length}`}>
          {projects.length}
        </span>
      </button>

      <div id={panelId} className={styles.panel} inert={!open}>
        <div className={styles.panelInner}>
          <span className={styles.usedIn}>Used in</span>
          {projects.map((p) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className={styles.project}>
              {p.title} <ArrowUpRight size={13} />
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
};

const SkillGrid = () => {
  const [open, setOpen] = useState(null);

  return (
    <>
      <p className={styles.hint}>Tap a skill to see where I used it.</p>
      <div className={styles.skills}>
        {SKILLS.map((group, gi) => (
          <div key={group.group} className={styles.group} style={{ '--i': gi }}>
            <h4 className={styles.title}>{group.group}</h4>
            <ul>
              {group.items.map((s) => (
                <Skill
                  key={s}
                  name={s}
                  open={open === s}
                  onToggle={() => setOpen((cur) => (cur === s ? null : s))}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillGrid;
