import { request } from '../utils';

/**
 * 获取资源列表
 */
export async function login(username: string, password: string) {
  const { data } = await request.post('/api/login', { username, password });

  return data;
}
