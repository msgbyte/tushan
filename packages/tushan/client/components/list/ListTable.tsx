import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Space,
  Table,
  Tooltip,
} from '@arco-design/web-react';
import { useResourceContext } from '../../context/resource';
import { useGetList } from '../../api';
import { IconEdit, IconEye } from '@arco-design/web-react/icon';
import type { FieldHandler } from '../field';
import { useListTableDrawer } from './ListTableDrawer';
import { ListDeleteAction } from './actions/DeleteAction';
import styled from 'styled-components';
import { useObjectState } from '../../hooks/useObjectState';
import { useDebounce } from '../../hooks/useDebounce';
import { ListFilter } from './ListFilter';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export interface ListTableProps {
  filter?: FieldHandler[];
  fields: FieldHandler[];
  action?: {
    create?: boolean;
    detail?: boolean;
    edit?: boolean;
    delete?: boolean;
  };
}
export const ListTable: React.FC<ListTableProps> = React.memo((props) => {
  const resource = useResourceContext();
  const [filterValues, setFilterValues] = useObjectState({});
  const lazyFilter = useDebounce(filterValues, { wait: 500 });
  const { data } = useGetList(resource, { filter: lazyFilter });
  const action = props.action;
  const { showTableDrawer, drawerEl } = useListTableDrawer(props.fields);

  const columns = useMemo(() => {
    const c = [...props.fields].map((fieldHandler) => fieldHandler('list'));

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

              {action.delete && <ListDeleteAction record={record} />}
            </Space>
          );
        },
      });
    }

    return c;
  }, [props.fields, action]);

  return (
    <Card>
      <Header>
        <div>
          <ListFilter
            fields={props.filter ?? []}
            filterValues={filterValues}
            onChangeFilter={(values) => setFilterValues(values)}
          />
        </div>
        <div>
          {action?.create && (
            <Button
              type="primary"
              onClick={() => {
                showTableDrawer('edit', null);
              }}
            >
              Create
            </Button>
          )}
        </div>
      </Header>

      <Divider />

      <Table columns={columns} data={data} rowKey="id" />

      {drawerEl}
    </Card>
  );
});
ListTable.displayName = 'ListTable';
