import {
  createTextField,
  jsonServerProvider,
  ListTable,
  ReactQueryDevtools,
  Resource,
  Tushan,
} from 'tushan';
import { IconImage, IconMessage, IconUser } from 'tushan/icon';
import { authProvider } from './auth';
import { comments, photoFields, userFields } from './fields';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
  return (
    <Tushan
      basename="/"
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="users"
        label="User"
        icon={<IconUser />}
        list={
          <ListTable
            filter={[
              createTextField('q', {
                label: 'Search',
                edit: {
                  placeholder: 'Search name...',
                },
              }),
            ]}
            fields={userFields}
            action={{ create: true, detail: true, edit: true, delete: true }}
          />
        }
      />

      <Resource
        name="photos"
        icon={<IconImage />}
        list={
          <ListTable
            fields={photoFields}
            action={{ detail: true, edit: true, delete: true }}
          />
        }
      />

      <Resource
        name="comments"
        icon={<IconMessage />}
        list={
          <ListTable
            fields={comments}
            action={{ detail: true, edit: true, delete: true }}
          />
        }
      />

      {/* <ReactQueryDevtools /> */}
    </Tushan>
  );
}

export default App;
