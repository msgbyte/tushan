import type { MutableRefObject } from 'react';
import { useRef } from 'react';

/**
 * Make sure state update into ref
 *
 * Useful get latest status without react lifecycle
 */
export function useUpdateRef<T>(state: T): MutableRefObject<T> {
  const ref = useRef<T>(state);
  ref.current = state;

  return ref;
}
