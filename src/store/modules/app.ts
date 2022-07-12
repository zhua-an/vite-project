import { Module } from "vuex";
import { getLocaleLang } from "../../i18n";
import { getDict } from '@/api/app/app'
import { getSysRouteMap } from "@/router"
import { getNav,getPermissions,getInfo } from '@/api/user/user'
import { mergeServerRoute } from "@/utils/router"

interface StoreApp {
  appIsLogin: boolean, //是否登录
  appIsReady: boolean, //app数据是否就绪
  appIsRender: boolean, //app是否开始渲染内容
  dicts: [], //字典
  routes: [], //最终的路由集合
  menus: [], //菜单集合
  routeToMeta: {}, //url对应标题meta信息
  tabs: [], //tab标签页集合
  activeTabName: "", //tab当前焦点页
  closedTabs: [] //存储已经关闭过的tab
  language: string
}

const store: Module<StoreApp, unknown> = {
  namespaced: true,
  state() {
    return {
      appIsLogin: false, //是否登录
      appIsReady: false, //app数据是否就绪
      appIsRender: false, //app是否开始渲染内容
      dicts: [], //字典
      routes: [], //最终的路由集合
      menus: [], //菜单集合
      routeToMeta: {}, //url对应标题meta信息
      tabs: [], //tab标签页集合
      activeTabName: "", //tab当前焦点页
      closedTabs: [], //存储已经关闭过的tab
      language: getLocaleLang()
    }
  },
  mutations: {
    updateState(state: any, payload: AnyObject) {
      Object.keys(payload).forEach((x: string) => {
        state[x] = payload[x];
      });
    }
  },
  actions: {
    updateState(context, payload: AnyObject) {
      context.commit("updateState", payload);
    },
    initApp(ctx) {
      return Promise.all([
        getNav(), //加载菜单
        getPermissions(), //加载权限
        getInfo(), //加载用户信息
        getDict() //加载字典
      ]).then(([menus, permissions, user, dicts]) => {
        if (user.code !== 0) {
          console.error("初始化用户数据错误", user.msg);
        }
        const [routes, routeToMeta] = mergeServerRoute(menus.data || [], getSysRouteMap());
        ctx.commit("updateState", {
          permissions: permissions.data || [],
          user: user.data || {},
          dicts: dicts.data || [],
          routeToMeta: routeToMeta || {},
          menus: []
        });
        return routes;
      });
    }
  },
  getters: {
   
  }
}

export default store