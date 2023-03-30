import {
  createTextField,
  jsonServerProvider,
  ListTable,
  ListTableProps,
  Resource,
  Tushan,
} from '../../../index';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
  return (
    <Tushan dataProvider={dataProvider}>
      <Resource
        name="users"
        label="User"
        list={
          <ListTable
            fields={[
              createTextField('id', {
                label: 'ID',
              }),
              createTextField('name', {
                label: 'Name',
              }),
              createTextField('email', {
                label: 'Email',
              }),
              createTextField('website', {
                label: 'Website',
              }),
            ]}
            action={{ edit: true, delete: true }}
          />
        }
      />
    </Tushan>
  );
}

export default App;
