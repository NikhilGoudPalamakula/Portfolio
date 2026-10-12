import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { getNextSection } from '@/content';
import useAppStore from '@/store/appStore';
import useScrolledPast from '@/hooks/useScrolledPast';
import styles from './NextHint.module.scss';

/*
 * A small chip that fades in near the bottom of a page offering the next
 * section, so reaching the end of one page doesn't mean a trip back up to
 * the nav. Dismissable — and a dismissal sticks for the session.
 *
 * Renders nothing at the end of the ladder (Skills) or on any route outside
 * it (project detail pages have their own pager).
 */
const NextHint = ({ scrollRef }) => {
  const { pathname } = useLocation();
  const dismissed = useAppStore((s) => s.nextHintDismissed);
  const dismiss = useAppStore((s) => s.dismissNextHint);
  const visible = useScrolledPast(scrollRef, 0.7, pathname);

  const next = getNextSection(pathname);
  if (!next || dismissed) return null;

  return (
    <div
      className={`${styles.hint} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <Link to={next.to} className={styles.link} tabIndex={visible ? 0 : -1}>
        <span className={styles.kicker}>Up next</span>
        <span className={styles.label}>{next.label}</span>
        {next.num && <span className={styles.num}>{next.num}</span>}
        <ArrowUpRight size={15} className={styles.arrow} />
      </Link>

      <button
        type="button"
        className={styles.close}
        onClick={dismiss}
        aria-label="Dismiss"
        tabIndex={visible ? 0 : -1}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default NextHint;
