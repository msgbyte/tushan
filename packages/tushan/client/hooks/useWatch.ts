import { useLayoutEffect } from 'react';
import { useUpdateRef } from './useUpdateRef';

/**
 * Listen for changes and apply callbacks
 */
export function useWatch(target: any[], callback: () => void) {
  const callbackRef = useUpdateRef(callback);
  useLayoutEffect(() => {
    callbackRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...target]);
}
