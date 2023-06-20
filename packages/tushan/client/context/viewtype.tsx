import React, { useContext } from 'react';

export type ViewType = 'list' | 'detail' | 'edit' | 'create';

const ViewTypeContext = React.createContext<ViewType>('' as ViewType);
ViewTypeContext.displayName = 'ViewTypeContext';

export const ViewTypeContextProvider: React.FC<
  React.PropsWithChildren<{ viewType: ViewType }>
> = React.memo(({ children, viewType }) => {
  return (
    <ViewTypeContext.Provider value={viewType}>
      {children}
    </ViewTypeContext.Provider>
  );
});
ViewTypeContextProvider.displayName = 'ViewTypeContextProvider';

/**
 * Get view type
 * @returns
 * "list" | "detail" | "edit" | "create"
 */
export function useViewTypeContext(): ViewType {
  return useContext(ViewTypeContext);
}
