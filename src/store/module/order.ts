import { Module } from "vuex";
import { RootStore } from "../types";
import { OrderTableData } from "@/types"

export interface orderStore {
      order: OrderTableData
      sql: string
}

export const order: Module<orderStore, RootStore> = {
      namespaced: true,
      state: {
            order: {} as OrderTableData,
            sql: ""
      },
      mutations: {
            ORDER_STORE (state, vl: OrderTableData) {
                  state.order = vl
            }
      }
}