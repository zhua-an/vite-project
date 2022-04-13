 /**
 * v-hasRole 角色权限处理
 */
 
import store from '@/store'

export default {
  mounted(el: any, binding: any, vnode: any): void {
    const { value } = binding
    const super_admin: string = "admin";
    const roles: string[] = store.getters && store.getters.roles

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value

      const hasRole: boolean = roles.some((role: string) => {
        return super_admin === role || roleFlag.includes(role)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置角色权限标签值"`)
    }
  }
}
