import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    '@': path.resolve(__dirname, 'src'),
    'comps': path.resolve(__dirname, 'src/components'),
    'styles': path.resolve(__dirname, 'src/styles'),
    'plugins': path.resolve(__dirname, 'src/plugins'),
    'apis': path.resolve(__dirname, 'src/apis'),
    'utils': path.resolve(__dirname, 'src/utils'),
    'views': path.resolve(__dirname, 'src/views'),
    assets: path.resolve(__dirname, 'src/assets')
  },
  plugins: [vue(), viteMockServe({})]
})
