import { Spin, Table, TableColumnProps } from '@arco-design/web-react';
import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { useResourceList } from '../../model/resource/list';
import { useResourcePropertiesMeta } from '../../model/resource/meta';
import { useResourceName } from '../../router/hooks';
import { TushanTableController } from './controller';

interface TushanTableProps {}
export const TushanTable: React.FC<TushanTableProps> = React.memo((props) => {
  const resourceName = useResourceName();

  const { data: meta, loading: metaLoading } =
    useResourcePropertiesMeta(resourceName);
  const { data: resources, loading: resourceLoading } =
    useResourceList(resourceName);

  const columns = useMemo<TableColumnProps[]>(() => {
    return meta.map((m) => ({
      title: m.name,
      dataIndex: m.name,
    }));
  }, [meta]);

  const data = useMemo(() => resources?.list ?? [], [resources]);

  if (metaLoading || resourceLoading) {
    return <Spin />;
  }

  return (
    <div>
      <TushanTableController />
      <Table columns={columns} data={data} />
    </div>
  );
});
TushanTable.displayName = 'TushanTable';
