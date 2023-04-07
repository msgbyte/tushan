import { request } from '../utils';

/**
 * 新增 记录
 */
export async function addResource(
  resourceName: string,
  resourceData: Record<string, any>
): Promise<void> {
  await request.put(`/api/resource/${resourceName}/add`, {
    ...resourceData,
  });
}

/**
 * 编辑 记录
 */
export async function patchResource(
  resourceName: string,
  resourceData: Record<string, any>
): Promise<void> {
  await request.patch(`/api/resource/${resourceName}/patch`, {
    ...resourceData,
  });
}

/**
 * 删除 记录
 */
export async function deleteResource(
  resourceName: string,
  resourcePrimaryValue: any
): Promise<void> {
  await request.delete(`/api/resource/${resourceName}/${resourcePrimaryValue}`);
}
