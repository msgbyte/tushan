import urlRegex from 'url-regex';

/**
 * Determine whether it is an available url
 */
export function isValidUrl(str: unknown): str is string {
  return typeof str === 'string' && urlRegex({ exact: true }).test(str);
}

export function removeDoubleSlashes(path: string) {
  return path.replace('//', '/');
}
