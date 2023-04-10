import { useRef } from 'react';
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
  MutateOptions,
  QueryKey,
} from '@tanstack/react-query';
import type {
  BasicRecord,
  DeleteParams,
  GetListResult as OriginalGetListResult,
  Identifier,
} from './types';
import { useDataProvider } from '../context/tushan';
import { useEvent } from '../hooks/useEvent';
import { useResourceContext } from '../context/resource';

/**
 * Get a callback to call the dataProvider.delete() method, the result and the loading state.
 *
 * @param {string} resource
 * @param {Params} params The delete parameters { id, previousData }
 * @param {Object} options Options object to pass to the queryClient.
 * May include side effects to be executed upon success or failure, e.g. { onSuccess: () => { refresh(); } }
 * May include a mutation mode (optimistic/pessimistic/undoable), e.g. { mutationMode: 'undoable' }
 *
 * @typedef Params
 * @prop params.id The resource identifier, e.g. 123
 * @prop params.previousData The record before the update is applied
 *
 * @returns The current mutation state. Destructure as [deleteOne, { data, error, isLoading }].
 *
 * The return value updates according to the request state:
 *
 * - initial: [deleteOne, { isLoading: false, isIdle: true }]
 * - start:   [deleteOne, { isLoading: true }]
 * - success: [deleteOne, { data: [data from response], isLoading: false, isSuccess: true }]
 * - error:   [deleteOne, { error: [error from response], isLoading: false, isError: true }]
 *
 * The deleteOne() function must be called with a resource and a parameter object: deleteOne(resource, { id, previousData, meta }, options)
 *
 * This hook uses react-query useMutation under the hood.
 * This means the state object contains mutate, isIdle, reset and other react-query methods.
 *
 * @see https://tanstack.com/query/latest/docs/react/reference/useMutation
 *
 * @example // set params when calling the deleteOne callback
 *
 * import { useDelete, useRecordContext } from 'react-admin';
 *
 * const DeleteButton = () => {
 *     const record = useRecordContext();
 *     const [deleteOne, { isLoading, error }] = useDelete();
 *     const handleClick = () => {
 *         deleteOne('likes', { id: record.id, previousData: record })
 *     }
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={isLoading} onClick={handleClick}>Delete</div>;
 * };
 *
 * @example // set params when calling the hook
 *
 * import { useDelete, useRecordContext } from 'react-admin';
 *
 * const DeleteButton = () => {
 *     const record = useRecordContext();
 *     const [deleteOne, { isLoading, error }] = useDelete('likes', { id: record.id, previousData: record });
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={isLoading} onClick={() => deleteOne()}>Delete</button>;
 * };
 *
 * @example // TypeScript
 * const [delete, { data }] = useDelete<Product>('products', { id, previousData: product });
 *                    \-- data is Product
 */
export const useDelete = <
  RecordType extends BasicRecord = any,
  MutationError = unknown
>(
  resource?: string,
  params: Partial<DeleteParams<RecordType>> = {},
  options: UseDeleteOptions<RecordType, MutationError> = {}
): UseDeleteResult<RecordType, MutationError> => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const contextResource = useResourceContext();
  const { id, previousData } = params;
  const { ...reactMutationOptions } = options;
  const paramsRef = useRef<Partial<DeleteParams<RecordType>>>(params);
  const snapshot = useRef<Snapshot>([]);

  const updateCache = ({
    resource,
    id,
  }: {
    resource: string;
    id: Identifier;
  }) => {
    const updatedAt = Date.now();

    const updateColl = (old: RecordType[]) => {
      if (!old) return;
      const index = old.findIndex(
        // eslint-disable-next-line eqeqeq
        (record) => record.id == id
      );
      if (index === -1) {
        return old;
      }
      return [...old.slice(0, index), ...old.slice(index + 1)];
    };

    type GetListResult = Omit<OriginalGetListResult, 'data'> & {
      data?: RecordType[];
    };

    queryClient.setQueriesData<GetListResult>(
      [resource, 'getList'],
      (res) => {
        if (!res || !res.data) return res;
        const newCollection = updateColl(res.data);
        const recordWasFound =
          newCollection && newCollection.length < res.data.length;
        return recordWasFound
          ? {
              data: newCollection,
              total: res.total ? res.total - 1 : undefined,
              pageInfo: res.pageInfo,
            }
          : res;
      },
      { updatedAt }
    );
    queryClient.setQueriesData<RecordType[]>(
      [resource, 'getMany'],
      (coll) => (coll && coll.length > 0 ? updateColl(coll) : coll),
      { updatedAt }
    );
    queryClient.setQueriesData<GetListResult>(
      [resource, 'getManyReference'],
      (res) => {
        if (!res || !res.data) {
          return res;
        }

        const newCollection = updateColl(res.data);
        const recordWasFound =
          newCollection && newCollection.length < res.data.length;
        return recordWasFound
          ? {
              data: newCollection,
              total: res.total! - 1,
            }
          : res;
      },
      { updatedAt }
    );
  };

  const mutation = useMutation<
    RecordType,
    MutationError,
    Partial<UseDeleteMutateParams<RecordType>>
  >({
    mutationFn: ({
      resource: callTimeResource = resource ?? contextResource,
      id: callTimeId = paramsRef.current.id!,
      previousData: callTimePreviousData = paramsRef.current.previousData!,
      meta: callTimeMeta = paramsRef.current.meta!,
    } = {}) =>
      dataProvider
        .delete<RecordType>(callTimeResource, {
          id: callTimeId,
          previousData: callTimePreviousData,
          meta: callTimeMeta,
        })
        .then(({ data }) => data),
    ...reactMutationOptions,
    onMutate: async (variables: Partial<UseDeleteMutateParams<RecordType>>) => {
      if (reactMutationOptions.onMutate) {
        const userContext =
          (await reactMutationOptions.onMutate(variables)) || {};
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
      data: RecordType,
      variables: Partial<UseDeleteMutateParams<RecordType>> = {},
      context: unknown
    ) => {
      // update the getOne and getList query cache with the new result
      const {
        resource: callTimeResource = resource ?? contextResource,
        id: callTimeId = id,
      } = variables;
      updateCache({
        resource: callTimeResource!,
        id: callTimeId!,
      });

      if (reactMutationOptions.onSuccess) {
        reactMutationOptions.onSuccess(data, variables, context);
      }
    },
  });

  const mutate = async (
    callTimeResource: string = resource ?? contextResource,
    callTimeParams: Partial<DeleteParams<RecordType>> = {},
    updateOptions: MutateOptions<
      RecordType,
      MutationError,
      Partial<UseDeleteMutateParams<RecordType>>,
      unknown
    > = {}
  ) => {
    const { onSuccess, onSettled, onError } = updateOptions;

    // store the hook time params *at the moment of the call*
    // because they may change afterwards, which would break the undoable mode
    // as the previousData would be overwritten by the optimistic update
    paramsRef.current = params;

    return mutation.mutate(
      { resource: callTimeResource, ...callTimeParams },
      { onSuccess, onSettled, onError }
    );
  };

  return [useEvent(mutate), mutation];
};

type Snapshot = [key: QueryKey, value: any][];

export interface UseDeleteMutateParams<RecordType extends BasicRecord = any> {
  resource?: string;
  id?: RecordType['id'];
  data?: Partial<RecordType>;
  previousData?: any;
  meta?: any;
}

export type UseDeleteOptions<
  RecordType extends BasicRecord = any,
  MutationError = unknown
> = UseMutationOptions<
  RecordType,
  MutationError,
  Partial<UseDeleteMutateParams<RecordType>>
>;

export type UseDeleteResult<
  RecordType extends BasicRecord = any,
  MutationError = unknown
> = [
  (
    resource?: string,
    params?: Partial<DeleteParams<RecordType>>,
    options?: MutateOptions<
      RecordType,
      MutationError,
      Partial<UseDeleteMutateParams<RecordType>>,
      unknown
    >
  ) => Promise<void>,
  UseMutationResult<
    RecordType,
    MutationError,
    Partial<DeleteParams<RecordType> & { resource?: string }>,
    unknown
  >
];
