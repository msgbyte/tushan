import path from 'path';
import { createServer, build } from 'vite';

const root = path.resolve(__dirname, './');
const configFile = path.resolve(__dirname, './vite.config.ts');

/**
 * Vite 开发服务器
 */
export async function createViteServer() {
  const viteServer = await createServer({
    root,
    configFile,
    clearScreen: false,
  });
  await viteServer.listen(5173);

  console.log('前端开发服务器已启动:');
  viteServer.printUrls();

  return viteServer;
}

/**
 * 编译代码(正式环境)
 */
export async function buildProduction() {
  console.log('开始编译前端代码...');

  console.time('编译用时');
  await build({
    root,
    configFile,
  });
  console.timeEnd('编译用时');
}
