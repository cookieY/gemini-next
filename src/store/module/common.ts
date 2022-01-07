import { Request } from "@/apis/fetchSchema";
import { FetchFlowApis, RespTPLs } from "@/apis/flow";
import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { Module } from "vuex";
import { RootStore } from "../types";

export interface commonStore {
      idc: string[]
      flow: RespTPLs[]
      highlight: { [key: string]: string }[]
      queryInfo: QueryInfo
      schemaList: string[]
}

export interface QueryInfo {
      source_id: string
      source: string
      schema: string
}

export const common: Module<commonStore, RootStore> = {
      namespaced: true,
      state: {
            idc: [] as string[],
            flow: [] as RespTPLs[],
            highlight: [] as { [key: string]: string }[],
            queryInfo: {} as QueryInfo,
            schemaList: []
      },
      mutations: {
            GET_IDC (state) {
                  const request = new Request
                  request.IDC().then((res: AxiosResponse<Res<string[]>>) => state.idc = res.data.payload).finally(() => state.idc)
            },
            GET_FLOWS (state) {
                  FetchFlowApis().then((res: AxiosResponse<Res<RespTPLs[]>>) => state.flow = res.data.payload)
            },
            SET_HIGHLIGHT (state, highlight) {
                  state.highlight = highlight
            },
            SET_SOURCE_SCHEMA (state, query) {
                  state.queryInfo = query
            },
            SET_SCHEMA_List (state, f) {
                  state.schemaList = f.schema
                  state.queryInfo.source = f.source
                  state.queryInfo.source_id = f.source_id
            }
      }
}