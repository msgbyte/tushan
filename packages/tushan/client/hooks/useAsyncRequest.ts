import { Message } from '@arco-design/web-react';
import type { DependencyList } from 'react';
import type { FunctionReturningPromise } from '../types';
import { useAsyncFn } from './useAsyncFn';

export function useAsyncRequest<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = []
) {
  const [{ loading, value, error }, call] = useAsyncFn(
    async (...args: any[]) => {
      try {
        return await fn(...args);
      } catch (err) {
        Message.error(String(err));
        console.error('[useAsyncRequest] error:', err);
        throw err;
      }
    },
    deps
  );

  return [{ loading, value, error }, call as T] as const;
}
