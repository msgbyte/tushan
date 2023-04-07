import React from 'react';
import { Menu } from '@arco-design/web-react';
import { IconApps, IconHome } from '@arco-design/web-react/icon';
import { useLocation, useNavigate } from 'react-router';
import { useMenuStore } from '../../store/menu';
import { createSelector } from '../../utils/createSelector';
import styled from 'styled-components';

const MenuItem = Menu.Item;

const Root = styled(Menu)`
  width: 100%;
`;

export const Sidebar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menus } = useMenuStore(createSelector('menus'));

  return (
    <Root
      className="sidebar"
      selectedKeys={[location.pathname]}
      onClickMenuItem={(path) => navigate(path)}
    >
      <MenuItem key="/dashboard">
        <IconHome />
        Dashboard
      </MenuItem>

      {(menus ?? []).map((item) => {
        const path = item.path ? item.path : `/${item.key}/list`;

        return (
          <MenuItem key={path}>
            {item.icon ? item.icon : <IconApps />}

            {item.label}
          </MenuItem>
        );
      })}
    </Root>
  );
});
Sidebar.displayName = 'Sidebar';
