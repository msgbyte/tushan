import type { Tushan } from '../Tushan';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { getDefaultViewType } from '../shared/viewType';
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import koaSend from 'koa-send';
import { metaTypeIsNumber, parseColumnType } from '../shared/types';
import { AuthInfo, useAuth } from './auth';
import type Koa from 'koa';

const template = fs.readFileSync(
  path.resolve(__dirname, '../client/index.html'),
  'utf-8'
);

interface ViteManifest {
  isEntry?: boolean;
  file: string;
  css?: string[];
}

interface BuildRouterOptions {
  /**
   * 涂山实例
   */
  tushan: Tushan;

  /**
   * @default 默认为 `/admin`
   */
  prefix?: string;

  /**
   * 是否开启校验
   * 如果开启则需要 app 安装 koa-session 以确保能够存储用户登录状态
   */
  auth?: AuthInfo | false;
}

export async function buildRouter(options: BuildRouterOptions) {
  const { tushan, prefix = '/admin' } = options;

  const router = new Router({
    prefix,
  });

  // 静态文件代理
  router.use(async (ctx, next) => {
    try {
      const root = path.resolve(__dirname, '../client/public');
      const _path = ctx.path.replace(prefix, '');
      if (_path === '/') {
        throw new Error();
      }

      await koaSend(ctx, _path, {
        root,
        immutable: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      });
    } catch (err) {
      // 如果没有命中文件，则继续往下走
      await next();
    }
  });

  router.use(bodyParser());

  if (options.auth) {
    useAuth(router, options.auth);
  }

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
    router.get(`/api/resource/${resourceName}/list`, async (ctx) => {
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
    router.put(`/api/resource/${resourceName}/add`, (ctx) => {
      const body = ctx.request.body;

      const primaryPropertyNames = metadata.columns
        .filter((col) => col.isPrimary)
        .map((col) => col.propertyName);

      const entity = tushan.datasource.manager.create(
        metadata.target,
        _.omit(body, [...primaryPropertyNames])
      );

      return tushan.datasource.manager.save(entity);
    });

    // 编辑
    router.patch(`/api/resource/${resourceName}/patch`, async (ctx) => {
      const body = ctx.request.body;

      const primaryPropertyNames = metadata.columns
        .filter((col) => col.isPrimary)
        .map((col) => col.propertyName);

      if (primaryPropertyNames.length === 0) {
        throw new Error('该实体没有主键');
      }

      const primary = primaryPropertyNames[0];

      const entity = await tushan.datasource.manager.findOne(metadata.target, {
        where: {
          [primary]: body[primary],
        },
      });
      if (!entity) {
        throw new Error('Not found');
      }
      Object.assign(entity, _.omit(body, [primary]));

      return tushan.datasource.manager.save(entity);
    });

    // 删除
    router.delete(
      `/api/resource/${resourceName}/:primaryValue`,
      async (ctx) => {
        const primaryProperties = metadata.columns.filter(
          (col) => col.isPrimary
        );

        if (primaryProperties.length === 0) {
          throw new Error('该实体没有主键');
        }

        const primaryValue = metaTypeIsNumber(primaryProperties[0].type)
          ? Number(ctx.params['primaryValue'])
          : ctx.params['primaryValue'];

        await tushan.datasource.manager.delete(metadata.target, primaryValue);

        return true;
      }
    );

    // 列元信息
    router.get(`/api/meta/${resourceName}/properties`, (ctx) => {
      return metadata.columns.map((col) => {
        const type = parseColumnType(col.type);

        return {
          name: col.propertyName,
          default: col.default,
          type,
          viewType: getDefaultViewType(type),
          isPrimary: col.isPrimary || col.isObjectId,
          isNullable: col.isNullable,
        };
      });
    });
  });

  // 列出所有元信息
  router.get(`/api/meta/all`, (ctx) => {
    const list = tushan.resources.map((resource) => {
      const metadata = tushan.datasource.getMetadata(resource.entity);
      const name = metadata.name.toLowerCase();

      return {
        resourceLabel: resource.options.label ?? name,
        resourceName: name,
      };
    });

    return {
      list,
    };
  });

  router.get('/(.*)', async (ctx) => {
    // 首页
    if (tushan.env === 'development') {
      // 开发环境
      const manifest: { url: string; inputs: Record<string, string> } =
        await fs.readJson(
          path.resolve(__dirname, '../client/public/scripts/manifest.dev.json')
        );
      ctx.body = template.replace(
        '<!--SCRIPTS-SLOT-->',
        `
<script type="module">
  import RefreshRuntime from '//localhost:5173/@react-refresh'
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
</script>
<script type="module" src="//localhost:5173/@vite/client"></script>
${Object.entries(manifest.inputs)
  .map(
    ([, path]) => `<script type="module" src="${manifest.url}${path}"></script>`
  )
  .join('\n')}
`
      );
    } else {
      // 生产环境
      const manifest: Record<string, ViteManifest> = await fs.readJson(
        path.resolve(__dirname, '../client/public/scripts/manifest.json')
      );
      ctx.body = template.replace(
        '<!--SCRIPTS-SLOT-->',
        `${Object.entries(manifest)
          .filter(([, item]) => item.isEntry === true)
          .map(([, item]) => {
            let text = `<script type="module" src="${prefix}/scripts/${item.file}"></script>`;

            if (item.css) {
              text += item.css
                .map(
                  (c) =>
                    `<link rel="stylesheet" href="${prefix}/scripts/${c}" />`
                )
                .join('\n');
            }

            return text;
          })
          .join('\n')}
        `
      );
    }
  });

  return router;
}
