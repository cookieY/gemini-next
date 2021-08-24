import { Module } from "vuex";
import { RootStore } from "../types";

export interface menuStore {
      selectedKey: string[]
}

export const menu: Module<menuStore, RootStore> = {
      namespaced: true,
      state: {
            selectedKey: ["/home"]
      },
      mutations: {
            CHANGE_SELECTED (state, vl: string[]) {
                  state.selectedKey = vl
            }
      }
}