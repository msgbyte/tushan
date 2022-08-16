import React from 'react';
import { Menu } from '@arco-design/web-react';
import { IconApps, IconArchive, IconHome } from '@arco-design/web-react/icon';
import { useAllResources } from '../model/resource/meta';
import { useRouteNav } from '../router/hooks';
import { useLocation } from 'react-router';
import { getTushanCustomInfo } from '../utils';

const MenuItem = Menu.Item;

export const Sidebar: React.FC = React.memo(() => {
  const { metas } = useAllResources();
  const { navigate } = useRouteNav();
  const location = useLocation();

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

      {metas.map((meta) => (
        <MenuItem key={`/${meta.resourceName}/list`}>
          <IconApps />
          {meta.resourceLabel}
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
