import { UseQueryResult } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { GetListParams } from '../../api';

/**
 * ListParamsContext
 */

interface ListParamsContextProps extends Partial<GetListParams> {}

const ListParamsContext = React.createContext<ListParamsContextProps>({});
ListParamsContext.displayName = 'ListParamsContext';

export const ListParamsContextProvider = ListParamsContext.Provider;

export function useListParamsContext(): ListParamsContextProps {
  return useContext(ListParamsContext) ?? {};
}

/**
 * ListTableContext
 */

interface ListTableContextProps<Record = any> {
  list: Record[] | undefined;
  total: number | undefined;
  refetch: UseQueryResult['refetch'];
}

const ListTableContext = React.createContext<ListTableContextProps>(
  {} as ListTableContextProps
);
ListTableContext.displayName = 'ListTableContext';

export const ListTableContextProvider = ListTableContext.Provider;

export function useListTableContext(): ListTableContextProps {
  return useContext(ListTableContext) ?? {};
}
