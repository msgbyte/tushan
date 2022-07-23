import React from 'react';
import { BasicLayout } from './layout/Layout';

export const App: React.FC = React.memo(() => {
  return (
    <div>
      <BasicLayout>Hello World</BasicLayout>
    </div>
  );
});
App.displayName = 'App';
