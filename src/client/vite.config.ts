import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vitePluginForArco from '@arco-plugins/vite-react';
import sourceRef from 'rollup-plugin-source-ref';
import { Tushan } from '../Tushan';

// https://cn.vitejs.dev/guide/backend-integration.html
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [
    sourceRef(),
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
      input: {
        main: path.resolve(__dirname, './src/index.tsx'),
        component: path.resolve(Tushan.getCacheDir(), './tushan-components.js'),
      },
      output: {
        dir: path.resolve(__dirname, './public/scripts'),
      },
    },
  },
});
