import 'reflect-metadata';
import type { ColumnType } from 'typeorm';
import type { ResourcePropertyMetaType } from '../shared/types';

export {
  DataSource,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  EntityMetadata,
} from 'typeorm';

/**
 * 解析类型成字段
 */
export function parseColumnType(
  columnType: ColumnType
): ResourcePropertyMetaType {
  if (columnType === Number) {
    return 'number';
  }

  if (columnType === String) {
    return 'string';
  }

  return 'unknown';
}
