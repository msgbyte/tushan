import React, { Children } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useConfigureAdminRouterFromChildren } from '../hooks/useConfigureAdminRouterFromChildren';
import { Dashboard } from './Dashboard';
import { BasicLayout } from './layout';

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

    const dashboard = true;

    return (
      <>
        <Routes>
          {customRoutesWithoutLayout}

          <Route element={<BasicLayout />}>
            <Route
              path="/*"
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
        </Routes>

        {components}
      </>
    );
  }
);
BuiltinRoutes.displayName = 'BuiltinRoutes';
