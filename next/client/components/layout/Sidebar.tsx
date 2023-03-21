import React from 'react';
import { Menu } from '@arco-design/web-react';
import { IconApps, IconHome } from '@arco-design/web-react/icon';
import { useLocation, useNavigate } from 'react-router';
import { useMenuStore } from '../../store/menu';

const MenuItem = Menu.Item;

export const Sidebar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const menus = useMenuStore((state) => state.menus);

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

      {(menus ?? []).map((item) => (
        <MenuItem key={item.path ? item.path : `/${item.key}/list`}>
          {item.icon ? item.icon : <IconApps />}

          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
});
Sidebar.displayName = 'Sidebar';
