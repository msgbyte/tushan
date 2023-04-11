import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BuiltinRoutes } from './BuiltinRoutes';
import { TushanContextProps, TushanContextProvider } from '../context/tushan';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { defaultQueryClient } from '../api';
import '@arco-design/web-react/dist/css/arco.css';

interface TushanProps extends TushanContextProps, React.PropsWithChildren {
  queryClient?: QueryClient;
}
export const Tushan: React.FC<TushanProps> = React.memo((props) => {
  const { basename, queryClient = defaultQueryClient } = props;

  return (
    <TushanContextProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={basename}>
          <BuiltinRoutes>{props.children}</BuiltinRoutes>
        </BrowserRouter>
      </QueryClientProvider>
    </TushanContextProvider>
  );
});
Tushan.displayName = 'Tushan';
