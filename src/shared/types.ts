/**
 * 数据库类型
 *
 * 用于在数据库中管理
 */
export type ResourcePropertyMetaType = 'string' | 'number' | 'unknown';

/**
 * 视图类型
 *
 * 用于前端展示
 */
export type ResourcePropertyMetaViewType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'password'
  | 'select'
  | 'checkbox'
  | 'custom';
