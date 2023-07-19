import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTushanContext } from '../../context/tushan';
import { useDataReady } from '../../hooks/useDataReady';
import { useUserStore } from '../../store/user';
import { createSelector } from '../../utils/createSelector';

export function usePermissions<Permissions = any, Error = any>(
  params = {},
  queryParams: UseQueryOptions<Permissions, Error, Permissions, any> = {
    staleTime: 5 * 60 * 1000,
  }
) {
  const { authProvider } = useTushanContext();
  const { isLogin } = useUserStore(createSelector('isLogin'));

  const result = useQuery(
    ['auth', 'getPermissions', JSON.stringify(params)],
    async () => {
      if (authProvider) {
        try {
          const permission = await authProvider.getPermissions(params);
          return permission;
        } catch (err) {
          return null;
        }
      }

      return null;
    },
    queryParams
  );

  useDataReady(
    () => isLogin === true,
    () => {
      if (result.data === null) {
        // retry when loaded
        result.refetch();
      }
    }
  );

  return useMemo(
    () => ({
      permissions: result.data,
      isReady: isLogin && !result.isLoading,
      error: result.error,
      refetch: result.refetch,
    }),
    [result]
  );
}
