import fs from 'fs';
import path from 'path';
import type { DataSourceOptions } from 'typeorm';
import { DataSource, EntityMetadata } from './server/orm';
import type { TushanOptions, TushanResource } from './types';

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);
export const VERSION = pkg.version;

export class Tushan {
  datasource: DataSource;

  constructor(public options: TushanOptions) {
    const { datasourceOptions } = options;
    this.datasource = new DataSource({
      ...datasourceOptions,
      entities: this.resources.map((r) => r.entity),
    } as DataSourceOptions);
  }

  get entityMetadatas(): EntityMetadata[] {
    return this.datasource.entityMetadatas;
  }

  /**
   * 获取资源列表
   */
  get resources(): TushanResource[] {
    return this.options.resources.map((r) =>
      'entity' in r
        ? r
        : {
            entity: r,
            options: {},
          }
    );
  }

  /**
   * 初始化
   */
  async initialize() {
    await this.datasource.initialize();
  }
}
