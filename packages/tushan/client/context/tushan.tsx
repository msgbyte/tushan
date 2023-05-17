import React, { useContext } from 'react';
import { defaultDataProvider } from '../api/defaultDataProvider';
import type { AuthProvider, DataProvider } from '../api/types';
import { useInitI18N } from '../hooks/useInitI18N';
import { TranslationKeys } from '../i18n';

export interface TushanContextProps {
  basename?: string;
  dashboard?: boolean;
  dataProvider?: DataProvider;
  authProvider?: AuthProvider;
  i18n?: {
    languages: { key: string; label: string; translation: TranslationKeys }[];
  };
  layout?: React.ReactElement;
}

const TushanContext = React.createContext<TushanContextProps>({});
TushanContext.displayName = 'TushanContext';

export const TushanContextProvider: React.FC<
  React.PropsWithChildren<TushanContextProps>
> = React.memo(({ children, ...props }) => {
  useInitI18N(props.i18n);

  return (
    <TushanContext.Provider value={{ ...props }}>
      {children}
    </TushanContext.Provider>
  );
});
TushanContextProvider.displayName = 'TushanContextProvider';

export function useTushanContext() {
  return useContext(TushanContext);
}

export function useDataProvider() {
  const { dataProvider = defaultDataProvider } = useTushanContext();

  return dataProvider;
}
