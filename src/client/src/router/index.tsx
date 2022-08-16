import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TushanHome } from '../components/home';
import { TushanTable } from '../components/table';
import { BasicLayout } from '../layout/Layout';
import { getTushanCustomInfo } from '../utils';

export const TushanRouter: React.FC = React.memo(() => {
  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path="/home" element={<TushanHome />} />
          <Route path="/:resourceName/list" element={<TushanTable />} />

          {getTushanCustomInfo().customPages.map((page) => {
            const path = page.path;
            const Component =
              getTushanCustomInfo().customComponent[page.componentId] ?? null;

            return <Route key={path} path={path} element={<Component />} />;
          })}

          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
TushanRouter.displayName = 'TushanRouter';
