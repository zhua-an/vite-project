import vue from '@vitejs/plugin-vue'

import { changePackageVersion } from "./build/plugins"
import createAutoImport from './auto-import'
import createVueComponents from './vue-components'
import createCompression from './compression'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue()]
    vitePlugins.push(changePackageVersion())
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createVueComponents())
	isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}

