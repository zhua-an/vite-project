import vue from '@vitejs/plugin-vue'

import { changePackageVersion } from "./build/plugins"
import createAutoImport from './auto-import'
import createVueComponents from './vue-components'
import { createPages, createLayouts } from './auto-router'
import createCompression from './compression'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue()]
    vitePlugins.push(changePackageVersion())
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createVueComponents())
    vitePlugins.push(createPages())
    vitePlugins.push(createLayouts())
	isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}

