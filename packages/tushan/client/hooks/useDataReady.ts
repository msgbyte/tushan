import { useEffect, useState } from 'react';

/**
 * Listen for changes and apply callbacks
 */
export function useDataReady(validator: () => boolean, callback: () => void) {
  const [pass, setPass] = useState(false);

  useEffect(() => {
    if (!pass && validator()) {
      setPass(true);
      callback();
    }
  });
}
