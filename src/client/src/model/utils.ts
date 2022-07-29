import axios from 'axios';
import { Message } from '@arco-design/web-react';
import { useRequest } from 'ahooks';

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
        await fn();
        Message.success('操作成功');
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
