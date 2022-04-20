import { RouteRecordRaw } from "vue-router";
import Layout from "@/layouts/index.vue";

/**
 * 框架基础路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: { title: "ui.router.pageWorkbench", icon: "icon-desktop" },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home.vue"),
        meta: { title: "ui.router.pageHome", icon: "icon-home" }
      }
    ]
  },
]

export const errorRoute: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    redirect: { path: "/error", query: { to: 404 }, replace: true },
    meta: { isNavigationMenu: false }
  }
];

export default routes;