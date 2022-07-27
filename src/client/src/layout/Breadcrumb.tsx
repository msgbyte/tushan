import { Breadcrumb } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useResourceName } from '../router/hooks';

export const TushanBreadcrumb: React.FC = React.memo(() => {
  const resourceName = useResourceName();

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <NavLink to="/home">
          <IconHome className="mr-2" />
          Home
        </NavLink>{' '}
      </Breadcrumb.Item>

      {resourceName && <Breadcrumb.Item>{resourceName}</Breadcrumb.Item>}
    </Breadcrumb>
  );
});
TushanBreadcrumb.displayName = 'TushanBreadcrumb';
