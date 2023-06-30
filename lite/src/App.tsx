import {
  createAuthHttpClient,
  createAuthProvider,
  fetchJSON,
  jsonServerProvider,
  ListTable,
  ReactQueryDevtools,
  Resource,
  Tushan,
  useAsync,
} from 'tushan';
import { TushanLiteConfig } from './types';
import qs from 'qs';
import { createFields } from './fields';

const storageKey = 'tushan.lite.config';

function App() {
  const {
    error,
    value: config,
    loading,
  } = useAsync(async () => {
    const query = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    const configUrl =
      (query.config as string) ?? window.sessionStorage.getItem(storageKey);
    if (!configUrl) {
      throw new Error('Please set `?config=<url>` in url');
    }

    window.sessionStorage.setItem(storageKey, configUrl);
    const { json: config } = await fetchJSON(configUrl);

    return config as TushanLiteConfig;
  });

  if (loading) {
    return <div>Loading Config...</div>;
  }

  if (!config || error) {
    return <div>Cannot loading config: {String(error)}</div>;
  }

  return (
    <Tushan
      basename="/"
      header={config.header}
      footer={config.footer}
      dashboard={false}
      dataProvider={jsonServerProvider(
        config.dataProvider.url,
        createAuthHttpClient()
      )}
      authProvider={
        config.authProvider &&
        createAuthProvider({
          loginUrl: config.authProvider.loginUrl,
        })
      }
    >
      {config.resources.map((resource) => (
        <Resource
          key={resource.name}
          name={resource.name}
          label={resource.label}
          list={
            <ListTable
              filter={createFields(resource.filter ?? [])}
              fields={createFields(resource.fields)}
              action={resource.action}
            />
          }
        />
      ))}

      {config.debug && <ReactQueryDevtools />}
    </Tushan>
  );
}

export default App;
