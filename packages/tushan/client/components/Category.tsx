import React from 'react';
import type { TushanCategoryPathInfo } from '../store/menu';
import { createContextFactory } from '../utils/context';

export const {
  Provider: CategoryContextProvider,
  useContext: useCategoryContext,
} = createContextFactory<TushanCategoryPathInfo[]>([], 'CategoryContext');

export type CategoryProps = React.PropsWithChildren<TushanCategoryPathInfo>;

/**
 * Category for route
 *
 * Wrapper above <Resource /> and <CustomRoute />
 */
export const Category: React.FC<CategoryProps> = React.memo((props) => {
  const { children, ...currPath } = props;
  const prevPath = useCategoryContext();

  return (
    <CategoryContextProvider value={[...prevPath, currPath]}>
      {children}
    </CategoryContextProvider>
  );
});
Category.displayName = 'Category';
