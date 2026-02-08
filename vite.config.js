import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.resolve(__dirname, './src');

export default defineConfig({
  plugins: [react()],
  base: '/e-commerce/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': srcPath,
      '@components': path.join(srcPath, 'components'),
      '@assets': path.join(srcPath, 'assets'),
      '@styles': path.join(srcPath, 'styles'),
      '@hooks': path.join(srcPath, 'hooks'),
      '@utils': path.join(srcPath, 'utils'),
      '@context': path.join(srcPath, 'context'),
      '@layouts': path.join(srcPath, 'layouts'),
      '@pages': path.join(srcPath, 'pages'),
      '@data': path.join(srcPath, 'data'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [path.join(srcPath, 'styles')],
        additionalData: `@use "abstracts" as *;\n`,
      },
    },
  },
});
