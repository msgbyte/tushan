function isValidObject(value: any): value is object {
  if (!value) {
    return false;
  }

  const isArray = Array.isArray(value);
  const isBuffer = typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
  const isObject = Object.prototype.toString.call(value) === '[object Object]';
  const hasKeys = !!Object.keys(value).length;

  return !isArray && !isBuffer && isObject && hasKeys;
}

/**
 * {"foo": {"bar": 1}} => {"foo.bar": 1}
 */
export function flattenObject(value: any, path: string[] = []) {
  if (isValidObject(value)) {
    return Object.assign(
      {},
      ...Object.keys(value).map((key) =>
        flattenObject(value[key], path.concat([key]))
      )
    );
  } else {
    return path.length
      ? {
          [path.join('.')]: value,
        }
      : value;
  }
}
