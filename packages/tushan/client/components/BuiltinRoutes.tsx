import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { defaultAuthParams, useCheckAuth } from '../api/auth';
import { useTushanContext } from '../context/tushan';
import { useConfigureAdminRouterFromChildren } from '../hooks/useConfigureAdminRouterFromChildren';
import { useDelay } from '../hooks/useDelay';
import { useUserStore } from '../store/user';
import type { TushanChildren } from '../types';
import { createSelector } from '../utils/createSelector';
import { Dashboard } from './defaults/Dashboard';
import { LoginPage } from './defaults/LoginPage';
import { BasicLayout } from './layout';
import { LoadingView } from './LoadingView';

export interface BuiltinRoutesProps {
  children: TushanChildren;
}

export const BuiltinRoutes: React.FC<BuiltinRoutesProps> = React.memo(
  (props) => {
    const {
      customRoutesWithLayout,
      customRoutesWithoutLayout,
      resources,
      components,
    } = useConfigureAdminRouterFromChildren(props.children);
    const {
      dashboard = <Dashboard />,
      authProvider,
      layout = <BasicLayout />,
      loginPage = <LoginPage />,
    } = useTushanContext();
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

          <Route path={defaultAuthParams.loginUrl} element={loginPage} />

          {canRender ? (
            <Route element={layout}>
              <Route
                path="*"
                element={
                  <div>
                    <Routes>
                      {dashboard && (
                        <Route path="/dashboard" element={dashboard} />
                      )}

                      {customRoutesWithLayout.map((item) => (
                        <Route
                          key={item.element.props.name}
                          path={`${item.element.props.name}/*`}
                          element={item.element}
                        />
                      ))}

                      {resources.map((resource) => (
                        <Route
                          key={resource.element.props.name}
                          path={`${resource.element.props.name}/*`}
                          element={resource.element}
                        />
                      ))}

                      <Route
                        path="/"
                        element={
                          <Navigate
                            to={
                              dashboard
                                ? '/dashboard'
                                : `/${resources[0]?.element.props.name}/`
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
