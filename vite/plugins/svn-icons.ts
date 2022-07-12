import path from 'path';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default function createViteSvgIcons() {
  //https://github.com/vbenjs/vite-plugin-svg-icons
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]"
  })
}