import { buildRouter, Tushan } from '../src/index';
import { User } from './resources/User';
import Koa from 'koa';
import path from 'path';

async function start() {
  const app = new Koa();

  const tushan = new Tushan({
    datasourceOptions: {
      type: 'sqlite',
      database: path.resolve(__dirname, './db/db.sqlite'),
      synchronize: true,
    },
    resources: [
      {
        entity: User,
        options: {
          label: '用户',
        },
      },
    ],
    pages: [
      {
        path: '/page1',
        componentId: Tushan.require(require.resolve('./pages/page1')),
        label: '自定义页面',
      },
    ],
  });

  await tushan.initialize();

  const router = await buildRouter({ tushan });
  app.use(router.routes()).use(router.allowedMethods());

  app.listen(6789, () => {
    console.log('服务器已启动:', `http://localhost:6789/admin/`);
  });
}

start();
