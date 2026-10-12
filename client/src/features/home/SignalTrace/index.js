import styles from './SignalTrace.module.scss';

/*
 * A one-shot "signal" drawn under the hero name: a stepped PLC-style square
 * wave (the automation years) that smooths into a continuous wave (software)
 * and settles on a live node. Draws once after the name lands, then stays put.
 *
 * The viewBox stretches to the column width; `non-scaling-stroke` keeps the
 * line weight constant however wide it gets.
 */
const TRACE =
  'M0 28 H170 V10 H200 V28 H230 V10 H246 V28 H290 V10 H336 V28 H380 V10 H396 V28 H500 ' +
  'C520 28 528 8 548 8 S576 28 596 28 S624 8 644 8 S672 28 692 28 ' +
  'C712 28 718 16 736 16 S760 28 780 28 H1000';

const SignalTrace = () => (
  <div className={styles.trace} aria-hidden="true">
    <div className={styles.lineBox}>
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className={styles.svg}>
        <path d={TRACE} pathLength="1" className={styles.path} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className={styles.node} />
    </div>
    <div className={styles.labels}>
      <span>2020 · PLC / SCADA</span>
      <span>Now · Full-stack</span>
    </div>
  </div>
);

export default SignalTrace;
