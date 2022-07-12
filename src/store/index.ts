import { InjectionKey } from "vue"
import { loadModules, context, modules } from "./modules"
import { createStore, useStore as baseUseStore, Store, createLogger } from "vuex"
import getters from './getters'

export interface State {
    [key: string]: any
}

export const key: InjectionKey<Store<State>> = Symbol();
const IS_DEV = process.env.NODE_ENV == 'development'

const store = createStore({
    modules,
    getters,
    strict: IS_DEV,
    plugins: IS_DEV ? [createLogger()] : []
});

export function useStore() {
    // return baseUseStore(key);
    return baseUseStore();
}

// 热重载
if (import.meta.hot) {
    import.meta.hot?.accept(Object.keys(context), () => {
        const { modules } = loadModules()
        store.hotUpdate({
            modules
        })
    })
}

export default store;