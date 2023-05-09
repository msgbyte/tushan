import React from 'react';

export interface CustomRoutesProp {
  noLayout?: boolean;
  noMenu?: boolean;
  name: string;
  label?: string;
  icon?: React.ReactElement;
  children: React.ReactElement;
}

export const CustomRoute: React.FC<CustomRoutesProp> = React.memo((props) => {
  return <div>{props.children}</div>;
});
CustomRoute.displayName = 'CustomRoute';
