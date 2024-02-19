import type { DataProvider } from 'tushan';
import { TRPCClient } from '@trpc/client';
import { AnyRouter } from '@trpc/server';

/**
 * Maps tushan queries to a trpc-server powered API
 *
 * @example
 *
 * getList          => query posts.getList
 * getOne           => query posts.getOne
 * getManyReference => query posts.getManyReference
 * getMany          => query posts.getMany
 * create           => mutation posts.create
 * update           => mutation posts.update
 * updateMany       => mutation posts.updateMany
 * delete           => mutation posts.delete
 *
 * @example
 *
 * import * as React from "react";
 * import { Tushan, trpcServerProvider } from 'tushan';
 *
 * const App = () => (
 *     <Tushan dataProvider={trpcServerProvider(trpcClient)}>
 *         ...
 *     </Tushan>
 * );
 *
 * export default App;
 */
export function trpcServerProvider<TRouter extends AnyRouter>(
  trpcClient: TRPCClient<TRouter>
): DataProvider {
  return {
    getList: async (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        ...params.filter,
        _sort: field,
        _order: order,
        _start: (page - 1) * perPage,
        _end: page * perPage,
      };

      const res = await trpcClient.query(`${resource}.getList`, query);

      return {
        data: res.data,
        total: res.total || 0,
      };
    },

    getOne: (resource, params) =>
      trpcClient
        .query(`${resource}.getOne`, { id: params.id })
        .then(({ data }) => ({
          data,
        })),

    getMany: async (resource, params) => {
      const query = {
        id: params.ids,
      };

      const { data } = await trpcClient.query(`${resource}.getMany`, query);

      return { data };
    },

    getManyReference: async (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        ...params.filter,
        [params.target]: params.id,
        _sort: field,
        _order: order,
        _start: (page - 1) * perPage,
        _end: page * perPage,
      };

      const res = await trpcClient.query(`${resource}.getList`, query);

      return {
        data: res.data,
        total: res.total || 0,
      };
    },

    update: (resource, params) =>
      trpcClient
        .mutation(`${resource}.update`, { id: params.id, data: params.data })
        .then(({ data }) => ({ data })),

    updateMany: (resource, params) =>
      Promise.all(
        params.ids.map((id) =>
          trpcClient.mutation(`${resource}.update`, {
            id: id,
            data: params.data,
          })
        )
      ).then((responses) => ({ data: responses.map(({ data }) => data.id) })),

    create: (resource, params) =>
      trpcClient
        .mutation(`${resource}.create`, {
          data: params.data,
        })
        .then(({ data }) => ({ ...data, id: data.id })),
    delete: (resource, params) =>
      trpcClient
        .mutation(`${resource}.delete`, {
          id: params.id,
        })
        .then(({ data }) => ({ ...data, id: data.id })),

    // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (resource, params) =>
      Promise.all(
        params.ids.map((id) =>
          trpcClient.mutation(`${resource}.delete`, {
            id: id,
          })
        )
      ).then((responses) => ({ data: responses.map(({ data }) => data.id) })),
  };
}
