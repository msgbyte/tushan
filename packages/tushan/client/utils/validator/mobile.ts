import { FieldValidator } from './types';

const mobileRE =
  /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

export const mobileValidator: FieldValidator = (value, cb) => {
  if (typeof value === 'string') {
    if (mobileRE.test(value)) {
      cb();
    } else {
      cb('Not a validate mobile number');
    }
  } else {
    cb(`value type must be string, now: ${typeof value}`);
  }
};
