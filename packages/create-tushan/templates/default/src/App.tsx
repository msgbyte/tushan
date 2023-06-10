import {
  createTextField,
  jsonServerProvider,
  ListTable,
  Resource,
  Tushan,
} from 'tushan';
import { authProvider } from './auth';
import { photoFields, userFields } from './fields';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
  return (
    <Tushan
      basename="/"
      header="My Admin"
      footer="Provide by Tushan"
      // dashboard={
      //   <div>Custom Dashboard, You can pass false to close the dashboard</div>
      // }
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="users"
        label="User"
        list={
          <ListTable
            filter={[
              createTextField('q', {
                label: 'Query',
              }),
            ]}
            fields={userFields}
            action=\{{ create: true, detail: true, edit: true, delete: true }}
          />
        }
      />

      <Resource
        name="photos"
        label="Photos"
        list={
          <ListTable
            fields={photoFields}
            action=\{{ detail: true, edit: true, delete: true }}
          />
        }
      />
    </Tushan>
  );
}

export default App;
