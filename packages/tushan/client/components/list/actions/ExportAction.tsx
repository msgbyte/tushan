import { Button } from '@arco-design/web-react';
import React from 'react';
import { BasicRecord, DataProvider, Exporter, Identifier } from '../../../api';
import { defaultFilter, defaultSort } from '../../../api/consts';
import { defaultExporter } from '../../../api/defaultExporter';
import { useResourceContext } from '../../../context/resource';
import { useTushanContext } from '../../../context/tushan';
import { useEvent } from '../../../hooks/useEvent';
import { SubmitButton } from '../../SubmitButton';
import { useListParamsContext } from '../context';

export const ListExportAction: React.FC<{
  maxCount?: number;
  exporter?: Exporter;
}> = React.memo((props) => {
  const { maxCount = 1000, exporter = defaultExporter } = props;
  const resource = useResourceContext();
  const { dataProvider } = useTushanContext();
  const params = useListParamsContext();

  const handleExport = useEvent(async () => {
    if (!dataProvider) {
      console.warn('Not found dataProvider');
      return;
    }

    const list = await dataProvider.getList(resource, {
      sort: params.sort ?? defaultSort,
      filter: params.filter ?? defaultFilter,
      meta: params.meta,
      pagination: {
        page: 1,
        perPage: maxCount,
      },
    });

    exporter(
      list.data,
      fetchRelatedRecords(dataProvider),
      dataProvider,
      resource
    );
  });

  return <SubmitButton onClick={handleExport}>Export</SubmitButton>;
});
ListExportAction.displayName = 'ListExportAction';

function fetchRelatedRecords(dataProvider: DataProvider) {
  return (data: BasicRecord[], field: string, resource: string) =>
    dataProvider
      .getMany(resource, { ids: getRelatedIds(data, field) })
      .then(({ data }) =>
        data.reduce((acc, post) => {
          acc[post.id] = post;
          return acc;
        }, {})
      );
}

function getRelatedIds(records: BasicRecord[], field: string): Identifier[] {
  return Array.from(
    new Set(
      records
        .filter((record) => record[field] != null)
        .map((record) => record[field])
        .reduce((ids, value) => ids.concat(value), [])
    )
  );
}
