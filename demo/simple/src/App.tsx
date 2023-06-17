import {
  Category,
  createTextField,
  jsonServerProvider,
  ListTable,
  ReactQueryDevtools,
  Resource,
  Tushan,
} from 'tushan';
import {
  IconImage,
  IconMessage,
  IconUnorderedList,
  IconUser,
} from 'tushan/icon';
import { authProvider } from './auth';
import { commentFields, photoFields, todoFields, userFields } from './fields';

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

      <Category name="detail">
        <Resource
          name="comments"
          icon={<IconMessage />}
          list={
            <ListTable
              fields={commentFields}
              action={{ detail: true, edit: true, delete: true }}
              batchAction={{ delete: true }}
            />
          }
        />

        <Resource
          name="todos"
          icon={<IconUnorderedList />}
          list={
            <ListTable
              fields={todoFields}
              action={{ detail: true, edit: true, delete: true }}
            />
          }
        />
      </Category>

      {/* <ReactQueryDevtools /> */}
    </Tushan>
  );
}

export default App;
