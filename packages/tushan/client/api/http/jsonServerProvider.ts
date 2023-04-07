import type { DataProvider } from '../types';
import { fetchJSON, HTTPClient } from './request';
import qs from 'qs';
import { flattenObject } from './utils';

export function jsonServerProvider(
  apiUrl: string,
  httpClient: HTTPClient = fetchJSON
): DataProvider {
  return {
    getList: async (resource, params) => {
      const { pageNum, pageSize } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        ...flattenObject(params.filter),
        _sort: field,
        _order: order,
        _start: (pageNum - 1) * pageSize,
        _end: pageNum * pageSize,
      };
      const url = `${apiUrl}/${resource}?${qs.stringify(query)}`;

      const { headers, json } = await httpClient(url);
      if (!headers.has('x-total-count')) {
        throw new Error(
          'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
        );
      }
      return {
        data: json,
        total: parseInt(headers.get('x-total-count')!.split('/').pop()!, 10),
      };
    },

    getOne: (resource, params) =>
      httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
        data: json,
      })),

    getMany: async (resource, params) => {
      const query = {
        id: params.ids,
      };
      const url = `${apiUrl}/${resource}?${qs.stringify(query)}`;
      const { json } = await httpClient(url);
      return { data: json };
    },

    getManyReference: async (resource, params) => {
      const { pageNum, pageSize } = params.pagination;
      const { field, order } = params.sort;

      const query = {
        ...flattenObject(params.filter),
        [params.target]: params.id,
        _sort: field,
        _order: order,
        _start: (pageNum - 1) * pageSize,
        _end: pageNum * pageSize,
      };

      const url = `${apiUrl}/${resource}?${qs.stringify(query)}`;

      const { headers, json } = await httpClient(url);
      if (!headers.has('x-total-count')) {
        throw new Error(
          'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
        );
      }
      return {
        data: json,
        total: parseInt(headers.get('x-total-count')!.split('/').pop()!, 10),
      };
    },

    update: async (resource, params) => {
      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      });

      return { data: json };
    },

    // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    updateMany: async (resource, params) => {
      const responses = await Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
          })
        )
      );
      return { data: responses.map(({ json }) => json.id) };
    },

    create: async (resource, params) => {
      const { json } = await httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      });

      return {
        data: { ...params.data, id: json.id },
      };
    },

    delete: async (resource, params) => {
      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'DELETE',
      });

      return { data: json };
    },

    // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: async (resource, params) => {
      const responses = await Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'DELETE',
          })
        )
      );

      return { data: responses.map(({ json }) => json.id) };
    },
  };
}
