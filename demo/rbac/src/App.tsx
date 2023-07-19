import {
  Category,
  createTextField,
  jsonServerProvider,
  ListTable,
  Resource,
  Tushan,
} from 'tushan';
import { IconImage, IconUser } from 'tushan/icon';
import { authProvider } from './auth';
import { photoFields, userFields } from './fields';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
  return (
    <Tushan
      basename="/"
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      {({ permissions }) => (
        <>
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
                action={{
                  create: permissions.includes('admin'),
                  detail: true,
                  edit: permissions.includes('admin'),
                  delete: true,
                }}
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
        </>
      )}
    </Tushan>
  );
}

export default App;
