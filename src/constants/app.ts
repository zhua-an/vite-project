import { getValueByKeys } from "@/utils/utils";
import appPack from "../../package.json";
/**
 * app系统配置
 */
export default {
  /**
   * 系统版本号，自动读取package.json中的version字段
   */
  version: appPack.version,

  /**
   * 系统默认语言
   */
  defaultLang: "zh-CN",

  /**
   * token 前缀
   */
  Authorization: 'Authorization',

  /**
   * 用户名密码登录的 client 信息
   */
  formLoginClient: 'zhua:zhua',

  /**
   * 验证码登录的 client 信息
   */
  smsLoginClient: 'app:app',

  /**
   * http的status默认放行不才用统一处理的
   */
  statusWhiteList: [400],

  /**
   * api请求地址，这里读取env环境变量中的VITE_APP_API，优先使用全局变量window.SITE_CONFIG.apiURL钩子，支持在index.html中配置
   */
  api: getValueByKeys(window, "SITE_CONFIG.apiURL") || import.meta.env.VITE_APP_API,

  /**
   * websocket 服务地址，这里读取env环境变量中的VITE_APP_SOCKET，优先使用全局变量window.SITE_CONFIG.socketURL钩子，支持在index.html中配置
   */
  websocket: getValueByKeys(window, "SITE_CONFIG.socketURL") || import.meta.env.VITE_APP_SOCKET,

  /**
   * 启用logo图标，logo尺寸32*32，存放路径@/assets/images/logo.png
   */
  enabledLogo: false,

  /**
   * 开启页面缓存
   */
  enabledKeepAlive: true,

  /**
   * 网络请求超时时间，单位毫秒
   */
  requestTimeout: 30000,

  /**
   * 全屏渲染的页面
   */
  fullscreenPages: ["/login"]
};
