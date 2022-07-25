import React from 'react';
import { BasicLayout } from './layout/Layout';
import { TushanRouter } from './router';

export const App: React.FC = React.memo(() => {
  return (
    <BasicLayout>
      <TushanRouter />
    </BasicLayout>
  );
});
App.displayName = 'App';
