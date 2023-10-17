// vite.config.js
import { defineConfig } from 'vite';

import {glslify} from 'vite-plugin-glslify'

export default defineConfig({
  server: {
    proxy: {
      '/src/assets/cubeMaps': {
        target: 'http://localhost:5173', // Assuming this is your local server address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/src\/assets\/cubeMaps/, '/assets/cubeMaps'),
      },
    },
  },
  plugins: [glslify()]
});