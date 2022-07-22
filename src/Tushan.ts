import fs from 'fs';
import path from 'path';
import type { DataSource, EntityMetadata } from './orm';
import type { TushanOptions } from './types';

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);
export const VERSION = pkg.version;

export class Tushan {
  constructor(public options: TushanOptions) {}

  get datasource(): DataSource {
    return this.options.datasource;
  }

  get entityMetadatas(): EntityMetadata[] {
    return this.datasource.entityMetadatas;
  }

  /**
   * 初始化
   */
  async initialize() {
    await this.options.datasource.initialize();
  }
}
