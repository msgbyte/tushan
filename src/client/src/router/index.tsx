import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TushanHome } from '../components/home';
import { TushanTable } from '../components/table';
import { BasicLayout } from '../layout/Layout';

export const TushanRouter: React.FC = React.memo(() => {
  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path="/home" element={<TushanHome />} />
          <Route path="/:resourceName/list" element={<TushanTable />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
TushanRouter.displayName = 'TushanRouter';
