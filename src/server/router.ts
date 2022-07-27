import type { Tushan } from '../Tushan';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { parseColumnType } from './orm';

import fs from 'fs';
import path from 'path';

interface BuildRouterOptions {
  /**
   * 涂山实例
   */
  tushan: Tushan;
  /**
   * @default 默认为 `/admin`
   */
  prefix?: string;
}
export async function buildRouter(options: BuildRouterOptions) {
  const { tushan, prefix = '/admin' } = options;
  const router = new Router({
    prefix,
  });

  router.use(bodyParser());

  router.use(async (ctx, next) => {
    try {
      const ret = await next();

      if (ret) {
        if (Array.isArray(ret)) {
          ctx.body = {
            list: ret,
          };
        } else {
          ctx.body = {
            ...ret,
          };
        }
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: String(err),
      };
      console.error(err);
    }

    if (
      typeof ctx.body === 'object' &&
      ctx.request.accepts().includes('text/html')
    ) {
      // 如果是网页，则返回值美化一下
      ctx.body = JSON.stringify(ctx.body, null, 2);
    }
  });

  tushan.resources.map((resource) => {
    const metadata = tushan.datasource.getMetadata(resource.entity);
    const resourceName = metadata.name.toLowerCase();
    console.log('Register Resource:', resourceName);

    // 列表
    router.get(`/resource/${resourceName}/list`, async (ctx) => {
      const order = resource.options.order
        ? {
            [resource.options.order.orderBy]: resource.options.order.direction,
          }
        : undefined;

      const [list, count] = await tushan.datasource.manager.findAndCount(
        metadata.target,
        {
          take: resource.options.limit ?? 20,
          order,
        }
      );
      return {
        list,
        count,
      };
    });

    // 新增
    router.post(`/resource/${resourceName}/add`, (ctx) => {
      const body = ctx.request.body;

      const entity = tushan.datasource.manager.create(metadata.target, {
        ...body,
      });

      return tushan.datasource.manager.save(entity);
    });

    // 列元信息
    router.get(`/meta/${resourceName}/properties`, (ctx) => {
      return metadata.columns.map((col) => ({
        name: col.propertyName,
        default: col.default,
        type: parseColumnType(col.type),
        isPrimary: col.isPrimary || col.isObjectId,
        isNullable: col.isNullable,
      }));
    });
  });

  // 列出所有元信息
  router.get(`/meta/all`, (ctx) => {
    return tushan.resources.map((resource) => {
      const metadata = tushan.datasource.getMetadata(resource.entity);

      return {
        resourceName: metadata.name.toLowerCase(),
      };
    });
  });

  router.get('/(.*)', async (ctx) => {
    // 首页
    let template = fs.readFileSync(
      path.resolve(__dirname, '../client/index.html'),
      'utf-8'
    );

    if (tushan.env === 'development') {
      ctx.body = template.replace(
        '<!--SCRIPTS-SLOT-->',
        `
<script type="module">
  import RefreshRuntime from 'http://localhost:5173/@react-refresh'
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
</script>
<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module" src="http://localhost:5173/src/index.tsx"></script>
      `
      );
    } else {
      console.log('TODO');
      ctx.body = template;
    }
  });

  return router;
}
