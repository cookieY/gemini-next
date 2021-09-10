import { Module } from "vuex";
import { RootStore } from "../types";
import { OrderTableData } from "@/types"

export interface orderStore {
      order: OrderTableData
      enabled: boolean
}

export const order: Module<orderStore, RootStore> = {
      namespaced: true,
      state: {
            order: {} as OrderTableData,
            enabled: true
      },
      mutations: {
            ORDER_STORE (state, vl: OrderTableData) {
                  state.order = vl
            },
            IS_ENABLED (state, vl: boolean) {
                  state.enabled = vl
            }
      }
}