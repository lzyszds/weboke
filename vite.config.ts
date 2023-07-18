import { defineConfig, } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import prismjs from 'vite-plugin-prismjs';

const baseUrl = {
  development: './',
  beta: './',
  release: './'
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): any => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  // const env = loadEnv(mode, process.cwd(), '')
  let _baseUrl = 'http://localhost'
  if (mode == 'lzym') _baseUrl = 'http://192.168.0.200'
  return {
    // 在 vite.config.ts 中添加 envDir 属性指定环境文件目录为 env：
    envDir: path.resolve(__dirname, './env'),
    plugins: [
      vue(),
      prismjs({
        languages: ['json', 'js', 'ts', 'css', 'less', 'html', 'markdown', 'sql', 'typescript', 'vim'],
      }),
    ],
    base: "./",
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //打包时移除console
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log']
        }
      }
    },
    server: {
      hmr: true,
      usePolling: true,
      host: '0.0.0.0',
      port: 1024,
      proxy: {
        '/api': {
          target: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        '/music': {
          target: _baseUrl + ':1030/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/music/, '')
        },
        '/mapApi': { //高德地图api
          target: 'https://restapi.amap.com/v3/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/mapApi/, '')
        },
        '/adminGetApi': {
          target: _baseUrl + ':8089/overtApis/',//这里是域名，不是完整地址
          changeOrigin: true,//是否跨域
          rewrite: path => path.replace(/^\/adminGetApi/, '')
        },
        '/adminPostApi': {
          target: _baseUrl + ':8089/privateApis/',//这里是域名，不是完整地址
          changeOrigin: true,//是否跨域
          rewrite: path => path.replace(/^\/adminPostApi/, '')
        },
        '/adminStatic': {
          target: _baseUrl + ':8089/public',//这里是域名，不是完整地址
          changeOrigin: true,//是否跨域
          rewrite: path => path.replace(/^\/adminStatic/, '')
        },
        '/getIp': {
          target: 'https://v2.jinrishici.com',//这里是域名，不是完整地址
          changeOrigin: true,//是否跨域
          rewrite: path => path.replace(/^\/getIp/, '')
        },
        '/github': {
          target: 'https://api.github.com/graphql',//这里是域名，不是完整地址
          changeOrigin: true,//是否跨域
          rewrite: path => path.replace(/^\/github/, '')
        }

        // '/live2d': {
        //   target: 'https://oss.amogu.cn/blog/live2d/api/model/girls-frontline',
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/music/, '')
        // },
      }
    }
  }
})
