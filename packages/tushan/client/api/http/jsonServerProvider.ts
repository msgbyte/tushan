import type { DataProvider } from '../types';
import { fetchJSON, HTTPClient } from './request';
import _jsonServerProvider from 'ra-data-json-server';

export function jsonServerProvider(
  apiUrl: string,
  httpClient: HTTPClient = fetchJSON
): DataProvider {
  // reuse react-admin provider
  return _jsonServerProvider(apiUrl, httpClient);
}
