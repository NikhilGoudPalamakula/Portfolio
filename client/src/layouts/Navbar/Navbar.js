import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon, FileDown } from 'lucide-react';
import { NAV, PROFILE, RESUME } from '@/content';
import useAppStore from '@/store/appStore';
import useTheme from '@/hooks/useTheme';
import MobileDrawer from './MobileDrawer';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isMenuOpen = useAppStore((s) => s.isMenuOpen);
  const toggleMenu = useAppStore((s) => s.toggleMenu);
  const closeMenu = useAppStore((s) => s.closeMenu);

  return (
    <>
      <header className={styles.nav}>
        <NavLink to="/" className={styles.name} onClick={closeMenu}>
          <span className={styles.nameFull}>{PROFILE.name}</span>
          <span className={styles.nameShort}>{PROFILE.short}</span>
        </NavLink>

        <div className={styles.right}>
          <nav className={styles.links}>
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {RESUME.href && (
            <a
              className={styles.cv}
              href={RESUME.href}
              download={RESUME.filename}
              title={RESUME.label}
              aria-label={RESUME.label}
            >
              <FileDown size={15} /> {RESUME.short}
            </a>
          )}

          <button
            type="button"
            className={styles.theme}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            className={styles.burger}
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {isMenuOpen && <MobileDrawer />}
    </>
  );
};

export default Navbar;
