import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const baseUrl = {
  development: './',
  beta: './',
  release: './'
}

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    vue(),
  ],
  base: baseUrl[mode],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    hmr: true,
    usePolling: true,
    proxy: {
      '/api': {
        target: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/music': {
        target: 'http://localhost:1024/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/music/, '')
      }
    }
  }
})
