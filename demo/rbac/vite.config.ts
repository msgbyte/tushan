import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('后台默认密码: tushan/tushan');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 6174, // avoid port conflict for different demo
  },
  plugins: [react()],
});
