import { useState, useEffect } from 'react';

/*
 * True once `ref` is scrolled past `ratio` of its scrollable distance.
 *
 * Deliberately false when there is little to scroll — on a page barely taller
 * than the viewport a threshold would trip immediately, which is the
 * main way this kind of affordance becomes annoying.
 *
 * `resetKey` (the pathname) re-runs the check after a route swap, since the
 * content height changes without the container itself resizing.
 */
const MIN_SCROLLABLE = 240;

const useScrolledPast = (ref, ratio = 0.7, resetKey = null) => {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    setPast(false);

    const check = () => {
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable < MIN_SCROLLABLE) {
        setPast(false);
        return;
      }
      setPast(el.scrollTop / scrollable >= ratio);
    };

    check();
    el.addEventListener('scroll', check, { passive: true });

    // Catches viewport resize and late-loading content (web fonts reflowing).
    const observer = new ResizeObserver(check);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);

    return () => {
      el.removeEventListener('scroll', check);
      observer.disconnect();
    };
  }, [ref, ratio, resetKey]);

  return past;
};

export default useScrolledPast;
