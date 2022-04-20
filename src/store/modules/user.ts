import { Module } from "vuex";

interface StoreUser {
  permissions: [], //权限集合
  info: Object, //用户信息
  text: string
}

const store: Module<StoreUser, unknown> = {
  namespaced: true,
  state() {
    return {
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
      },
      text: "未修改"
    }
  },
  mutations: {
    setText(state: StoreUser, payload: AnyObject) {
      state.text = payload.text;
    }
  },
  actions: {
    setText(context, payload: AnyObject) {
      context.commit("setText", payload);
    }
  },
  getters: {
    getText(state: StoreUser) {
      return state.text
    }
  }
}

export default store