import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    alias: {
      '@css': '/css',
      '@comp': '/src/comp',
      '@eng': '/src/eng',
    },
  plugins: [vue()]
})
