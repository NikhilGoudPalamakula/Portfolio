import { useState } from 'react';
import styles from './SignalTrace.module.scss';

/*
 * A one-shot "signal" drawn under the hero name: a stepped PLC-style square
 * wave (the automation years) that smooths into a continuous wave (software)
 * and settles on a live node. Draws once after the name lands, then stays put.
 *
 * Each half is also a readout: hover / focus / tap it and that stretch of the
 * line lights up with a short caption of what those years were.
 *
 * The viewBox stretches to the column width; `non-scaling-stroke` keeps the
 * line weight constant however wide it gets.
 */
const DIGITAL =
  'M0 28 H170 V10 H200 V28 H230 V10 H246 V28 H290 V10 H336 V28 H380 V10 H396 V28 H500';
const ANALOG =
  'M500 28 C520 28 528 8 548 8 S576 28 596 28 S624 8 644 8 S672 28 692 28 ' +
  'C712 28 718 16 736 16 S760 28 780 28 H1000';
const TRACE = `${DIGITAL} ${ANALOG.replace(/^M500 28 /, '')}`;

const PHASES = [
  {
    key: 'automation',
    d: DIGITAL,
    when: '2020 – 2023',
    title: 'Automation engineer · SR Automation',
    body: 'PLC logic, SCADA and HMIs for pharma and manufacturing plants — plus client negotiations and quotation-to-closing.',
  },
  {
    key: 'software',
    d: ANALOG,
    when: '2023 – Now',
    title: 'Full-stack developer · Matrical → PatternLab.ai',
    body: 'React, NestJS and MongoDB — a hospital ERP, energy and factory-intelligence platforms, and a seafood ERP.',
  },
];

const SignalTrace = () => {
  const [active, setActive] = useState(null);
  const phase = PHASES.find((p) => p.key === active);

  return (
    <div className={`${styles.trace} ${active ? styles.engaged : ''}`}>
      <div className={styles.lineBox} onMouseLeave={() => setActive(null)}>
        <svg
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          className={styles.svg}
          aria-hidden="true"
        >
          <path d={TRACE} pathLength="1" className={styles.path} vectorEffect="non-scaling-stroke" />
          {PHASES.map((p) => (
            <path
              key={p.key}
              d={p.d}
              className={`${styles.glow} ${active === p.key ? styles.lit : ''}`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <span className={styles.node} aria-hidden="true" />

        {/* Hit areas: the left half is the digital stretch, the right the analog. */}
        {PHASES.map((p) => (
          <button
            key={p.key}
            type="button"
            className={`${styles.hit} ${styles[p.key]}`}
            aria-label={`${p.when}: ${p.title}`}
            aria-pressed={active === p.key}
            onMouseEnter={() => setActive(p.key)}
            onFocus={() => setActive(p.key)}
            onBlur={() => setActive(null)}
            onClick={() => setActive((cur) => (cur === p.key ? null : p.key))}
          />
        ))}
      </div>

      <div className={styles.labels} aria-hidden="true">
        <span className={active === 'automation' ? styles.labelLit : ''}>2020 · PLC / SCADA</span>
        <span className={active === 'software' ? styles.labelLit : ''}>Now · Full-stack</span>
      </div>

      {/* Caption for the lit stretch — floats over the content below. */}
      <div className={styles.readout} aria-live="polite">
        {phase && (
          <p
            key={phase.key}
            className={`${styles.card} ${phase.key === 'software' ? styles.cardRight : ''}`}
          >
            <span className={styles.when}>{phase.when}</span>
            <span className={styles.cardTitle}>{phase.title}</span>
            <span className={styles.cardBody}>{phase.body}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignalTrace;
