import { Module } from "vuex";
import { RootStore } from "../types";


export interface lightWord {
      meta: string
      vl: string
}

export interface highlightStore {
      highligt: { [key: string]: lightWord[] }
}


export const highlight: Module<highlightStore, RootStore> = {
      namespaced: true,
      state: {
            highligt: {}
      },
      mutations: {
            SAVE_HIGHLIGHT (state, word) {
                  state.highligt[word.key] = word.highlight
            }
      }
}
