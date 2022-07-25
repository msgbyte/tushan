import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TushanTable } from '../components/table';

export const TushanRouter: React.FC = React.memo(() => {
  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route path="/:resourceName/list" element={<TushanTable />} />
      </Routes>
    </BrowserRouter>
  );
});
TushanRouter.displayName = 'TushanRouter';
