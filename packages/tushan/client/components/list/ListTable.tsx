import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Dropdown,
  Menu,
  Space,
  Table,
  Tooltip,
} from '@arco-design/web-react';
import { useResourceContext } from '../../context/resource';
import { GetListParams, SortPayload, useGetList } from '../../api';
import {
  IconEdit,
  IconEye,
  IconMoreVertical,
} from '@arco-design/web-react/icon';
import type { FieldHandler } from '../fields';
import { useListTableDrawer } from './ListTableDrawer';
import { ListDeleteAction } from './actions/DeleteAction';
import styled from 'styled-components';
import { useObjectState } from '../../hooks/useObjectState';
import { useDebounce } from '../../hooks/useDebounce';
import { ListFilter } from './ListFilter';
import { ViewTypeContextProvider } from '../../context/viewtype';
import { ListParamsContextProvider, ListTableContextProvider } from './context';
import { ListExportAction } from './actions/ExportAction';
import { useTranslation } from 'react-i18next';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export interface ListTableCustomAction {
  key: string;
  label: string;
  onClick: (record: any) => void;
}

export interface ListTableProps {
  filter?: FieldHandler[];
  fields: FieldHandler[];
  action?: {
    create?: boolean;
    detail?: boolean;
    edit?: boolean;
    delete?: boolean;
    export?: boolean;
    custom?: ListTableCustomAction[];
  };
}
export const ListTable: React.FC<ListTableProps> = React.memo((props) => {
  const resource = useResourceContext();
  const [filterValues, setFilterValues] = useObjectState({});
  const [sort, setSort] = useState<SortPayload | undefined>(undefined);
  const lazyFilter = useDebounce(filterValues, { wait: 500 });
  const { t } = useTranslation();
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const listParams: Partial<GetListParams> = {
    pagination: {
      page: pageNum,
      perPage: pageSize,
    },
    filter: lazyFilter,
    sort,
  };
  const {
    data: list,
    isLoading,
    total,
    refetch,
  } = useGetList(resource, listParams);
  const action = props.action;
  const { showTableDrawer, drawerEl } = useListTableDrawer(props.fields);
  const filterFields = props.filter ?? [];

  const columns = useMemo(() => {
    const c = [...props.fields]
      .map((fieldHandler) => fieldHandler('list'))
      .filter((item) => !item.hidden)
      .map((item) => item.columnProps);

    if (action) {
      c.push({
        key: 'actions',
        title: t('tushan.list.actions'),
        fixed: 'right',
        render: (val, record) => {
          return (
            <Space>
              {action.detail && (
                <Tooltip content={t('tushan.list.detail')}>
                  <Button
                    icon={<IconEye />}
                    onClick={() => showTableDrawer('detail', record)}
                  />
                </Tooltip>
              )}

              {action.edit && (
                <Tooltip content={t('tushan.list.edit')}>
                  <Button
                    icon={<IconEdit />}
                    onClick={() => showTableDrawer('edit', record)}
                  />
                </Tooltip>
              )}

              {action.delete && <ListDeleteAction record={record} />}

              {action.custom && (
                <Dropdown
                  position="br"
                  trigger="click"
                  droplist={
                    <Menu>
                      {action.custom.map((item) => (
                        <Menu.Item
                          key={item.key}
                          onClick={() => item.onClick(record)}
                        >
                          {item.label}
                        </Menu.Item>
                      ))}
                    </Menu>
                  }
                >
                  <Button icon={<IconMoreVertical />} />
                </Dropdown>
              )}
            </Space>
          );
        },
      });
    }

    return c;
  }, [props.fields, action, t]);

  const hasHeader = filterFields.length > 0 || action?.create === true;

  return (
    <ViewTypeContextProvider viewType="list">
      <ListTableContextProvider value={{ list, total, refetch }}>
        <ListParamsContextProvider value={listParams}>
          <Card>
            <Header>
              <div>
                <ListFilter
                  fields={filterFields}
                  filterValues={filterValues}
                  onChangeFilter={(values) => setFilterValues(values)}
                />
              </div>
              <div>
                <Space>
                  {action?.export && <ListExportAction />}

                  {action?.create && (
                    <Button
                      type="primary"
                      onClick={() => {
                        showTableDrawer('edit', null);
                      }}
                    >
                      {t('tushan.list.create')}
                    </Button>
                  )}
                </Space>
              </div>
            </Header>

            {hasHeader && <Divider />}

            <Table
              loading={isLoading}
              columns={columns}
              data={list}
              rowKey="id"
              pagination={{
                total,
                current: pageNum,
                pageSize,
                onChange: (pageNum, pageSize) => {
                  setPageNum(pageNum);
                  setPageSize(pageSize);
                },
              }}
              onChange={(pagination, sorter) => {
                const { field, direction } = sorter;

                if (field && direction) {
                  setSort({
                    field,
                    order: direction === 'ascend' ? 'ASC' : 'DESC',
                  });
                } else {
                  setSort(undefined);
                }
              }}
            />

            {drawerEl}
          </Card>
        </ListParamsContextProvider>
      </ListTableContextProvider>
    </ViewTypeContextProvider>
  );
});
ListTable.displayName = 'ListTable';
