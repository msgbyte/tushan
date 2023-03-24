import { HttpError } from './error';

export interface Options extends RequestInit {
  user?: {
    authenticated?: boolean;
    token?: string;
  };
}

export function createHeadersFromOptions(options: Options): Headers {
  const requestHeaders = (options.headers ||
    new Headers({
      Accept: 'application/json',
    })) as Headers;
  if (
    !requestHeaders.has('Content-Type') &&
    !(options && (!options.method || options.method === 'GET')) &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set('Authorization', options.user.token);
  }

  return requestHeaders;
}

export async function fetchJSON(url: string, options: Options = {}) {
  const requestHeaders = createHeadersFromOptions(options);

  const response = await fetch(url, { ...options, headers: requestHeaders });
  const text = await response.text();

  const { status, statusText, headers, body } = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    body: text,
  };

  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {}

  if (status < 200 || status >= 300) {
    return Promise.reject(
      new HttpError((json && json.message) || statusText, status, json)
    );
  }
  return await Promise.resolve({ status, headers, body, json });
}

export type HTTPClient = typeof fetchJSON;
