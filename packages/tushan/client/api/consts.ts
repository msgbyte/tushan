import { PaginationPayload, SortPayload } from './types';

export const defaultSort: SortPayload = { field: 'id', order: 'DESC' };

export const defaultFilter: Record<string, any> = {};

export const defaultPagination: PaginationPayload = {
  page: 1,
  perPage: 20,
};
