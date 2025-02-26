import { useRef } from 'react';
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
  MutateOptions,
  QueryKey,
} from '@tanstack/react-query';
import { useDataProvider } from '../context/tushan';
import type {
  BasicRecord,
  Identifier,
  UpdateParams,
  GetListResult as OriginalGetListResult,
} from './types';
import { useEvent } from '../hooks/useEvent';
import { useResourceContext } from '../context/resource';

/**
 * Get a callback to call the dataProvider.update() method, the result and the loading state.
 *
 * @param {string} resource
 * @param {Params} params The update parameters { id, data, previousData, meta }
 * @param {Object} options Options object to pass to the queryClient.
 * May include side effects to be executed upon success or failure, e.g. { onSuccess: () => { refresh(); } }
 *
 * @typedef Params
 * @prop params.id The resource identifier, e.g. 123
 * @prop params.data The updates to merge into the record, e.g. { views: 10 }
 * @prop params.previousData The record before the update is applied
 * @prop params.meta Optional meta data
 *
 * @returns The current mutation state. Destructure as [update, { data, error, isLoading }].
 *
 * The return value updates according to the request state:
 *
 * - initial: [update, { isLoading: false, isIdle: true }]
 * - start:   [update, { isLoading: true }]
 * - success: [update, { data: [data from response], isLoading: false, isSuccess: true }]
 * - error:   [update, { error: [error from response], isLoading: false, isError: true }]
 *
 * The update() function must be called with a resource and a parameter object: update(resource, { id, data, previousData }, options)
 *
 * This hook uses react-query useMutation under the hood.
 * This means the state object contains mutate, isIdle, reset and other react-query methods.
 *
 * @see https://tanstack.com/query/latest/docs/react/reference/useMutation
 *
 * @example // set params when calling the update callback
 *
 * import { useUpdate, useRecordContext } from 'react-admin';
 *
 * const IncreaseLikeButton = () => {
 *     const record = useRecordContext();
 *     const diff = { likes: record.likes + 1 };
 *     const [update, { isLoading, error }] = useUpdate();
 *     const handleClick = () => {
 *         update('likes', { id: record.id, data: diff, previousData: record })
 *     }
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={isLoading} onClick={handleClick}>Like</div>;
 * };
 *
 * @example // set params when calling the hook
 *
 * import { useUpdate, useRecordContext } from 'react-admin';
 *
 * const IncreaseLikeButton = () => {
 *     const record = useRecordContext();
 *     const diff = { likes: record.likes + 1 };
 *     const [update, { isLoading, error }] = useUpdate('likes', { id: record.id, data: diff, previousData: record });
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={isLoading} onClick={() => update()}>Like</button>;
 * };
 *
 * @example // TypeScript
 * const [update, { data }] = useUpdate<Product>('products', { id, data: diff, previousData: product });
 *                    \-- data is Product
 */
export const useUpdate = <
  RecordType extends BasicRecord = any,
  MutationError = unknown
>(
  resource?: string,
  params: Partial<UpdateParams<RecordType>> = {},
  options: UseUpdateOptions<RecordType, MutationError> = {}
): UseUpdateResult<RecordType, boolean, MutationError> => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const contextResource = useResourceContext();
  const { id, data, meta } = params;
  const { ...reactMutationOptions } = options;
  const paramsRef = useRef<Partial<UpdateParams<RecordType>>>(params);
  const snapshot = useRef<Snapshot>([]);

  const updateCache = ({
    resource,
    id,
    data,
  }: {
    resource: string;
    id: Identifier;
    data: BasicRecord;
  }) => {
    const now = Date.now();
    const updatedAt = now;

    const updateColl = (old: RecordType[]): RecordType[] => {
      if (!old) return [];
      const index = old.findIndex((record) => record.id == id);
      if (index === -1) {
        return old;
      }
      return [
        ...old.slice(0, index),
        { ...old[index], ...data },
        ...old.slice(index + 1),
      ] as RecordType[];
    };

    type GetListResult = Omit<OriginalGetListResult<RecordType>, 'data'> & {
      data?: RecordType[];
    };

    queryClient.setQueryData(
      [resource, 'getOne', { id: String(id), meta }],
      (record: RecordType | undefined): any => ({ ...record, ...data }),
      { updatedAt }
    );
    queryClient.setQueriesData(
      [resource, 'getList'],
      (res: GetListResult | undefined) =>
        res && res.data ? { ...res, data: updateColl(res.data) } : res,
      { updatedAt }
    );
    queryClient.setQueriesData<RecordType[]>(
      [resource, 'getMany'],
      (coll) => (coll && coll.length > 0 ? updateColl(coll) : coll),
      { updatedAt }
    );
    queryClient.setQueriesData(
      [resource, 'getManyReference'],
      (res: GetListResult | undefined) =>
        res && res.data
          ? { data: updateColl(res.data), total: res.total }
          : res,
      { updatedAt }
    );
  };

  const mutation = useMutation<
    RecordType,
    MutationError,
    Partial<UseUpdateMutateParams<RecordType>>
  >({
    mutationFn: ({
      resource: callTimeResource = resource ?? contextResource,
      id: callTimeId = paramsRef.current.id,
      data: callTimeData = paramsRef.current.data,
      meta: callTimeMeta = paramsRef.current.meta,
      previousData: callTimePreviousData = paramsRef.current.previousData,
    } = {}): Promise<RecordType> =>
      dataProvider
        .update<RecordType>(callTimeResource, {
          id: callTimeId!,
          data: callTimeData!,
          previousData: callTimePreviousData,
          meta: callTimeMeta,
        })
        .then(({ data }) => data),
    ...(reactMutationOptions as any),
    onMutate: async (variables: Partial<UseUpdateMutateParams<RecordType>>) => {
      if (reactMutationOptions.onMutate) {
        const userContext: Record<string, any> =
          (await reactMutationOptions.onMutate(variables)) || {};
        return {
          snapshot: snapshot.current,
          ...userContext,
        };
      } else {
        // Return a context object with the snapshot value
        return { snapshot: snapshot.current };
      }
    },
    onError: (
      error: MutationError,
      variables: Partial<UseUpdateMutateParams<RecordType>> = {},
      context: { snapshot: Snapshot }
    ) => {
      if (reactMutationOptions.onError) {
        return reactMutationOptions.onError(error, variables, context);
      }
      // call-time error callback is executed by react-query
    },
    onSuccess: (
      data: RecordType,
      variables: Partial<UseUpdateMutateParams<RecordType>> = {},
      context: unknown
    ) => {
      // update the getOne and getList query cache with the new result
      const {
        resource: callTimeResource = resource ?? contextResource,
        id: callTimeId = id,
      } = variables;
      updateCache({
        resource: callTimeResource,
        id: callTimeId!,
        data,
      });

      if (reactMutationOptions.onSuccess) {
        reactMutationOptions.onSuccess(data, variables, context);
      }
    },
    onSettled: (
      data: RecordType,
      error: MutationError,
      variables: Partial<UseUpdateMutateParams<RecordType>> = {},
      context: { snapshot: Snapshot }
    ) => {
      if (reactMutationOptions.onSettled) {
        return reactMutationOptions.onSettled(data, error, variables, context);
      }
    },
  });

  const update = async (
    callTimeResource: string = resource ?? contextResource,
    callTimeParams: Partial<UpdateParams<RecordType>> = {},
    updateOptions: MutateOptions<
      RecordType,
      MutationError,
      Partial<UseUpdateMutateParams<RecordType>>,
      unknown
    > = {}
  ) => {
    const { onSuccess, onSettled, onError } = updateOptions;

    // store the hook time params *at the moment of the call*
    // because they may change afterwards, which would break the undoable mode
    // as the previousData would be overwritten by the optimistic update
    paramsRef.current = params;

    return mutation.mutateAsync(
      { resource: callTimeResource, ...callTimeParams },
      { onSuccess, onSettled, onError }
    );
  };

  return [useEvent(update), mutation];
};

type Snapshot = [key: QueryKey, value: any][];

export interface UseUpdateMutateParams<RecordType extends BasicRecord = any> {
  resource?: string;
  id?: RecordType['id'];
  data?: Partial<RecordType>;
  previousData?: any;
  meta?: any;
}

export type UseUpdateOptions<
  RecordType extends BasicRecord = any,
  MutationError = unknown
> = UseMutationOptions<
  RecordType,
  MutationError,
  Partial<UseUpdateMutateParams<RecordType>>
>;

export type UseUpdateResult<
  RecordType extends BasicRecord = any,
  TReturnPromise extends boolean = boolean,
  MutationError = unknown
> = [
  (
    resource?: string,
    params?: Partial<UpdateParams<RecordType>>,
    options?: MutateOptions<
      RecordType,
      MutationError,
      Partial<UseUpdateMutateParams<RecordType>>,
      unknown
    >
  ) => Promise<TReturnPromise extends true ? RecordType : void>,
  UseMutationResult<
    RecordType,
    MutationError,
    Partial<UpdateParams<RecordType> & { resource?: string }>,
    unknown
  >
];
