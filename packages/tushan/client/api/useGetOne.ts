import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useDataProvider } from '../context/tushan';
import type { GetOneParams, BasicRecord } from './types';

export function useGetOne<RecordType extends BasicRecord = any>(
  resource: string,
  { id, meta }: GetOneParams<RecordType>,
  options?: UseQueryOptions<RecordType>
): UseGetOneHookValue<RecordType> {
  const dataProvider = useDataProvider();
  return useQuery<RecordType, unknown, RecordType>(
    // Sometimes the id comes as a string (e.g. when read from the URL in a Show view).
    // Sometimes the id comes as a number (e.g. when read from a Record in useGetList response).
    // As the react-query cache is type-sensitive, we always stringify the identifier to get a match
    [resource, 'getOne', { id: String(id), meta }],
    () =>
      dataProvider
        .getOne<RecordType>(resource, { id, meta })
        .then(({ data }) => data),
    options
  );
}

export type UseGetOneHookValue<RecordType extends BasicRecord = any> =
  UseQueryResult<RecordType>;
