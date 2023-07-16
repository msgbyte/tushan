import { useCallback, useState } from 'react';

export function useForceUpdate() {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
}
