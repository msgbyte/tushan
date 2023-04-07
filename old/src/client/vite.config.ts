import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vitePluginForArco from '@arco-plugins/vite-react';
import sourceRef from 'rollup-plugin-source-ref';
import { Tushan } from '../Tushan';
import { devManifestPlugin } from './plugins/dev-manifest';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://cn.vitejs.dev/guide/backend-integration.html
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  optimizeDeps: {
    // 这些依赖可能会因为某些原因(比如pnpm是软连接)而不会被编译成esm，因此需要手动强制指定一下
    // https://cn.vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
    include: ['axios', 'use-sync-external-store/shim/with-selector.js'],
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          config: path.resolve(__dirname, './tailwind.config.js'),
        }),
        autoprefixer(),
      ],
    },
  },
  plugins: [
    sourceRef(),
    vitePluginForArco({
      style: 'css',
    }),
    devManifestPlugin(),
    react(),
  ],
  build: {
    // 在 outDir 中生成 manifest.json
    manifest: true,
    outDir: './public/scripts',
    rollupOptions: {
      // 覆盖默认的 .html 入口
      input: {
        component: path.resolve(Tushan.getCacheDir(), './tushan-components.js'), // make sure custom components loading first
        main: path.resolve(__dirname, './src/index.tsx'),
      },
    },
  },
});
