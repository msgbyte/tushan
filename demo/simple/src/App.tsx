import {
  jsonServerProvider,
  ListTable,
  ReactQueryDevtools,
  Resource,
  Tushan,
} from 'tushan';
import { photoFields, userFields } from './fields';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
  return (
    <Tushan dataProvider={dataProvider}>
      <Resource
        name="users"
        label="User"
        list={
          <ListTable
            fields={userFields}
            action={{ create: true, detail: true, edit: true, delete: true }}
          />
        }
      />

      <Resource
        name="photos"
        label="Photos"
        list={
          <ListTable
            fields={photoFields}
            action={{ detail: true, edit: true, delete: true }}
          />
        }
      />

      <ReactQueryDevtools />
    </Tushan>
  );
}

export default App;
