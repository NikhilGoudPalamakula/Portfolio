import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import styles from './CtaBanner.module.scss';

const CtaBanner = () => (
  <aside className={styles.cta}>
    <span className={styles.kicker}>( Looking for a developer? )</span>
    <Link to="/contact" className={styles.line}>
      Let&apos;s build <em>something</em> <ArrowUpRight size={30} />
    </Link>
  </aside>
);

export default CtaBanner;
