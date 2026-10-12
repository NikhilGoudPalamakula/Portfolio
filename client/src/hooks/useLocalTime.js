import { useState, useEffect } from 'react';

const format = (timeZone) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());

/*
 * Current HH:MM in `timeZone`, kept fresh. Ticks every 15s — minute
 * precision is all it shows, so it can lag the real minute by at most that.
 */
const useLocalTime = (timeZone) => {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    setTime(format(timeZone));
    const id = setInterval(() => setTime(format(timeZone)), 15000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
};

export default useLocalTime;
