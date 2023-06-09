import { Breadcrumb } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useMemo } from 'react';
import { useMenuStore } from '../../store/menu';
import { useTranslation } from 'react-i18next';
import { startCase } from 'lodash-es';
import { useTushanContext } from '../../context/tushan';

export const TushanBreadcrumb: React.FC = React.memo(() => {
  const menus = useMenuStore((state) => state.menus);
  const location = useLocation();
  const { t } = useTranslation();
  const { dashboard } = useTushanContext();

  const title = useMemo(() => {
    const menu = menus.find((menu) =>
      location.pathname.startsWith(`/${menu.key}`)
    );

    if (!menu) {
      return '';
    }

    return (
      menu.label ??
      t(`resources.${menu.key}.name`, {
        defaultValue: startCase(menu.key),
      })
    );
  }, [menus, location.pathname, t]);

  return (
    <Breadcrumb style={{ marginBottom: 16 }}>
      <Breadcrumb.Item>
        {dashboard !== false ? (
          <NavLink to="/dashboard">
            <IconHome className="mr-2" style={{ marginRight: 2 }} />

            {t('tushan.breadcrumb.home')}
          </NavLink>
        ) : (
          <div>
            <IconHome className="mr-2" style={{ marginRight: 2 }} />

            {t('tushan.breadcrumb.home')}
          </div>
        )}
      </Breadcrumb.Item>

      {title && <Breadcrumb.Item>{title}</Breadcrumb.Item>}
    </Breadcrumb>
  );
});
TushanBreadcrumb.displayName = 'TushanBreadcrumb';
