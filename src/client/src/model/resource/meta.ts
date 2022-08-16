import { useRequest } from 'ahooks';
import {
  ResourcePropertyMetaType,
  ResourcePropertyMetaViewType,
} from '../../../../shared/types';
import { DEFAULT_PRIMARY_NAME } from '../../../../shared/const';
import { request } from '../utils';

interface ResourceMeta {
  resourceLabel: string;
  resourceName: string;
}

export interface ResourcePropertyMeta {
  isNullable: boolean;
  isPrimary: boolean;
  name: string;
  type: ResourcePropertyMetaType;
  viewType: ResourcePropertyMetaViewType;
}

/**
 * 获取资源列元信息
 */
export function useResourcePropertiesMeta(resourceName: string) {
  const {
    data = { properties: [], primaryName: DEFAULT_PRIMARY_NAME },
    error,
    loading,
  } = useRequest(
    async () => {
      const { data } = await request.get(`/meta/${resourceName}/properties`);

      const properties = data.list as ResourcePropertyMeta[];
      const primaryName =
        properties.filter((item) => item.isPrimary)?.[0].name ??
        DEFAULT_PRIMARY_NAME;

      return {
        properties,
        primaryName,
      };
    },
    {
      staleTime: 1000 * 60 * 1, // 1 min
    }
  );

  return { resourceMeta: data, error, loading };
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
