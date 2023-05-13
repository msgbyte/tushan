import { FieldValidator } from './types';

const strongPasswordRE = /^^[a-zA-Z]\w{5,17}$$/;

export const strongPasswordValidator: FieldValidator = (value, cb) => {
  if (typeof value === 'string') {
    if (strongPasswordRE.test(value)) {
      cb();
    } else {
      cb(
        'Password must be start with a letter, the length is between 6 and 18, and it can only contain letters, numbers and underscores'
      );
    }
  } else {
    cb(`value type must be string, now: ${typeof value}`);
  }
};
