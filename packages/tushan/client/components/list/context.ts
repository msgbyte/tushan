import React, { useContext } from 'react';
import { GetListParams } from '../../api';

interface ListParamsContextProps extends Partial<GetListParams> {}

const ListParamsContext = React.createContext<ListParamsContextProps>({});

export const ListParamsContextProvider = ListParamsContext.Provider;

export function useListParamsContext(): ListParamsContextProps {
  return useContext(ListParamsContext) ?? {};
}
