import styles from './PageSection.module.scss';

// Page-level <section>: owns the vertical rhythm and stretches so the
// footer stays pinned to the bottom on short pages.
const PageSection = ({ hero = false, children }) => (
  <section className={hero ? styles.hero : styles.section}>{children}</section>
);

export default PageSection;
