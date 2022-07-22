import 'reflect-metadata';
import type { ColumnType } from 'typeorm';

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
export function parseColumnType(columnType: ColumnType): unknown {
  if (columnType === Number) {
    return 'number';
  }

  if (columnType === String) {
    return 'string';
  }

  return 'unknown';
}
