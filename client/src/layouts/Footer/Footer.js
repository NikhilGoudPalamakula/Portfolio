import { PROFILE } from '@/content';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <span>
      © {new Date().getFullYear()} {PROFILE.name}
    </span>
    <span>{PROFILE.location}</span>
  </footer>
);

export default Footer;
