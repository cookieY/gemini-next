import { Module } from 'vuex';
import { RootStore } from '../types';

export interface lightWord {
  meta: string;
  vl: string;
}

export interface highlightStore {
  highlight: { [key: string]: lightWord[] };
}

export const highlight: Module<highlightStore, RootStore> = {
  namespaced: true,
  state: {
    highlight: {},
  },
  mutations: {
    SAVE_HIGHLIGHT(state, word) {
      state.highlight[word.key] = word.highlight;
    },
  },
};
