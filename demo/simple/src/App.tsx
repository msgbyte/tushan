import {
  createAvatarField,
  createEmailField,
  createImageField,
  createTextField,
  createUrlField,
  jsonServerProvider,
  ListTable,
  ReactQueryDevtools,
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
              createEmailField('email', {
                label: 'Email',
              }),
              createUrlField('website', {
                label: 'Website',
              }),
            ]}
            action={{ detail: true, edit: true, delete: true }}
          />
        }
      />

      <Resource
        name="photos"
        label="Photos"
        list={
          <ListTable
            fields={[
              createTextField('id', {
                label: 'ID',
              }),
              createTextField('albumId', {
                label: 'AlbumId',
              }),
              createTextField('title', {
                label: 'Title',
              }),
              createImageField('url', {
                label: 'Url',
                height: 300,
              }),
              createAvatarField('thumbnailUrl', {
                label: 'ThumbnailUrl',
              }),
            ]}
            action={{ detail: true, edit: true, delete: true }}
          />
        }
      />

      <ReactQueryDevtools />
    </Tushan>
  );
}

export default App;
