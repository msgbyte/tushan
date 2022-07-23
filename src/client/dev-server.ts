import path from 'path';
import { createServer } from 'vite';

/**
 * Vite 开发服务器
 */
export async function createViteServer() {
  const viteServer = await createServer({
    configFile: path.resolve(__dirname, './vite.config.ts'),
  });
  await viteServer.listen(5173);

  console.log('前端开发服务器已启动:');
  viteServer.printUrls();

  return viteServer;
}
