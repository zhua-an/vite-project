import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compressionnpm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    // 生产环境生成 .gz 文件  https://github.com/anncwb/vite-plugin-compression
    viteCompression({
      verbose: true,          //是否在控制台输出压缩结果
      disable: false,         //是否禁用
      threshold: 10240,       //体积大于 threshold 才会被压缩,单位 b
      algorithm: 'gzip',      //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz'              //生成的压缩包后缀
    })
  ],
  base:"/",
  resolve: {
    alias: {
      /*
        路径别名
        若为文件系统路径必须是绝对路径的形式，否则将以别名原样呈现，不会解析为文件系统路径路径 
      */
      //'@': process.cwd()+'/src'
      //'@':path.resolve('src')
      //'@':path.resolve(__dirname, 'src')
      '@': path.resolve(__dirname, './src')
    },
  },
  /*
    Directory to serve as plain static assets. 
    Files in this directory are served at / during dev and copied to the root of outDir during build, and are always served or copied as-is without transform. 
    The value can be either an absolute file system path or a path relative to project root.
    静态资源目录，开发模式下会自动放到 / 下，生产模式下会自动放到 outDir 根路径下。
    该目录可以配置为文件系统绝对目录或者相对于项目根目录的相对路径
  */
  publicDir:'public',
  //vite开发服务器配置
  server: {
    host: 'localhost',
    port: 3000,
    open: true,         //在服务器启动时自动在浏览器中打开应用程序。
    strictPort: false,  //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    https: false,
    cors: true,         // 默认启用并允许任何源
    
    //proxy: {
    //   // 字符串简写写法
    //   '/foo': 'http://localhost:4567/foo',
    //   // 选项写法
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    //   // 正则表达式写法
    //   '^/fallback/.*': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/fallback/, '')
    //   }
    // }
  },
  //生产模式打包配置
  build: {
    target: 'modules',
    outDir: 'dist',       //指定输出路径
    assetsDir: 'assets',  // 指定生成静态资源的存放路径
    minify: 'terser',     // 混淆器，terser构建后文件体积更小
    // 生产环境移除 console
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
