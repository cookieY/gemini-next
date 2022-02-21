import { Module } from "vuex";
import { RootStore } from "../types";

export interface menuStore {
      selectedKey: string[],
      activeKey: string
}

export const menu: Module<menuStore, RootStore> = {
      namespaced: true,
      state: {
            selectedKey: ["/home"],
            activeKey: "dml"
      },
      mutations: {
            CHANGE_SELECTED (state, vl: string[]) {
                  state.selectedKey = vl
            },
            CHANGE_ACTIVE_TABS (state, vl: string) {
                  state.activeKey = vl
            }
      }
}