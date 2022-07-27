import { useRequest } from 'ahooks';
import { request } from '../utils';

type ResourcePropertyMetaType = 'string' | 'number';

interface ResourceMeta {
  resourceName: string;
}

interface ResourcePropertyMeta {
  isNullable: boolean;
  isPrimary: boolean;
  name: string;
  type: ResourcePropertyMetaType;
}

/**
 * 获取资源列元信息
 */
export function useResourcePropertiesMeta(resourceName: string) {
  const {
    data = [],
    error,
    loading,
  } = useRequest(
    async () => {
      const { data } = await request.get(`/meta/${resourceName}/properties`);

      return data.list as ResourcePropertyMeta[];
    },
    {
      staleTime: 1000 * 60 * 1, // 1 min
    }
  );

  return { data, error, loading };
}

/**
 * 获取资源基本元信息
 */
export function useAllResources() {
  const {
    data = [],
    error,
    loading,
  } = useRequest(
    async () => {
      const { data } = await request.get(`/meta/all`);

      return data.list as ResourceMeta[];
    },
    {
      staleTime: 1000 * 60 * 1, // 1 min
    }
  );

  return {
    metas: data,
    error,
    loading,
  };
}
