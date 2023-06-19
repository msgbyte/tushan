import { useRef } from 'react';
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
  MutateOptions,
  QueryKey,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useDataProvider } from '../context/tushan';
import { useEvent } from '../hooks/useEvent';
import {
  BasicRecord,
  DeleteManyParams,
  GetListResult as OriginalGetListResult,
  Identifier,
  GetInfiniteListResult,
} from './types';
import { useResourceContext } from '../context/resource';

/**
 * Get a callback to call the dataProvider.delete() method, the result and the loading state.
 *
 * @param {string} resource
 * @param {Params} params The delete parameters { ids }
 * @param {Object} options Options object to pass to the queryClient.
 * May include side effects to be executed upon success or failure, e.g. { onSuccess: () => { refresh(); } }
 *
 * @typedef Params
 * @prop params.ids The resource identifiers, e.g. [123, 456]
 *
 * @returns The current mutation state. Destructure as [deleteMany, { data, error, isLoading }].
 *
 * The return value updates according to the request state:
 *
 * - initial: [deleteMany, { isLoading: false, isIdle: true }]
 * - start:   [deleteMany, { isLoading: true }]
 * - success: [deleteMany, { data: [data from response], isLoading: false, isSuccess: true }]
 * - error:   [deleteMany, { error: [error from response], isLoading: false, isError: true }]
 *
 * The deleteMany() function must be called with a resource and a parameter object: deleteMany(resource, { ids, meta }, options)
 *
 * This hook uses react-query useMutation under the hood.
 * This means the state object contains mutate, isIdle, reset and other react-query methods.
 *
 * @see https://tanstack.com/query/latest/docs/react/reference/useMutation
 *
 * @example // set params when calling the deleteMany callback
 *
 * import { useDeleteMany } from 'tushan';
 *
 * const BulkDeletePostsButton = ({ selectedIds }) => {
 *     const [deleteMany, { isLoading, error }] = useDeleteMany();
 *     const handleClick = () => {
 *         deleteMany('posts', { ids: selectedIds })
 *     }
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={isLoading} onClick={handleClick}>Delete selected posts</button>;
 * };
 *
 * @example // set params when calling the hook
 *
 * import { useDeleteMany } from 'tushan';
 *
 * const BulkDeletePostsButton = ({ selectedIds }) => {
 *     const [deleteMany, { isLoading, error }] = useDeleteMany('posts', { ids: selectedIds });
 *     const handleClick = () => {
 *         deleteMany()
 *     }
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={isLoading} onClick={handleClick}>Delete selected posts</button>;
 * };
 *
 * @example // TypeScript
 * const [deleteMany, { data }] = useDeleteMany<Product>('products', { ids });
 *                        \-- data is Product
 */
export const useDeleteMany = <
  RecordType extends BasicRecord = any,
  MutationError = unknown
>(
  resource?: string,
  params: Partial<DeleteManyParams<RecordType>> = {},
  options: UseDeleteManyOptions<RecordType, MutationError> = {}
): UseDeleteManyResult<RecordType, MutationError> => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const contextResource = useResourceContext();
  const { ids } = params;
  const paramsRef = useRef<Partial<DeleteManyParams<RecordType>>>({});
  const snapshot = useRef<Snapshot>([]);

  const updateCache = ({
    resource,
    ids,
  }: {
    resource: string;
    ids: Identifier[];
  }) => {
    const updatedAt = Date.now();

    const updateColl = (old: RecordType[]) => {
      if (!old) {
        return;
      }

      let newCollection = [...old];
      ids.forEach((id) => {
        const index = newCollection.findIndex(
          // eslint-disable-next-line eqeqeq
          (record) => record.id == id
        );
        if (index === -1) {
          return;
        }
        newCollection = [
          ...newCollection.slice(0, index),
          ...newCollection.slice(index + 1),
        ];
      });

      return newCollection;
    };

    type GetListResult = Omit<OriginalGetListResult, 'data'> & {
      data?: RecordType[];
    };

    queryClient.setQueriesData(
      [resource, 'getList'],
      (res: GetListResult | undefined) => {
        if (!res || !res.data) {
          return res;
        }

        const newCollection = updateColl(res.data);
        const recordWasFound =
          newCollection && newCollection.length < res.data.length;
        return recordWasFound
          ? {
              data: newCollection,
              total: res.total
                ? res.total - (res.data.length - newCollection.length)
                : undefined,
              pageInfo: res.pageInfo,
            }
          : res;
      },
      { updatedAt }
    );

    queryClient.setQueriesData(
      [resource, 'getInfiniteList'],
      (
        res: UseInfiniteQueryResult<GetInfiniteListResult>['data']
      ): UseInfiniteQueryResult<GetInfiniteListResult>['data'] => {
        if (!res || !res.pages) {
          return res;
        }

        return {
          ...res,
          pages: res.pages.map((page) => {
            const newCollection = updateColl(page.data);
            const recordWasFound =
              newCollection && newCollection.length < page.data.length;

            return recordWasFound
              ? {
                  ...page,
                  data: newCollection,
                  total: page.total
                    ? page.total - (page.data.length - newCollection.length)
                    : undefined,
                  pageInfo: page.pageInfo,
                }
              : page;
          }),
        };
      },
      { updatedAt }
    );

    queryClient.setQueriesData(
      [resource, 'getMany'],
      (coll: RecordType[] | undefined) =>
        coll && coll.length > 0 ? updateColl(coll) : coll,
      { updatedAt }
    );

    queryClient.setQueriesData(
      [resource, 'getManyReference'],
      (res: GetListResult | undefined) => {
        if (!res || !res.data) {
          return res;
        }

        const newCollection = updateColl(res.data);
        const recordWasFound =
          newCollection && newCollection.length < res.data.length;
        return recordWasFound
          ? {
              data: newCollection,
              total:
                (res.total ?? 0) - (res.data.length - newCollection.length),
            }
          : res;
      },
      { updatedAt }
    );
  };

  const mutation = useMutation<
    RecordType['id'][],
    MutationError,
    Partial<UseDeleteManyMutateParams<RecordType>>
  >({
    mutationFn: ({
      resource: callTimeResource = resource ?? contextResource,
      ids: callTimeIds = paramsRef.current.ids!,
      meta: callTimeMeta = paramsRef.current.meta,
    } = {}) =>
      dataProvider
        .deleteMany<RecordType>(callTimeResource, {
          ids: callTimeIds,
          meta: callTimeMeta,
        })
        .then(({ data }) => data),
    ...(options as any),
    onMutate: async (
      variables: Partial<UseDeleteManyMutateParams<RecordType>>
    ) => {
      if (options.onMutate) {
        const userContext = (await options.onMutate(variables)) || {};
        return {
          snapshot: snapshot.current,
          // @ts-ignore
          ...userContext,
        };
      } else {
        // Return a context object with the snapshot value
        return { snapshot: snapshot.current };
      }
    },
    onSuccess: (
      data: RecordType['id'][],
      variables: Partial<UseDeleteManyMutateParams<RecordType>> = {},
      context: unknown
    ) => {
      // update the getOne and getList query cache with the new result
      const {
        resource: callTimeResource = resource ?? contextResource,
        ids: callTimeIds = ids!,
      } = variables;
      updateCache({
        resource: callTimeResource,
        ids: callTimeIds,
      });

      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });

  const mutate = async (
    callTimeResource: string = resource ?? contextResource,
    callTimeParams: Partial<DeleteManyParams<RecordType>> = {},
    updateOptions: MutateOptions<
      RecordType['id'][],
      MutationError,
      Partial<UseDeleteManyMutateParams<RecordType>>,
      unknown
    > = {}
  ) => {
    const { onSuccess, onSettled, onError } = updateOptions;

    // store the hook time params *at the moment of the call*
    // because they may change afterwards, which would break the undoable mode
    // as the previousData would be overwritten by the optimistic update
    paramsRef.current = params;

    await mutation.mutateAsync(
      { resource: callTimeResource, ...callTimeParams },
      { onSuccess, onSettled, onError }
    );
  };

  return [useEvent(mutate), mutation];
};

type Snapshot = [key: QueryKey, value: any][];

export interface UseDeleteManyMutateParams<
  RecordType extends BasicRecord = any
> {
  resource?: string;
  ids?: RecordType['id'][];
  meta?: any;
}

export type UseDeleteManyOptions<
  RecordType extends BasicRecord = any,
  MutationError = unknown
> = UseMutationOptions<
  RecordType['id'][],
  MutationError,
  Partial<UseDeleteManyMutateParams<RecordType>>
>;

export type UseDeleteManyResult<
  RecordType extends BasicRecord = any,
  MutationError = unknown
> = [
  (
    resource?: string,
    params?: Partial<DeleteManyParams<RecordType>>,
    options?: MutateOptions<
      RecordType['id'][],
      MutationError,
      Partial<UseDeleteManyMutateParams<RecordType>>,
      unknown
    >
  ) => Promise<void>,
  UseMutationResult<
    RecordType['id'][],
    MutationError,
    Partial<DeleteManyParams<RecordType> & { resource?: string }>,
    unknown
  >
];
