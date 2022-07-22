import { buildRouter, DataSource, Tushan } from '../src';
import { User } from './entity/User';
import Koa from 'koa';
import path from 'path';

const app = new Koa();

const tushan = new Tushan({
  datasource: new DataSource({
    type: 'sqlite',
    database: path.resolve(__dirname, './db/db.sqlite'),
    entities: [User],
    synchronize: true,
  }),
});

tushan.initialize().then(() => {
  const router = buildRouter(tushan);
  app.use(router.routes()).use(router.allowedMethods());

  app.listen(6789, () => {
    console.log('服务器已启动:', `http://localhost:6789`);
  });
});
