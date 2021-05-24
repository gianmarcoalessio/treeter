import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@css': '/css',
      '@comp': '/src/comp',
      '@eng': '/src/eng',
      '@svg': '/src/eng/svg'
    }
  },
  server: {
    port: 3050,
  },

  plugins: [vue()]
})