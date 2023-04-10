import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
  MutateOptions,
} from '@tanstack/react-query';
import type { BasicRecord, CreateParams } from './types';
import { useDataProvider } from '../context/tushan';
import { useEvent } from '../hooks/useEvent';

/**
 * Get a callback to call the dataProvider.create() method, the result and the loading state.
 *
 * @param {Object} options Options object to pass to the queryClient.
 * May include side effects to be executed upon success or failure, e.g. { onSuccess: () => { refresh(); } }
 *
 * @typedef Params
 * @prop params.data The record to create, e.g. { title: 'hello, world' }
 *
 * @returns The current mutation state. Destructure as [create, { data, error, isLoading }].
 *
 * The return value updates according to the request state:
 *
 * - initial: [create, { isLoading: false, isIdle: true }]
 * - start:   [create, { isLoading: true }]
 * - success: [create, { data: [data from response], isLoading: false, isSuccess: true }]
 * - error:   [create, { error: [error from response], isLoading: false, isError: true }]
 *
 * The create() function must be called with a resource and a parameter object: create(resource, { data, meta }, options)
 *
 * This hook uses react-query useMutation under the hood.
 * This means the state object contains mutate, isIdle, reset and other react-query methods.
 *
 * @see https://tanstack.com/query/latest/docs/react/reference/useMutation
 *
 * @example // set params when calling the create callback
 *
 * import { useCreate, useRecordContext } from 'react-admin';
 *
 * const LikeButton = () => {
 *     const record = useRecordContext();
 *     const like = { postId: record.id };
 *     const [create, { isLoading, error }] = useCreate();
 *     const handleClick = () => {
 *         create('likes', { data: like })
 *     }
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={isLoading} onClick={handleClick}>Like</button>;
 * };
 *
 * @example // set params when calling the hook
 *
 * import { useCreate, useRecordContext } from 'react-admin';
 *
 * const LikeButton = () => {
 *     const record = useRecordContext();
 *     const like = { postId: record.id };
 *     const [create, { isLoading, error }] = useCreate('likes', { data: like });
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={isLoading} onClick={() => create()}>Like</button>;
 * };
 *
 * @example // TypeScript
 * const [create, { data }] = useCreate<Product>('products', { data: product });
 *                    \-- data is Product
 */
export const useCreate = <
  RecordType extends BasicRecord = any,
  MutationError = unknown
>(
  options: UseCreateOptions<RecordType, MutationError> = {}
): UseCreateResult<RecordType, boolean, MutationError> => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    RecordType,
    MutationError,
    UseCreateMutateParams<RecordType>
  >(
    ({ resource, data, meta }) =>
      dataProvider
        .create<RecordType>(resource, {
          data,
          meta,
        })
        .then(({ data }) => data),
    {
      ...options,
      onSuccess: (
        data: RecordType,
        variables: UseCreateMutateParams<RecordType>,
        context: unknown
      ) => {
        const { resource } = variables;
        queryClient.setQueryData(
          [resource, 'getOne', { id: String(data.id) }],
          data
        );

        if (options.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    }
  );

  const create = (
    resource: string,
    params: CreateParams<RecordType>,
    createOptions: MutateOptions<
      RecordType,
      MutationError,
      UseCreateMutateParams<RecordType>,
      unknown
    > = {}
  ) => {
    return mutation.mutateAsync({ resource, ...params }, createOptions);
  };

  return [useEvent(create), mutation];
};

export interface UseCreateMutateParams<RecordType extends BasicRecord = any> {
  resource: string;
  data: Partial<RecordType>;
  meta?: any;
}

export type UseCreateOptions<
  RecordType extends BasicRecord = any,
  MutationError = unknown
> = UseMutationOptions<
  RecordType,
  MutationError,
  UseCreateMutateParams<RecordType>
> & { returnPromise?: boolean };

export type UseCreateResult<
  RecordType extends BasicRecord = any,
  TReturnPromise extends boolean = boolean,
  MutationError = unknown
> = [
  (
    resource: string,
    params: CreateParams<RecordType>,
    options?: MutateOptions<
      RecordType,
      MutationError,
      UseCreateMutateParams<RecordType>,
      unknown
    > & { returnPromise?: TReturnPromise }
  ) => Promise<TReturnPromise extends true ? RecordType : void>,
  UseMutationResult<
    RecordType,
    MutationError,
    UseCreateMutateParams<RecordType>,
    unknown
  >
];
