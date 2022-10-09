import { useRequest } from 'ahooks';
import { request } from '../utils';

/**
 * 新增/编辑 记录
 */
export async function getResourceResource<T>(
  resourceName: string,
  limit: number = 20,
  offset: number = 0
): Promise<{
  list: T[];
  count: number;
}> {
  const { data } = await request.get(`/api/resource/${resourceName}/list`);

  return { list: data.list, count: data.count };
}

/**
 * 获取资源列表
 *
 * @deprecated
 */
export function useResourceList(model: string) {
  const { data, error, loading } = useRequest(async () => {
    const { data } = await request.get(`/api/resource/${model}/list`);

    return { list: data.list, count: data.count };
  });

  return { data, error, loading };
}
