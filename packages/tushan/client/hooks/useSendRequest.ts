import { Message } from '@arco-design/web-react';
import { useEvent } from './useEvent';

export function useSendRequest<T extends unknown[]>(
  fn: (...args: T) => Promise<void>
) {
  return useEvent(async (...args: T) => {
    try {
      await fn(...args);
    } catch (err) {
      Message.error(String(err));
    }
  });
}
