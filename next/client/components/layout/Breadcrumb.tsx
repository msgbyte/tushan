import { Breadcrumb } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useMemo } from 'react';
import { useMenuStore } from '../../store/menu';

export const TushanBreadcrumb: React.FC = React.memo(() => {
  const menus = useMenuStore((state) => state.menus);
  const location = useLocation();

  const title = useMemo(() => {
    const menu = menus.find((menu) =>
      location.pathname.startsWith(`/${menu.key}`)
    );

    return menu?.label ?? menu?.key ?? '';
  }, [menus, location.pathname]);

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <NavLink to="/home">
          <IconHome className="mr-2" />
          Home
        </NavLink>
      </Breadcrumb.Item>

      {title && <Breadcrumb.Item>{title}</Breadcrumb.Item>}
    </Breadcrumb>
  );
});
TushanBreadcrumb.displayName = 'TushanBreadcrumb';
