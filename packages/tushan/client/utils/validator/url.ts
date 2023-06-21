import type { FieldValidator } from './types';

const urlRE =
  /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/;

export const urlValidator: FieldValidator = (value, cb) => {
  if (typeof value === 'string') {
    if (urlRE.test(value)) {
      cb();
    } else {
      cb('Not a validate url');
    }
  } else {
    cb(`value type must be string, now: ${typeof value}`);
  }
};
