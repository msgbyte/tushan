import {
  createAuthHttpClient,
  jsonServerProvider,
  ListTable,
  Resource,
  Tushan,
} from 'tushan';
import { authProvider } from './auth';
import { bucketFields } from './fields';

const httpClient = createAuthHttpClient();

const dataProvider = jsonServerProvider('/api', httpClient);

function App() {
  return (
    <Tushan
      basename="/"
      header="Minio Viewer"
      footer="Provide by Tushan"
      dashboard={false}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="buckets"
        label="Buckets"
        list={<ListTable fields={bucketFields} />}
      />
    </Tushan>
  );
}

export default App;
