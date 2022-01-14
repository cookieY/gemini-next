import { Module } from "vuex";
import { RootStore } from "../types";
import { OrderTableData } from "@/types"

export interface orderStore {
      order: OrderTableData
      enabled: boolean
      sql: string
}

export const order: Module<orderStore, RootStore> = {
      namespaced: true,
      state: {
            order: {} as OrderTableData,
            enabled: true,
            sql: ""
      },
      mutations: {
            ORDER_STORE (state, vl: OrderTableData) {
                  state.order = vl
            },
            IS_ENABLED (state, vl: boolean) {
                  state.enabled = vl
            },
            ORDER_SET_SQL (state, vl) {
                  state.sql = vl
            }
      }
}