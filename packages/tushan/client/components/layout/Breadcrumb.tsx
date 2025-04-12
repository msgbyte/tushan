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
  const location = useLocation();
  const { t } = useTranslation();
  const { dashboard } = useTushanContext();

  const title = useMemo(() => {
    const menu = useMenuStore
      .getState()
      .findMenuBySelector((menu) =>
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
  }, [location.pathname, t]);

  return (
    <Breadcrumb style={{ marginBottom: 16 }}>
      <Breadcrumb.Item key="dashboard">
        {dashboard !== false ? (
          <NavLink to="/dashboard" key="home-dashboard">
            <IconHome className="mr-2" style={{ marginRight: 2 }} />

            {t('tushan.breadcrumb.home')}
          </NavLink>
        ) : (
          <div key="home">
            <IconHome className="mr-2" style={{ marginRight: 2 }} />

            {t('tushan.breadcrumb.home')}
          </div>
        )}
      </Breadcrumb.Item>

      {title && <Breadcrumb.Item key="title">{title}</Breadcrumb.Item>}
    </Breadcrumb>
  );
});
TushanBreadcrumb.displayName = 'TushanBreadcrumb';
