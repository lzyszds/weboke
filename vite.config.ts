import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import prismjs from 'vite-plugin-prismjs';

const baseUrl = {
  development: './',
  beta: './',
  release: './'
}

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    vue(),
    prismjs({
      languages: ['json', 'javascript', 'css', 'html', 'markdown', 'sql', 'typescript',],
    }),
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
    port: 1024,
    proxy: {
      '/api': {
        target: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/music': {
        target: 'http://localhost:1030/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/music/, '')
      },
      '/mapApi': { //高德地图api
        target: 'https://restapi.amap.com/v3/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/mapApi/, '')
      },
      '/admin': {
        target: 'http://localhost:1027/admin/',//这里是域名，不是完整地址
        changeOrigin: true,//是否跨域
        rewrite: path => path.replace(/^\/admin/, '')
      },
      '/getIp': {
        target: 'https://v2.jinrishici.com',//这里是域名，不是完整地址
        changeOrigin: true,//是否跨域
        rewrite: path => path.replace(/^\/getIp/, '')
      }
      // '/live2d': {
      //   target: 'https://oss.amogu.cn/blog/live2d/api/model/girls-frontline',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/music/, '')
      // },
    }
  }
})
