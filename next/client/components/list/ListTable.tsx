import React, { useMemo, useState } from 'react';
import { Button, Space, Table, Tooltip } from '@arco-design/web-react';
import { useResourceContext } from '../../context/resource';
import { useGetList } from '../../api';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import { FieldHandler } from '../field';
import { ListTableDrawer, useListTableDrawer } from './ListTableDrawer';

export interface ListTableProps {
  fields: FieldHandler[];
  action?: {
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
        render: (val, record) => {
          return (
            <Space>
              {action.edit && (
                <Tooltip content="Edit">
                  <Button
                    icon={<IconEdit />}
                    onClick={() => showTableDrawer('edit')}
                  />
                </Tooltip>
              )}

              {action.delete && (
                <Tooltip content="Delete">
                  <Button icon={<IconDelete />} />
                </Tooltip>
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
