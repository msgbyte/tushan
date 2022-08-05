import fs from 'fs-extra';
import path from 'path';
import type { DataSourceOptions } from 'typeorm';
import { buildProduction, createViteServer } from './client/bundler';
import { DataSource, EntityMetadata } from './server/orm';
import type { TushanOptions, TushanResource } from './types';
import findCacheDir from 'find-cache-dir';

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);
export const VERSION = pkg.version;

export class Tushan {
  /**
   * 用于覆盖的全局变量
   */
  static get customComponents(): Record<string, string> {
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
    const componentId = `Tushan${
      Object.entries(Tushan.customComponents).length
    }`;
    if (!path.isAbsolute(fullpath)) {
      throw new Error('Please input full path: ' + fullpath);
    }

    if (!fs.existsSync(fullpath)) {
      throw new Error('File not exist: ' + fullpath);
    }

    Tushan.customComponents = {
      ...Tushan.customComponents,
      [componentId]: fullpath,
    };

    return componentId;
  }

  static getCacheDir(): string {
    const cacheDir = findCacheDir({ name: 'tushan' });
    if (!cacheDir) {
      throw new Error('cannot find package.json file');
    }
    return cacheDir;
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

    await this.buildComponentEntry();

    if (this.env === 'development') {
      await createViteServer();
    } else {
      await buildProduction();
    }
  }

  private async buildComponentEntry() {
    const cacheDir = Tushan.getCacheDir();
    await fs.ensureDir(cacheDir);

    const js = `
${Object.entries(Tushan.customComponents)
  .map(([name, url]) => `import ${name} from '${url.replace(/\\/g, '\\\\')}';`)
  .join('\n')}

window.TushanCustomComponent = {${Object.entries(Tushan.customComponents)
      .map(([name]) => `${name}`)
      .join(',')}}
    `;

    await fs.writeFile(path.resolve(cacheDir, './tushan-components.js'), js);
  }
}
