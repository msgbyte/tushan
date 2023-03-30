import React, { useContext } from 'react';

export type ViewType = 'list' | 'detail' | 'edit';

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
 * 获取视图类型
 * 可能返回 "list" | "detail" | "edit"
 */
export function useViewTypeContext(): string {
  return useContext(ViewTypeContext);
}
