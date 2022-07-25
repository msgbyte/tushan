import { useParams } from 'react-router';

/**
 * 获取当前资源名
 */
export function useResourceName(): string {
  const { resourceName = '' } = useParams();

  return resourceName;
}
