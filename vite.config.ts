import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import prismjs from 'vite-plugin-prismjs';
import envCompatible from 'vite-plugin-env-compatible';


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): any => {
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // 在 vite.config.ts 中添加 envDir 属性指定环境文件目录为 env：
    envDir: path.resolve(__dirname, './env'),
    plugins: [
      vue(),
      prismjs({
        languages: ['json', 'js', 'ts', 'css', 'less', 'html', 'markdown', 'sql', 'typescript', 'vim'],
      }),
      envCompatible(),
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
      //   关闭文件计算
      reportCompressedSize: false,
      terserOptions: {
        compress: {
          //打包时移除console
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log']
        }
      },
      //提高超大静态资源警告门槛  
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        }
      }
    },
    server: {
      hmr: true,
      usePolling: true,
      open: false, // 这里开启自动打开浏览器是可选项
      host: '0.0.0.0',
      port: 1024,
      proxy: {
        "/api": {
          target: "http://localhost:8089",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },

        // '/api': {
        //   target: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/api/, '')
        // },
        // '/music': {
        //   target: _baseUrl + ':1030/',
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/music/, '')
        // },
        // '/mapApi': { //高德地图api
        //   target: 'https://restapi.amap.com/v3/',
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/mapApi/, '')
        // },
        // '/adminGetApi': {
        //   target: _baseUrl + '/overtApis/',//这里是域名，不是完整地址
        //   changeOrigin: true,//是否跨域
        //   rewrite: path => path.replace(/^\/adminGetApi/, '')
        // },
        // '/adminPostApi': {
        //   target: _baseUrl + '/privateApis/',//这里是域名，不是完整地址
        //   changeOrigin: true,//是否跨域
        //   rewrite: path => path.replace(/^\/adminPostApi/, '')
        // },
        // '/adminStatic': {
        //   target: _baseUrl + '/public',//这里是域名，不是完整地址
        //   changeOrigin: true,//是否跨域
        //   rewrite: path => path.replace(/^\/adminStatic/, '')
        // },
        // '/getIp': {
        //   target: 'https://v2.jinrishici.com',//这里是域名，不是完整地址
        //   changeOrigin: true,//是否跨域
        //   rewrite: path => path.replace(/^\/getIp/, '')
        // },
        // '/github': {
        //   target: 'https://api.github.com/graphql',//这里是域名，不是完整地址
        //   changeOrigin: true,//是否跨域
        //   rewrite: path => path.replace(/^\/github/, '')
        // }

        // '/live2d': {
        //   target: 'https://oss.amogu.cn/blog/live2d/api/model/girls-frontline',
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/music/, '')
        // },
      }
    }
  }
})
