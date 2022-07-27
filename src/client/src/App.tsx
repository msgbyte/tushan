import React from 'react';
import { TushanRouter } from './router';

export const App: React.FC = React.memo(() => {
  return <TushanRouter />;
});
App.displayName = 'App';
