import { Module } from "vuex";
import { setCache, getCache } from "@/utils/cache";
import { encryption } from '@/utils/utils'
import { CacheToken } from "@/constants/cacheKey";
import { loginByUsername,loginByMobile } from '@/api/user/user'

interface StoreUser {
  access_token: string, //access_token
  refresh_token: string, //refresh_token
  permissions: [], //权限集合
  info: Object, //用户信息
}

const store: Module<StoreUser, unknown> = {
  namespaced: true,
  state() {
    return {
      access_token: getCache('access_token') || '',
      refresh_token: getCache('refresh_token') || '',
      permissions: [],
      info: {
        createDate: "",
        deptId: "",
        deptName: "",
        email: "",
        gender: 0,
        headUrl: "",
        id: "",
        mobile: "",
        postIdList: "",
        realName: "",
        roleIdList: "",
        status: 0,
        superAdmin: 0,
        username: ""
      }
    }
  },
  mutations: {
    SET_ACCESS_TOKEN: (state: StoreUser, access_token: string) => {
      state.access_token = access_token
      setCache(CacheToken, {"access_token":access_token}, true)
    },
    SET_REFRESH_TOKEN: (state: StoreUser, rfToken: string) => {
      state.refresh_token = rfToken
      setCache('refresh_token', state.refresh_token, true)
    }
  },
  actions: {
    LoginByUsername({ commit }, userInfo = {}) {
      const user = encryption({
        data: userInfo,
        key: 'thanks,helloworld',
        param: ['password']
      })
      return new Promise((resolve, reject) => {
        loginByUsername(user.username, user.password, user.code, user.randomStr).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据手机号登录
    LoginByPhone({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        loginByMobile(userInfo.mobile, userInfo.code).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
  getters: {
    getInfo(state: StoreUser) {
      return state.info
    }
  }
}

export default store