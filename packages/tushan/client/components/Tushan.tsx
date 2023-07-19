import React, { useMemo } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { BuiltinRoutes, BuiltinRoutesProps } from './BuiltinRoutes';
import { TushanContextProps, TushanContextProvider } from '../context/tushan';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { defaultQueryClient } from '../api';
import { ArcoDesignProvider } from './ArcoDesignProvider';
import '@arco-design/web-react/dist/css/arco.css';

interface TushanProps extends TushanContextProps, BuiltinRoutesProps {
  queryClient?: QueryClient;
}
export const Tushan: React.FC<TushanProps> = React.memo((props) => {
  const {
    basename,
    queryClient = defaultQueryClient,
    routerType = 'browser',
  } = props;

  const Router = useMemo(
    () => (routerType === 'browser' ? BrowserRouter : HashRouter),
    []
  );

  return (
    <TushanContextProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <ArcoDesignProvider>
          <Router basename={basename}>
            <BuiltinRoutes>{props.children}</BuiltinRoutes>
          </Router>
        </ArcoDesignProvider>
      </QueryClientProvider>
    </TushanContextProvider>
  );
});
Tushan.displayName = 'Tushan';
