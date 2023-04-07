/**
 * 将输入转换成可以显示的输出
 */
export function renderPlain(input: unknown): React.ReactNode {
  if (typeof input === 'function') {
    return '[Function]';
  }

  if (typeof input === 'symbol') {
    return '[Symbol]';
  }
  if (typeof input === 'object') {
    try {
      return JSON.stringify(input);
    } catch (err) {
      return '[Object]';
    }
  }

  return input as any;
}
