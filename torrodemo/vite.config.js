import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    watch: false
  },
  plugins: [
    laravel(['resources/js/app.jsx', 'resources/js/play.js']),
    react(),
  ],
  server: {
    hmr: {
        host: 'localhost',
    }
  }
});
