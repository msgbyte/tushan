import { useRequest } from 'ahooks';
import { request } from '../utils';

type ResourceMetaType = 'string' | 'number';

interface ResourceMeta {
  isNullable: boolean;
  isPrimary: boolean;
  name: string;
  type: ResourceMetaType;
}

/**
 * 获取资源元信息
 */
export function useResourcePropertiesMeta(resourceName: string) {
  const {
    data = [],
    error,
    loading,
  } = useRequest(
    async () => {
      const { data } = await request.get(`/meta/${resourceName}/properties`);

      return data.list as ResourceMeta[];
    },
    {
      staleTime: 1000 * 60 * 1, // 1 min
    }
  );

  return { data, error, loading };
}
