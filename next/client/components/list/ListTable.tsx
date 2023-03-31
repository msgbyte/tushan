import React, { useMemo, useState } from 'react';
import {
  Button,
  Message,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from '@arco-design/web-react';
import { useResourceContext } from '../../context/resource';
import { useGetList } from '../../api';
import { IconDelete, IconEdit, IconEye } from '@arco-design/web-react/icon';
import { FieldHandler } from '../field';
import { useListTableDrawer } from './ListTableDrawer';

export interface ListTableProps {
  fields: FieldHandler[];
  action?: {
    detail?: boolean;
    edit?: boolean;
    delete?: boolean;
  };
}
export const ListTable: React.FC<ListTableProps> = React.memo((props) => {
  const resource = useResourceContext();
  const { data } = useGetList(resource);

  const { showTableDrawer, drawerEl } = useListTableDrawer(props.fields);

  const columns = useMemo(() => {
    const c = [...props.fields].map((fieldHandler) => fieldHandler('list'));

    const action = props.action;

    if (action) {
      c.push({
        key: 'actions',
        title: 'Actions',
        fixed: 'right',
        render: (val, record) => {
          return (
            <Space>
              {action.detail && (
                <Tooltip content="Detail">
                  <Button
                    icon={<IconEye />}
                    onClick={() => showTableDrawer('detail', record)}
                  />
                </Tooltip>
              )}

              {action.edit && (
                <Tooltip content="Edit">
                  <Button
                    icon={<IconEdit />}
                    onClick={() => showTableDrawer('edit', record)}
                  />
                </Tooltip>
              )}

              {action.delete && (
                <Popconfirm
                  focusLock
                  position="tr"
                  title="Confirm"
                  content="Are you sure you want to delete?"
                  onOk={() => {
                    Message.info({
                      content: 'ok',
                    });
                  }}
                  onCancel={() => {
                    Message.error({
                      content: 'cancel',
                    });
                  }}
                >
                  <Button icon={<IconDelete />} />
                </Popconfirm>
              )}
            </Space>
          );
        },
      });
    }

    return c;
  }, [props.fields, props.action]);

  return (
    <>
      <Table columns={columns} data={data} />

      {drawerEl}
    </>
  );
});
ListTable.displayName = 'ListTable';
