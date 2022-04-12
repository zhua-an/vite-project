import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import { changePackageVersion } from "./build/plugins"
import { readdirSync } from 'fs';
import viteCompression from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/**
 * 获取多入口文件
 * @returns 
 */
export function getPages() {
  let pagePath = resolve(__dirname, "./src/pages");
  let files: string[] = readdirSync(pagePath);
  let pages: { [key: string]: string } = {
    main: resolve(__dirname, 'index.html')
  };
  for (let i = 0; i < files.length; i++) {
    let key = files[i].replace('.html', '');
    if (key === 'index') continue;
    pages[key] = resolve(__dirname, `src/pages/${files[i]}`);
  }
  return pages;
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      /*
        路径别名
        若为文件系统路径必须是绝对路径的形式，否则将以别名原样呈现，不会解析为文件系统路径路径 
      */
      //'@': process.cwd()+'/src'
      //'@':path.resolve('src')
      //'@':path.resolve(__dirname, 'src')
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, './src')
    },
    // https://cn.vitejs.dev/config/#resolve-extensions
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    host: process.env.NODE_ENV !== "production"
  },
  plugins: [
    changePackageVersion(),
    vue(),
    // 生产环境生成 .gz 文件  https://github.com/anncwb/vite-plugin-compression
    viteCompression({
      verbose: true,          //是否在控制台输出压缩结果
      disable: false,         //是否禁用
      threshold: 10240,       //体积大于 threshold 才会被压缩,单位 b
      algorithm: 'gzip',      //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz'              //生成的压缩包后缀
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n'
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    })
  ],
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
    },
    rollupOptions: {
      input: getPages(),
    }
  }
})
