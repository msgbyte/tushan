import React from 'react';
import { Menu } from '@arco-design/web-react';
import { IconApps, IconHome } from '@arco-design/web-react/icon';
import { useLocation, useNavigate } from 'react-router';
import { useMenuStore } from '../../store/menu';
import { createSelector } from '../../utils/createSelector';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { startCase } from 'lodash-es';

const MenuItem = Menu.Item;

const Root = styled(Menu)`
  width: 100%;
`;

export const Sidebar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menus } = useMenuStore(createSelector('menus'));
  const { t } = useTranslation();

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
        const path = item.path ?? item.key;

        return (
          <MenuItem key={`/${path}`}>
            {item.icon ? item.icon : <IconApps />}

            {item.label ??
              t(`resources.${item.key}.name`, {
                defaultValue: startCase(item.key),
              })}
          </MenuItem>
        );
      })}
    </Root>
  );
});
Sidebar.displayName = 'Sidebar';
