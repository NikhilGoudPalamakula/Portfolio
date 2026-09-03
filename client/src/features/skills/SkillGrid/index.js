import { SKILLS } from '@/content';
import BrandIcon from '@/components/BrandIcon';
import styles from './SkillGrid.module.scss';

const SkillGrid = () => (
  <div className={styles.skills}>
    {SKILLS.map((group, gi) => (
      <div key={group.group} className={styles.group} style={{ '--i': gi }}>
        <h4 className={styles.title}>{group.group}</h4>
        <ul>
          {group.items.map((s) => (
            <li key={s}>
              <BrandIcon name={s} /> {s}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default SkillGrid;
