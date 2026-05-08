import { useState, useEffect, useRef } from 'react';

export type IdlePhase = 'active' | 'idle' | 'waking';

export const useIdlePhase = (idleDelay: number, wakingDuration: number): IdlePhase => {
  const [phase, setPhase] = useState<IdlePhase>('active');
  const phaseRef = useRef<IdlePhase>('active');

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let wakingTimer: ReturnType<typeof setTimeout> | undefined;

    const update = (next: IdlePhase) => {
      phaseRef.current = next;
      setPhase(next);
    };

    const startIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => update('idle'), idleDelay);
    };

    const handleActivity = () => {
      if (phaseRef.current === 'idle') {
        clearTimeout(idleTimer);
        update('waking');
        wakingTimer = setTimeout(() => {
          update('active');
          startIdleTimer();
        }, wakingDuration);
      } else if (phaseRef.current === 'active') {
        startIdleTimer();
      }
      // waking: ignore further activity until waking timer fires
    };

    const events: string[] = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, handleActivity));
    startIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      clearTimeout(wakingTimer);
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [idleDelay, wakingDuration]);

  return phase;
};

export const useIdle = (timeout: number = 5000): boolean => {
  const [isIdle, setIsIdle] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), timeout);
    };

    const events: string[] = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

    events.forEach(event => window.addEventListener(event, handleActivity));
    
    handleActivity();

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [timeout]);

  return isIdle;
};