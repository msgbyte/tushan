import React from 'react';
import { Menu } from '@arco-design/web-react';
import { IconApps, IconArchive, IconHome } from '@arco-design/web-react/icon';
import { useRouteNav } from '../router/hooks';
import { useLocation } from 'react-router';
import { getTushanCustomInfo } from '../utils';
import { useLayoutStore } from '../store/layout';

const MenuItem = Menu.Item;

export const Sidebar: React.FC = React.memo(() => {
  const { navigate } = useRouteNav();
  const location = useLocation();
  const { resources } = useLayoutStore();

  return (
    <Menu
      style={{ width: '100%' }}
      selectedKeys={[location.pathname]}
      onClickMenuItem={(path) => navigate(path)}
    >
      <MenuItem key="/home">
        <IconHome />
        Home
      </MenuItem>

      {resources.map((item) => (
        <MenuItem key={`/${item.resourceName}/list`}>
          <IconApps />
          {item.resourceLabel}
        </MenuItem>
      ))}

      {getTushanCustomInfo()
        .customPages.filter((page) => page.label)
        .map((page) => (
          <MenuItem key={page.path}>
            <IconArchive />
            {page.label}
          </MenuItem>
        ))}
    </Menu>
  );
});
Sidebar.displayName = 'Sidebar';
