import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw } from "vue-router"
import baseRoutes, { errorRoute } from "./base"
import generatedRoutes from "virtual:generated-pages"
import { setupLayouts } from "virtual:generated-layouts"
import { IObject } from "@/types/interface";
import store from "@/store";
import { getToken } from "@/utils/cache";
import { getBaseRouteToMeta, registerToRouter, toLangRoutes } from "@/utils/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { i18n } from "@/i18n";
import emits from "@/utils/emits";
import { EMitt } from "@/constants/enum";

interface dynamicRouteParams {
  path: string;
  query?: IObject;
  mete?: IObject;
}

NProgress.configure({ showSpinner: false });

function getRoutes() {
	/**
	 * 如果要对 routes 做一些处理，请在这里修改
	 */
	const routes = setupLayouts(generatedRoutes)
	return routes.concat(baseRoutes).concat(errorRoute);
}

const router = createRouter({
	history: createWebHashHistory(),
	routes: getRoutes()
})

// 路由加载前
router.beforeEach((to, from, next) => {
	//外链
  if (to.meta.isNewPage) {
    if (to.query.pop !== "true") {
      next(undefined);
      return false;
    }
  }
  
	//token
  const token = getToken();
	const isPop = to.query.pop === "true"; //新窗口打开内页
  NProgress.start();
	if (to.path !== "/login") {
    if (store.getters.routes.length) {
      if (to.name === "error") {
        const isMatched = autoRegisterDynamicToRouterAndNext(to);
        if (!isMatched) {
          store.commit("app/updateState", { appIsRender: true, appIsReady: true });
          next();
        }
      } else {
        if (!to.query.pop) {
          const routeMeta: IObject = store.getters.routeToMeta[to.path];
          emits.emit(EMitt.OnPushMenuToTabs, {
            label: to.query._mt || routeMeta.title || to.path,
            value: to.fullPath,
            mete: routeMeta
          });
        }
        store.commit("app/updateState", { appIsRender: true, appIsReady: true });
        next();
      }
    } else {
      if (token) {
        //初始化数据
        store.dispatch({ type: "initApp" }).then((res: Array<RouteRecordRaw>) => {
          const baseRoute = toLangRoutes(getRoutes(), i18n.global.t);
          const mergeRoute = baseRoute.concat(res);
          router.options.routes = mergeRoute;
          registerToRouter(router, mergeRoute);
          if (!to.matched.length) {
            registerDynamicToRouterAndNext({ path: to.path, query: to.query });
          }
          store.commit("app/updateState", {
            appIsReady: true,
            routes: mergeRoute,
            routeToMeta: { ...store.getters.routeToMeta, ...getBaseRouteToMeta(baseRoute) }
          });
          setTimeout(() => {
            store.commit("app/updateState", { appIsRender: true, appIsLogin: true });
          }, 600);
          next({ ...to, replace: true });
        });
      } else {
        if (isPop) {
          if (!to.matched.length) {
            registerDynamicToRouterAndNext({ path: to.path, query: to.query });
            store.commit("app/updateState", { appIsRender: true, appIsReady: true });
            next(to.fullPath);
          } else {
            store.commit("app/updateState", { appIsRender: true, appIsReady: true });
            if (to.meta.requiresAuth) {
              next("/login");
            } else {
              next();
            }
          }
        } else {
          next("/login");
        }
      }
    }
  } else {
    store.commit("app/updateState", { appIsReady: true, appIsRender: true });
    next();
  }
})

// 路由加载后
router.afterEach(() => {
  NProgress.done();
});

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

/**
 * 获取系统视图路径映射
 * @returns
 */
 export const getSysRouteMap = (): IObject => {
  return import.meta.glob("/src/views/**/*.vue");
};

/**
 * 根据路由path转换为系统视图组件路径
 * @param path
 * @returns
 */
export const toSysViewComponentPath = (path: string): string => {
  path = path.replace("_", "-");
  return `/src/views${path}.vue`;
};
/**
 * 自动注册路由
 * @param to
 * @returns
 */
const autoRegisterDynamicToRouterAndNext = (to: RouteLocationNormalized): boolean => {
  if (to.redirectedFrom) {
    const path = to.redirectedFrom.path;
    const component = matchedSysRouteComponent(path);
    if (component) {
      registerToRouter(router, [
        {
          path: path,
          name: path,
          component,
          redirect: ""
        }
      ]);
      router.push(to.redirectedFrom);
      return true;
    }
  }
  return false;
};

/**
 * 寻找视图组件
 * @param path
 * @returns
 */
const matchedSysRouteComponent = (path: string): any => {
  const sysRouteMap = getSysRouteMap();
  const component = sysRouteMap[toSysViewComponentPath(path)];
  if (!component) {
    console.error("实时注册动态路由失败，未找到组件路径", path);
  }
  return component;
};

/**
 * 实时注册动态路由并直接跳转过去
 * @param route
 */
export const registerDynamicToRouterAndNext = (route: dynamicRouteParams): void => {
  const component = matchedSysRouteComponent(route.path);
  const newRoute: RouteRecordRaw = {
    path: route.path,
    name: route.path,
    component,
    redirect: !component ? { path: "/error", query: { to: 404 }, replace: true } : ""
  };
  registerToRouter(router, [newRoute]);
  router.push(route);
};