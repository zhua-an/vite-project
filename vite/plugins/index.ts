import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

import createPluginHtml from './vite-html'
import { changePackageVersion } from "./build/plugins"
import createAutoImport from './auto-import'
import createVueComponents from './vue-components'
import { createPages, createLayouts } from './auto-router'
import createCompression from './compression'
import createViteSvgIcons from './svn-icons'

export default function createVitePlugins(viteEnv, isBuild: boolean = false) {
    const vitePlugins: (PluginOption | PluginOption[])[] = [vue()]
    vitePlugins.push(createPluginHtml(viteEnv, isBuild))
    vitePlugins.push(changePackageVersion())
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createVueComponents())
    vitePlugins.push(createPages())
    vitePlugins.push(createLayouts())
	isBuild && vitePlugins.push(...createCompression(viteEnv))
    vitePlugins.push(createViteSvgIcons())
    return vitePlugins
}

