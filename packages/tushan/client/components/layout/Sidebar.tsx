import React from 'react';
import { Menu } from '@arco-design/web-react';
import { IconApps, IconHome } from '@arco-design/web-react/icon';
import { useLocation, useNavigate } from 'react-router';
import { TushanMenu, useMenuStore } from '../../store/menu';
import { createSelector } from '../../utils/createSelector';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { startCase } from 'lodash-es';
import { useTushanContext } from '../../context/tushan';
import type { TFunction } from 'i18next';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Root = styled(Menu)`
  width: 100%;
`;

export const Sidebar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menus } = useMenuStore(createSelector('menus'));
  const { t } = useTranslation();
  const { dashboard } = useTushanContext();

  const defaultSelectedKeys = [location.pathname.replace(/\/$/, '')]; // remove end path /

  return (
    <Root
      className="sidebar"
      selectedKeys={defaultSelectedKeys}
      onClickMenuItem={(path) => navigate(path)}
    >
      {dashboard !== false && (
        <MenuItem key="/dashboard">
          <IconHome />

          {t('tushan.dashboard.name')}
        </MenuItem>
      )}

      {renderMenu({
        menus,
        t,
      })}
    </Root>
  );
});
Sidebar.displayName = 'Sidebar';

/**
 * A function which generate tree struct menu
 *
 * Cannot use hooks because of `Menu - SubMenu - MenuItem` should be closest
 */
function renderMenu({ menus, t }: { menus: TushanMenu[]; t: TFunction }) {
  return (menus ?? []).map((item) => {
    const path = item.path ?? item.key;

    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <SubMenu
          key={item.key}
          title={
            <>
              {item.icon ? item.icon : <IconApps />}

              {item.label ??
                t(`category.${item.key}`, {
                  defaultValue: startCase(item.key),
                })}
            </>
          }
        >
          {renderMenu({
            menus: item.children ?? [],
            t,
          })}
        </SubMenu>
      );
    } else {
      return (
        <MenuItem key={`/${path}`}>
          {item.icon ? item.icon : <IconApps />}

          {item.label ??
            t(`resources.${item.key}.name`, {
              defaultValue: startCase(item.key),
            })}
        </MenuItem>
      );
    }
  });
}
