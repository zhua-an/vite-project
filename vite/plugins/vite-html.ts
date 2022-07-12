import { createHtmlPlugin } from "vite-plugin-html"
import type { PluginOption } from 'vite'

export default function createPluginHtml(env, isBuild: boolean = true) {

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        apiURL: env.VITE_APP_API,
        socketURL: env.VITE_APP_SOCKET,
        title: env.VITE_APP_TITLE
      }
    },
  });
  return htmlPlugin;
}