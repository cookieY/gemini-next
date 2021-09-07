import { Module } from "vuex";
import { RootStore } from "../types";
import { OrderTableData } from "@/apis/orderTableApis"

export interface orderStore {
      order: OrderTableData
}

export const order: Module<orderStore, RootStore> = {
      namespaced: true,
      state: {
            order: {} as OrderTableData
      },
      mutations: {
            ORDER_STORE (state, vl: OrderTableData) {
                  state.order = vl
            }
      }
}