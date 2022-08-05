import axios from 'axios';
import { Message } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { FastifyFormInstance } from 'react-fastify-form';
import { useCallback } from 'react';

export const request = axios.create({
  baseURL: '/admin',
});

/**
 * 发送修改请求
 */
export function useAsyncRequest<T>(fn: () => Promise<T>) {
  const { data, error, loading, runAsync } = useRequest(
    async () => {
      try {
        const ret = await fn();
        Message.success('操作成功');
        return ret;
      } catch (err) {
        console.error(err);
        Message.error('操作失败');
      }
    },
    {
      manual: true,
    }
  );

  return [{ data, error, loading }, runAsync] as const;
}

/**
 * useAsyncFormRequest 的表单版本
 */
export function useAsyncFormRequest<T>(
  form: FastifyFormInstance | undefined,
  fn: () => Promise<T>
) {
  const [{ data, error, loading }, _runAsync] = useAsyncRequest(fn);

  const runAsync = useCallback(async () => {
    if (!form) {
      return;
    }

    const errors = await form.validateForm();
    if (Object.keys(errors).length !== 0) {
      return;
    }

    return await _runAsync();
  }, [_runAsync, form]);

  return [{ data, error, loading }, runAsync] as const;
}
