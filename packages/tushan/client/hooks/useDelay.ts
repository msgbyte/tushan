import { useEffect } from 'react';
import { useSafeSetState } from './useSafeState';

/**
 * A hook that returns true once a delay has expired.
 * @param ms The delay in milliseconds
 * @param key A key that can be used to reset the timer
 * @returns true if the delay has expired, false otherwise
 */
export function useDelay(ms = 0, key = '') {
  const [ready, setReady] = useSafeSetState(false);

  useEffect(() => {
    setReady(false);
    const timer = setTimeout(() => {
      setReady(true);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [key, ms, setReady]);

  return ready;
}
