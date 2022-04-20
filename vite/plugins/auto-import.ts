import AutoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
    return AutoImport({
        imports: [
            'vue',
            'vue-router',
            'vue-i18n',
            {
                'vuex': ['useStore']
            }
        ],
        // dts: false
        dts: 'src/auto-import.d.ts'
    })
}
