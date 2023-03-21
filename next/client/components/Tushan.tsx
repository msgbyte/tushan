import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { BasicLayout } from './layout';
import '@arco-design/web-react/dist/css/arco.css';

interface TushanProps extends React.PropsWithChildren {
  basename?: string;
}
export const Tushan: React.FC<TushanProps> = React.memo((props) => {
  const { basename = '/admin' } = props;

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<BasicLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>

        {props.children}
      </Routes>
    </BrowserRouter>
  );
});
Tushan.displayName = 'Tushan';
