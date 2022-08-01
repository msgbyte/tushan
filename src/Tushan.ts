import fs from 'fs';
import path from 'path';
import type { DataSourceOptions } from 'typeorm';
import { createViteServer } from './client/dev-server';
import { DataSource, EntityMetadata } from './server/orm';
import type { TushanOptions, TushanResource } from './types';

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);
export const VERSION = pkg.version;

export class Tushan {
  /**
   * 用于覆盖的全局变量
   */
  static get customComponents(): Record<string, any> {
    return (global as any)['__TushanCustomComponents'] ?? {};
  }
  static set customComponents(val: {}) {
    (global as any)['__TushanCustomComponents'] = val;
  }

  /**
   * 类似于require, 用于告知 Tushan 想要覆写的前端组件的引用
   * @param fullpath 完整路径
   * @returns 返回组件唯一id
   */
  static require(fullpath: string): string {
    const componentId = `Tushan#${
      Object.entries(Tushan.customComponents).length
    }`;
    if (!path.isAbsolute(fullpath)) {
      throw new Error('Please input full path: ' + fullpath);
    }

    if (!fs.existsSync(fullpath)) {
      throw new Error('File not exist: ' + fullpath);
    }

    Tushan.customComponents[componentId] = fullpath;

    return componentId;
  }

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

  get env(): 'development' | 'production' {
    return process.env.NODE_ENV === 'production' ? 'production' : 'development';
  }

  /**
   * 初始化
   */
  async initialize() {
    await this.datasource.initialize();

    if (this.env === 'development') {
      createViteServer();
    }
  }
}
