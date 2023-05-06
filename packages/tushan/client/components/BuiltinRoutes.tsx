import React, { Children, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { defaultAuthParams, useCheckAuth } from '../api/auth';
import { useTushanContext } from '../context/tushan';
import { useConfigureAdminRouterFromChildren } from '../hooks/useConfigureAdminRouterFromChildren';
import { useDelay } from '../hooks/useDelay';
import { useUserStore } from '../store/user';
import { createSelector } from '../utils/createSelector';
import { Dashboard } from './defaults/Dashboard';
import { LoginPage } from './defaults/LoginPage';
import { BasicLayout } from './layout';
import { LoadingView } from './LoadingView';

export interface BuiltinRoutesProps {
  children?: React.ReactNode;
}

export const BuiltinRoutes: React.FC<BuiltinRoutesProps> = React.memo(
  (props) => {
    const {
      customRoutesWithLayout,
      customRoutesWithoutLayout,
      resources,
      components,
    } = useConfigureAdminRouterFromChildren(props.children);
    const { dashboard = true, authProvider } = useTushanContext();
    const requireAuth = Boolean(authProvider);
    const [canRender, setCanRender] = useState(!requireAuth);
    const oneSecondHasPassed = useDelay(1000);
    const { isLogin } = useUserStore(createSelector('isLogin'));

    const checkAuth = useCheckAuth();

    useEffect(() => {
      if (requireAuth) {
        checkAuth()
          .then(() => {
            setCanRender(true);
          })
          .catch(() => {});
      }
    }, [checkAuth, requireAuth, isLogin]);

    return (
      <>
        <Routes>
          {customRoutesWithoutLayout}

          <Route path={defaultAuthParams.loginUrl} element={<LoginPage />} />

          {canRender ? (
            <Route element={<BasicLayout />}>
              <Route
                path="*"
                element={
                  <div>
                    <Routes>
                      {dashboard && (
                        <Route path="/dashboard" element={<Dashboard />} />
                      )}

                      {customRoutesWithLayout}

                      {Children.map(resources, (resource) => (
                        <Route
                          key={resource.props.name}
                          path={`${resource.props.name}/*`}
                          element={resource}
                        />
                      ))}

                      <Route
                        path="/"
                        element={
                          <Navigate
                            to={
                              dashboard
                                ? '/dashboard'
                                : `/${resources[0].props.name}/`
                            }
                          />
                        }
                      />

                      <Route path="*" element={<div>404</div>} />
                    </Routes>
                  </div>
                }
              />
            </Route>
          ) : oneSecondHasPassed ? (
            <Route path="*" element={<LoadingView />} />
          ) : (
            <Route path="*" element={null} />
          )}
        </Routes>

        {components}
      </>
    );
  }
);
BuiltinRoutes.displayName = 'BuiltinRoutes';
