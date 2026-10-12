import { PROFILE } from '@/content';
import useLocalTime from '@/hooks/useLocalTime';
import styles from './StatusLine.module.scss';

/*
 * A small SCADA-panel style readout: availability lamp + local time.
 * The lamp's slow pulse is the only looping animation on the site.
 */
const StatusLine = () => {
  const time = useLocalTime(PROFILE.timeZone);

  return (
    <p className={styles.status}>
      {PROFILE.available && (
        <>
          <span className={styles.lamp} aria-hidden="true" />
          <span>Open to work</span>
          <span className={styles.sep} aria-hidden="true">·</span>
        </>
      )}
      <span>
        <time>{time}</time> {PROFILE.timeZoneLabel}
      </span>
    </p>
  );
};

export default StatusLine;
