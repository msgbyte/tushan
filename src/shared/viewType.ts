import type {
  ResourcePropertyMetaType,
  ResourcePropertyMetaViewType,
} from './types';

/**
 * 获取默认视图样式
 * @param metaType 数据库类型
 */
export function getDefaultViewType(
  metaType: ResourcePropertyMetaType
): ResourcePropertyMetaViewType {
  if (metaType === 'string') {
    return 'text';
  }

  if (metaType === 'number') {
    return 'number';
  }

  return 'text';
}
