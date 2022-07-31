import { Spin, Table, TableColumnProps } from '@arco-design/web-react';
import React, { useEffect, useMemo } from 'react';
import { useResourcePropertiesMeta } from '../../model/resource/meta';
import { useResourceName } from '../../router/hooks';
import { TushanTableController } from './controller';
import { useTableStore } from './store';

interface TushanTableProps {}
export const TushanTable: React.FC<TushanTableProps> = React.memo((props) => {
  const resourceName = useResourceName();
  const { init, data, loading: resourceLoading, pagination } = useTableStore();
  useEffect(() => {
    init(resourceName);
  }, [resourceName]);

  const { data: meta, loading: metaLoading } =
    useResourcePropertiesMeta(resourceName);

  const columns = useMemo<TableColumnProps[]>(() => {
    return meta.map((m) => ({
      title: m.name,
      dataIndex: m.name,
    }));
  }, [meta]);

  if (metaLoading || resourceLoading) {
    return <Spin />;
  }

  return (
    <div>
      <TushanTableController />
      <Table columns={columns} data={data} pagination={pagination} />
    </div>
  );
});
TushanTable.displayName = 'TushanTable';
