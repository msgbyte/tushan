import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTushanContext } from '../../context/tushan';

export function usePermissions<Permissions = any, Error = any>(
  params = {},
  queryParams: UseQueryOptions<Permissions, Error, Permissions, any> = {
    staleTime: 5 * 60 * 1000,
  }
) {
  const { authProvider } = useTushanContext();

  const result = useQuery(
    ['auth', 'getPermissions', params],
    () => authProvider?.getPermissions(params) ?? Promise.resolve(null),
    queryParams
  );

  return useMemo(
    () => ({
      permissions: result.data,
      isLoading: result.isLoading,
      error: result.error,
      refetch: result.refetch,
    }),
    [result]
  );
}
