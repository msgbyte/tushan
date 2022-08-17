import { Breadcrumb } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useResourceName } from '../router/hooks';
import { useLayoutStore } from '../store/layout';
import { getTushanCustomInfo } from '../utils';
import { useLocation } from 'react-router';
import { useMemo } from 'react';

export const TushanBreadcrumb: React.FC = React.memo(() => {
  const resourceName = useResourceName();
  const { resources } = useLayoutStore();
  const location = useLocation();

  const title = useMemo(() => {
    // 数据库资源
    if (resourceName) {
      const resourceIndex = resources.findIndex(
        (resource) => resource.resourceName === resourceName
      );
      if (resourceIndex >= 0) {
        return resources[resourceIndex].resourceLabel;
      }
    }

    // 自定义页面
    const pages = getTushanCustomInfo().customPages;
    const pageIndex = pages.findIndex(
      (page) => page.path === location.pathname
    );
    if (pageIndex >= 0) {
      return pages[pageIndex].label ?? '';
    }
  }, [resources, resourceName, location.pathname]);

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <NavLink to="/home">
          <IconHome className="mr-2" />
          Home
        </NavLink>{' '}
      </Breadcrumb.Item>

      {title && <Breadcrumb.Item>{title}</Breadcrumb.Item>}
    </Breadcrumb>
  );
});
TushanBreadcrumb.displayName = 'TushanBreadcrumb';
