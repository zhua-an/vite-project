import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { errorRoute } from "./base"
import generatedRoutes from "virtual:generated-pages"
import { setupLayouts } from "virtual:generated-layouts"

function getRoutes() {
	/**
	 * 如果要对 routes 做一些处理，请在这里修改
	 */
	
	 console.log(generatedRoutes)
	const routes = setupLayouts(generatedRoutes)
	console.log(routes.concat(errorRoute))
	return routes.concat(errorRoute);
}

const router = createRouter({
	history: createWebHashHistory(),
	routes: getRoutes()
})

// router.beforeEach((to, from, next) => {
// 	next()
// })

export default router;

/** 以下代码不要修改 */
function loadRouters() {
	const context = import.meta.globEager("../views/**/*.vue");
	const routes: RouteRecordRaw[] = [];

	Object.keys(context).forEach((key: any) => {
		if (key === "./index.ts") return;
		let name = key.replace(/(\.\.\/views\/|\.vue)/g, '');
		let path = "/" + name.toLowerCase();
		if (name === "Index") path = "/";
		routes.push({
			path: path,
			name: name,
			component: () => import(`../views/${name}.vue`)
		})
	});

	return { context, routes }
}
