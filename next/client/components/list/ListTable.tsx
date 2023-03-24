import React from 'react';
import { Table, TableColumnProps } from '@arco-design/web-react';
import { useResourceContext } from '../../context/resource';
import { useGetList } from '../../api';

export interface ListTableProps {
  columns: TableColumnProps[];
}
export const ListTable: React.FC<ListTableProps> = React.memo((props) => {
  const resource = useResourceContext();
  const { data } = useGetList(resource);

  return <Table columns={props.columns} data={data} />;
});
ListTable.displayName = 'ListTable';
