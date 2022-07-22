import type { Tushan } from './Tushan';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';

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
export function buildRouter(options: BuildRouterOptions) {
  const { tushan, prefix = '/admin' } = options;
  const router = new Router({
    prefix,
  });

  router.use(bodyParser());

  router.use(async (ctx, next) => {
    try {
      const ret = await next();

      if (Array.isArray(ret)) {
        ctx.body = {
          list: ret,
        };
      } else {
        ctx.body = {
          ...ret,
        };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: String(err),
      };
    }

    if (ctx.request.accepts().includes('text/html')) {
      // 如果是网页，则返回值美化一下
      ctx.body = JSON.stringify(ctx.body, null, 2);
    }
  });

  tushan.entityMetadatas.map((metadata) => {
    const resourceName = metadata.name.toLowerCase();
    console.log('Register Resource:', resourceName);

    // 列表
    router.get(`/resources/${resourceName}/list`, async (ctx) => {
      const [list, count] = await tushan.datasource.manager.findAndCount(
        metadata.target,
        {
          take: 20,
        }
      );
      return {
        list,
        count,
      };
    });

    // 新增
    router.post(`/resources/${resourceName}/add`, (ctx) => {
      const body = ctx.request.body;

      const entity = tushan.datasource.manager.create(metadata.target, {
        ...body,
      });

      return tushan.datasource.manager.save(entity);
    });
  });

  return router;
}
