import {
  createTextField,
  jsonServerProvider,
  ListTable,
  Resource,
  Tushan,
} from 'tushan';

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
            action={{ detail: true, edit: true, delete: true }}
          />
        }
      />
    </Tushan>
  );
}

export default App;
