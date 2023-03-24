import {
  jsonServerProvider,
  ListTable,
  ListTableProps,
  Resource,
  Tushan,
} from '../../../index';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const userColumns: ListTableProps['columns'] = [
  {
    dataIndex: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'name',
    title: 'Name',
  },
  {
    dataIndex: 'email',
    title: 'Email',
  },
  {
    dataIndex: 'website',
    title: 'Website',
  },
];

function App() {
  return (
    <Tushan dataProvider={dataProvider}>
      <Resource name="users" list={<ListTable columns={userColumns} />} />
    </Tushan>
  );
}

export default App;
