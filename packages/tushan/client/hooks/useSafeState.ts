import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * safe set state, make sure not set value in unmount component
 */
export function useSafeSetState<T>(
  initialState?: T | (() => T)
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [state, setState] = useState(initialState);

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetState = useCallback(
    (args: React.SetStateAction<T | undefined>) => {
      if (mountedRef.current) {
        return setState(args);
      }
    },
    []
  );

  return [state, safeSetState];
}
