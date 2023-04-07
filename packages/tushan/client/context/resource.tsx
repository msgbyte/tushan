import React, { useContext } from 'react';

const ResourceContext = React.createContext<string>('');
ResourceContext.displayName = 'ResourceContext';

export const ResourceContextProvider: React.FC<
  React.PropsWithChildren<{ resourceName: string }>
> = React.memo(({ children, resourceName }) => {
  return (
    <ResourceContext.Provider value={resourceName}>
      {children}
    </ResourceContext.Provider>
  );
});
ResourceContextProvider.displayName = 'ResourceContextProvider';

export function useResourceContext(): string {
  return useContext(ResourceContext);
}
