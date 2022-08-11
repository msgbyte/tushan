import {
  Button,
  Popconfirm,
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
import { useAsyncRequest } from '../../model/utils';
import { deleteResource } from '../../model/resource/edit';

interface TushanTableProps {}
export const TushanTable: React.FC<TushanTableProps> = React.memo((props) => {
  const resourceName = useResourceName();
  const {
    init,
    data,
    loading: resourceLoading,
    pagination,
    refresh,
  } = useTableStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { showEditDrawer } = useTableStore();

  useEffect(() => {
    init(resourceName);
  }, [resourceName]);

  const { resourceMeta, loading: metaLoading } =
    useResourcePropertiesMeta(resourceName);

  const [, handleDelete] = useAsyncRequest(async (record: any) => {
    await deleteResource(resourceName, record[resourceMeta.primaryName]);
    refresh();
  });

  const columns = useMemo<TableColumnProps[]>(() => {
    return [
      ...resourceMeta.properties.map((m) => ({
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
              <Popconfirm
                title="确认要删除该条记录吗?"
                onOk={() => handleDelete(record)}
              >
                <Button type="text" status="danger" icon={<IconDelete />} />
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
  }, [resourceMeta.properties]);

  if (metaLoading) {
    return <Spin />;
  }

  return (
    <div ref={containerRef}>
      <TushanTableController />
      <Table
        loading={resourceLoading}
        columns={columns}
        data={data}
        pagination={pagination}
      />
      <TableDrawer />
    </div>
  );
});
TushanTable.displayName = 'TushanTable';
