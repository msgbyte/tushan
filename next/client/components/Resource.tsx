import React, { isValidElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ResourceContextProvider } from '../context/resource';

export interface ResourceProps extends React.PropsWithChildren {
  name: string;
  label?: string;
  list?: React.ComponentType<any> | React.ReactElement;
  create?: React.ComponentType<any> | React.ReactElement;
  edit?: React.ComponentType<any> | React.ReactElement;
  detail?: React.ComponentType<any> | React.ReactElement;
  icon?: React.ReactElement;
}
export const Resource: React.FC<ResourceProps> = React.memo((props) => {
  const { create: Create, detail: Detail, list: List, edit: Edit } = props;

  return (
    <ResourceContextProvider resourceName={props.name}>
      <Routes>
        {List && (
          <Route path={`/*`} element={isValidElement(List) ? List : <List />} />
        )}

        {Create && (
          <Route
            path={`create/*`}
            element={isValidElement(Create) ? Create : <Create />}
          />
        )}
        {Detail && (
          <Route
            path={`:id/detail/*`}
            element={isValidElement(Detail) ? Detail : <Detail />}
          />
        )}
        {Edit && (
          <Route
            path={`:id/*`}
            element={isValidElement(Edit) ? Edit : <Edit />}
          />
        )}

        {props.children}
      </Routes>
    </ResourceContextProvider>
  );
});
Resource.displayName = 'Resource';
