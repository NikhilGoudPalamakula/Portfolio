import { useState, useCallback, useEffect, useRef } from 'react';

// Copies text and flips `copied` true for `resetAfter` ms.
const useCopyToClipboard = (resetAfter = 1800) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetAfter);
      } catch {
        setCopied(false);
      }
    },
    [resetAfter],
  );

  return { copied, copy };
};

export default useCopyToClipboard;
