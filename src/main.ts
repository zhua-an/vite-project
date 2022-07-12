import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from "element-plus"
import 'element-plus/theme-chalk/index.css'

import directive from './directive' // directive

import { i18n } from './i18n'
// 引入vite-plugin-svg-icons
import 'virtual:svg-icons-register'
import * as ElementPlusIcons from "@element-plus/icons-vue"

const app = createApp(App);

// elm icon图标
Object.keys(ElementPlusIcons).forEach((iconName) => {
    app.component(iconName, ElementPlusIcons[iconName as keyof typeof ElementPlusIcons]);
});

//配置全局属性
// app.config.globalProperties

app.use(router);
app.use(store);
app.use(ElementPlus, { size: "mini" });
app.use(i18n);

directive(app)

app.mount('#app')

export default app;
