/**
 * 获取校验状态
 */
export function getValidateStatus(
  error: string | undefined
): 'error' | 'success' {
  if (error === undefined || error === '') {
    return 'success';
  } else {
    return 'error';
  }
}
