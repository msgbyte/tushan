import { useRequest } from 'ahooks';
import { request } from '../utils';

/**
 * 获取资源列表
 */
export function useResourceList(model: string) {
  const { data, error, loading } = useRequest(async () => {
    const { data } = await request.get(`/resource/${model}/list`);

    return { list: data.list, count: data.count };
  });

  return { data, error, loading };
}
