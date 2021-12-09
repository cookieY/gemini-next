import { FetchIDCNameApis } from "@/apis/fetchSchema";
import { FetchFlowApis, RespSteps, RespTPLs } from "@/apis/flow";
import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { Module } from "vuex";
import { RootStore } from "../types";

export interface commonStore {
      idc: string[]
      flow: RespTPLs[]
}
export const common: Module<commonStore, RootStore> = {
      namespaced: true,
      state: {
            idc: [] as string[],
            flow: [] as RespTPLs[]
      },
      mutations: {
            GET_IDC (state) {
                  FetchIDCNameApis().then((res: AxiosResponse<Res<string[]>>) => state.idc = res.data.payload).finally(() => state.idc)
            },
            GET_FLOWS (state) {
                  FetchFlowApis().then((res: AxiosResponse<Res<RespTPLs[]>>) => state.flow = res.data.payload)
            }
      }
}