import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';

/**
 * 获取当前资源名
 */
export function useResourceName(): string {
  const { resourceName = '' } = useParams();

  return resourceName;
}

export function useRouteNav() {
  const navigate = useNavigate();
  const navResourceList = useCallback(
    (resourceName: string) => {
      navigate(`/${resourceName}/list`);
    },
    [navigate]
  );

  const navHomePage = useCallback(() => {
    navigate(`/dashboard`);
  }, [navigate]);

  return { navigate, navResourceList, navHomePage };
}
