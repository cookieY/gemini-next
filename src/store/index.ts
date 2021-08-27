import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { menu } from "@/store/module/menu"
import { user } from "@/store/module/user"
import { RootStore, AllStoreTypes } from "./types"
import createPersistedState from "vuex-persistedstate";


export const store = createStore<AllStoreTypes>({
      modules: {
            menu,
            user
      },
      plugins: [createPersistedState({ storage: window.sessionStorage })],
})

export const key: InjectionKey<Store<RootStore>> = Symbol("vue-store")

// 定义自己的 `useStore` 组合式函数
export function useStore<T = AllStoreTypes> () {
      return baseUseStore<T>(key)
}