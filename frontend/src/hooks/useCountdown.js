import { useState, useEffect } from "react";

export function useCountdown(endsAt, offset = 0) {
  const serverTime = () => Date.now() + offset;
  const [timeMs, setTimeMs] = useState(endsAt - serverTime());
  const [intervalState, setIntervalState] = useState(null);
  
  //* Aggiorna il countdown ogni secondo
  useEffect(() => {
    if (!endsAt) {
      setTimeMs(0);
      return;
    }
    setIntervalState(setInterval(() => {
      const remaining = Math.max(0, endsAt - serverTime());
      setTimeMs(remaining);
    }, 1000));
  }, [endsAt, offset]);

  //* Pulisce l'intervallo quando il countdown finisce
  useEffect(() => {
    if (timeMs <= 0 && intervalState) {
      clearInterval(intervalState);
      setIntervalState(null);
    }
  }, [timeMs, intervalState]);

  return { ms: timeMs, sec: timeMs / 1000 };
}
