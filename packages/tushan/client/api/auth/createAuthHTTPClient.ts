import { fetchJSON } from '../http';
import type { Options } from '../http/request';
import { defaultAuthStorageKey } from './const';

export function createAuthHttpClient(
  authStorageKey: string = defaultAuthStorageKey
) {
  const httpClient: typeof fetchJSON = (url: string, options: Options = {}) => {
    try {
      if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
      }
      const { token } = JSON.parse(
        window.localStorage.getItem(authStorageKey) ?? '{}'
      );

      if (options.headers instanceof Headers) {
        options.headers.set('Authorization', `Bearer ${token}`);
      } else {
        (options.headers as Record<string, string>)[
          'Authorization'
        ] = `Bearer ${token}`;
      }

      return fetchJSON(url, options);
    } catch (err) {
      return Promise.reject();
    }
  };

  return httpClient;
}
