import { useCallback, useState } from 'react';
import { useEvent } from './useEvent';
import { useUpdateRef } from './useUpdateRef';

/**
 * Similar to ClassComponent's setState, used to manage object state
 */
export function useObjectState<T extends {}>(defaultValue: T | (() => T)) {
  const [state, _setState] = useState<T>(defaultValue);

  const setState = useCallback((value: Partial<T>) => {
    _setState((prev) => ({
      ...prev,
      ...value,
    }));
  }, []);

  return [state, setState] as const;
}

/**
 * Controlled component version of useObjectState
 */
export function useControlledObjectState<T>(
  value: T,
  onChange: (val: T) => void
) {
  const _valueRef = useUpdateRef(value); // Avoid multiple modifications in the same event loop and add a transit

  const setValues = useEvent((val: Partial<T>) => {
    const newValue = {
      ..._valueRef.current,
      ...val,
    };
    onChange(newValue);
    _valueRef.current = newValue;
  });

  return [value, setValues] as const;
}
