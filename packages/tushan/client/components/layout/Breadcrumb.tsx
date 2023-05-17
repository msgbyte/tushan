import { Breadcrumb } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useMemo } from 'react';
import { useMenuStore } from '../../store/menu';
import { useTranslation } from 'react-i18next';

export const TushanBreadcrumb: React.FC = React.memo(() => {
  const menus = useMenuStore((state) => state.menus);
  const location = useLocation();
  const { t } = useTranslation();

  const title = useMemo(() => {
    const menu = menus.find((menu) =>
      location.pathname.startsWith(`/${menu.key}`)
    );

    return menu?.label ?? menu?.key ?? '';
  }, [menus, location.pathname]);

  return (
    <Breadcrumb style={{ marginBottom: 16 }}>
      <Breadcrumb.Item>
        <NavLink to="/dashboard">
          <IconHome className="mr-2" style={{ marginRight: 2 }} />

          {t('tushan.breadcrumb.home')}
        </NavLink>
      </Breadcrumb.Item>

      {title && <Breadcrumb.Item>{title}</Breadcrumb.Item>}
    </Breadcrumb>
  );
});
TushanBreadcrumb.displayName = 'TushanBreadcrumb';
