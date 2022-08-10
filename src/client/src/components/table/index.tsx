import {
  Button,
  Space,
  Spin,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { useResourcePropertiesMeta } from '../../model/resource/meta';
import { useResourceName } from '../../router/hooks';
import { TushanTableController } from './controller';
import { useTableStore } from './store';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import { TableDrawer } from './drawer';

interface TushanTableProps {}
export const TushanTable: React.FC<TushanTableProps> = React.memo((props) => {
  const resourceName = useResourceName();
  const { init, data, loading: resourceLoading, pagination } = useTableStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { showEditDrawer } = useTableStore();

  useEffect(() => {
    init(resourceName);
  }, [resourceName]);

  const { data: meta, loading: metaLoading } =
    useResourcePropertiesMeta(resourceName);

  const columns = useMemo<TableColumnProps[]>(() => {
    return [
      ...meta.map((m) => ({
        title: m.name,
        dataIndex: m.name,
      })),
      {
        title: 'Action',
        render: (_, record) => {
          return (
            <Space size="small">
              <Button
                type="text"
                icon={<IconEdit />}
                onClick={() => showEditDrawer(record)}
              />
              <Button type="text" status="danger" icon={<IconDelete />} />
            </Space>
          );
        },
      },
    ];
  }, [meta]);

  if (metaLoading || resourceLoading) {
    return <Spin />;
  }

  return (
    <div ref={containerRef}>
      <TushanTableController />
      <Table columns={columns} data={data} pagination={pagination} />
      <TableDrawer />
    </div>
  );
});
TushanTable.displayName = 'TushanTable';
