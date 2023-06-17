import { createContext, useContext } from 'react';

/**
 * Create React Context with factory
 */
export function createContextFactory<Props>(
  defaultValue: Props,
  displayName: string
) {
  const Context = createContext<Props>(defaultValue);
  Context.displayName = displayName;

  return {
    Provider: Context.Provider,
    useContext: function (): Props {
      return useContext(Context);
    },
  };
}
