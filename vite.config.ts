import { defineConfig, loadEnv } from 'vite'
import { resolve } from "path"
import { readdirSync } from 'fs'
import createVitePlugins from './vite/plugins'

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
    if(!files[i].endsWith('.html')) {
      continue
    }
    let key = files[i].replace('.html', '');
    if (key === 'index') continue;
    pages[key] = resolve(__dirname, `src/pages/${files[i]}`);
  }
  return pages;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, command })=> {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    base: VITE_APP_ENV === 'production' ? '/' : '/',
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
    plugins: createVitePlugins(env, command === 'build'),
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
      // 多入口文件 通过vite-plugin-html配置
      // rollupOptions: {
      //   input: getPages(),
      // }
    },
    //warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    server: {
      host: process.env.NODE_ENV !== "production",
      open: true, // 自动启动浏览器
    },
  }
})