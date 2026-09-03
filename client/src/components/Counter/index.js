import { useState, useEffect } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Counts 0 → `to` on mount with an ease-out cubic.
const Counter = ({ to, suffix = '', dur = 1400 }) => {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setN(to);
      return undefined;
    }

    let raf;
    const t0 = performance.now();

    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, dur]);

  return (
    <span>
      {n}
      {suffix}
    </span>
  );
};

export default Counter;
