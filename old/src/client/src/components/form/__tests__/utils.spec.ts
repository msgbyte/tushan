import { getValidateStatus } from '../utils';

describe('getValidateStatus', () => {
  test('enter undefined', () => {
    const status = getValidateStatus(undefined);

    expect(status).toBe('success');
  });

  test('enter empty string', () => {
    const status = getValidateStatus('');

    expect(status).toBe('success');
  });

  test('enter string', () => {
    const status = getValidateStatus('any string');

    expect(status).toBe('error');
  });
});
