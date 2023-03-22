import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BuiltinRoutes } from './BuiltinRoutes';
import '@arco-design/web-react/dist/css/arco.css';

interface TushanProps extends React.PropsWithChildren {
  basename?: string;
}
export const Tushan: React.FC<TushanProps> = React.memo((props) => {
  const { basename = '/admin' } = props;

  return (
    <BrowserRouter basename={basename}>
      <BuiltinRoutes>{props.children}</BuiltinRoutes>
    </BrowserRouter>
  );
});
Tushan.displayName = 'Tushan';
