import { Module } from "vuex";
import { RootStore } from "../types";
import { LoginRespPayload } from "@/types"

export interface userStore {
      account: LoginRespPayload
}

export const user: Module<userStore, RootStore> = {
      namespaced: true,
      state: {
            account: {
                  token: "",
                  real_name: "",
                  user: "",
                  is_record: 2
            } as LoginRespPayload
      },
      mutations: {
            USER_STORE (state, vl: LoginRespPayload) {
                  state.account = vl
            }
      }
}