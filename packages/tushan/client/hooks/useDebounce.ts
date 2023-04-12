import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { useMemo } from 'react';
import { useUpdateRef } from './useUpdateRef';

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return debounced;
}

type Noop = (...args: any[]) => any;

export function useDebounceFn<T extends Noop>(
  fn: T,
  options?: DebounceOptions
) {
  const fnRef = useUpdateRef(fn);

  const wait = options?.wait ?? 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options
      ),
    []
  );

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, []);

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}
