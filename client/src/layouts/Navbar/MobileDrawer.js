import { NavLink } from 'react-router-dom';
import { NAV } from '@/content';
import useAppStore from '@/store/appStore';
import styles from './MobileDrawer.module.scss';

const MobileDrawer = () => {
  const closeMenu = useAppStore((s) => s.closeMenu);

  return (
    <div className={styles.drawer}>
      {NAV.map((n) => (
        <NavLink
          key={n.to}
          to={n.to}
          end={n.to === '/'}
          onClick={closeMenu}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        >
          <span>{n.label}</span>
          <span className={styles.num}>{n.num || '—'}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default MobileDrawer;
