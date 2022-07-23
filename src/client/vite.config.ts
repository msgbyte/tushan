import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vitePluginForArco from '@arco-plugins/vite-react';

// https://cn.vitejs.dev/guide/backend-integration.html
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [
    vitePluginForArco({
      style: 'css',
    }),
    react(),
  ],
  build: {
    // 在 outDir 中生成 manifest.json
    manifest: true,
    rollupOptions: {
      // 覆盖默认的 .html 入口
      input: path.resolve(__dirname, './index.tsx'),
      output: {
        dir: path.resolve(__dirname, './public/scripts'),
      },
    },
  },
});
