import { request } from '../utils';

/**
 * 新增 记录
 */
export async function addResource(
  resourceName: string,
  resourceData: Record<string, any>
): Promise<void> {
  await request.put(`/resource/${resourceName}/add`, {
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
  await request.patch(`/resource/${resourceName}/patch`, {
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
  await request.delete(`/resource/${resourceName}/${resourcePrimaryValue}`);
}
