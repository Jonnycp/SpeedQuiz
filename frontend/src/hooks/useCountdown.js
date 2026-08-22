import { useState, useEffect } from "react";

export function useCountdown(endsAt, offset = 0) {
  const serverTime = () => Date.now() + offset;
  const [timeMs, setTimeMs] = useState(endsAt - serverTime());
  // const [intervalState, setIntervalState] = useState(null);
  
  //* Aggiorna il countdown ogni secondo
  useEffect(() => {
    if (!endsAt) {
      setTimeMs(0);
      return;
    }
  
  const tick = () => {
    const remaining = Math.max(0, endsAt - serverTime());
      setTimeMs(remaining);
  }
  tick(); //Aggiorna subito il contdown senza aspettare il primo tick
  
  const timer = setInterval(tick, 1000);
  
  return () => clearInterval(timer); 
  }, [endsAt, offset]);

  return { ms: timeMs, sec: timeMs / 1000 };
}