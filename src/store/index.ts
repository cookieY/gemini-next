import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { menu } from '@/store/module/menu';
import { user } from '@/store/module/user';
import { order } from './module/order';
import { common } from './module/common';
import { highlight } from './module/highlight';
import { RootStore, AllStoreTypes } from './types';
import createPersistedState from 'vuex-persistedstate';

export const store = createStore<AllStoreTypes>({
  modules: {
    menu,
    user,
    order,
    common,
    highlight,
  },
  plugins: [
    createPersistedState({
      paths: ['user', 'menu', 'order'],
      storage: window.sessionStorage,
    }),
  ],
});

export const key: InjectionKey<Store<RootStore>> = Symbol('vue-store');

// 定义自己的 `useStore` 组合式函数
export function useStore<T = AllStoreTypes>() {
  return baseUseStore<T>(key);
}
