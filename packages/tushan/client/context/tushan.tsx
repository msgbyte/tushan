import React, { useContext } from 'react';
import { defaultDataProvider } from '../api/defaultDataProvider';
import type { AuthProvider, DataProvider } from '../api/types';
import { useInitI18N } from '../hooks/useInitI18N';
import type { TranslationKeys } from '../i18n';

export interface TushanContextProps {
  basename?: string;
  dashboard?: React.ReactElement | false;
  dataProvider?: DataProvider;
  authProvider?: AuthProvider;
  i18n?: {
    languages: { key: string; label: string; translation: TranslationKeys }[];
  };
  layout?: React.ReactElement;
  loginPage?: React.ReactElement;
  header?: React.ReactNode;
  footer?: React.ReactNode;
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

export function useTushanContext(): TushanContextProps {
  return useContext(TushanContext);
}

export function useDataProvider() {
  const { dataProvider = defaultDataProvider } = useTushanContext();

  return dataProvider;
}
