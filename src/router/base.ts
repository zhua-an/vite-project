import { RouteRecordRaw } from "vue-router";

/**
 * 框架基础路由
 */
const routes: Array<RouteRecordRaw> = [
]

export const errorRoute: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    redirect: { path: "/error", query: { to: 404 }, replace: true },
    meta: { isNavigationMenu: false }
  }
];

export default routes;