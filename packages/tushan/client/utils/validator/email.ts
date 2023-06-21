import type { FieldValidator } from './types';

const emailRE = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_\-]+)+$/;

export const emailValidator: FieldValidator = (value, cb) => {
  if (typeof value === 'string') {
    if (emailRE.test(value)) {
      cb();
    } else {
      cb('Not a validate email');
    }
  } else {
    cb(`value type must be string, now: ${typeof value}`);
  }
};
