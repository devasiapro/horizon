import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    watch: false
  },
  plugins: [
    laravel({
      input: [
        'resources/sass/app.scss',
        'resources/js/app.js',
        'resources/js/main.jsx',
      ],
      refresh: true,
    }),
    react(),
  ],
  server: {
    hmr: {
        host: 'localhost',
    }
  }
});
