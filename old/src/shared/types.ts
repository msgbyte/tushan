import type { ColumnType } from 'typeorm';

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

/**
 * 数字类型
 */
const numericType: ColumnType[] = [
  'number',
  'numeric',
  'int',
  'int2',
  'int4',
  'int8',
  'int64',
  Number,
];

const stringifyType: ColumnType[] = [String];

/**
 * 解析类型成字段
 */
export function parseColumnType(
  columnType: ColumnType
): ResourcePropertyMetaType {
  if (numericType.includes(columnType)) {
    return 'number';
  }

  if (stringifyType.includes(columnType)) {
    return 'string';
  }

  return 'unknown';
}

/**
 * 判断数据库类型是否为数字
 */
export function metaTypeIsNumber(columnType: ColumnType) {
  if (parseColumnType(columnType) === 'number') {
    return true;
  }

  return false;
}
