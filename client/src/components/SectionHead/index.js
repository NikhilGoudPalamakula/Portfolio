import styles from './SectionHead.module.scss';

const SectionHead = ({ num, title }) => (
  <div className={styles.head}>
    <h2 className={styles.title}>{title}</h2>
    {num && (
      <span className={styles.ghost} aria-hidden="true">
        {num}
      </span>
    )}
  </div>
);

export default SectionHead;
