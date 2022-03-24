import { Request } from "@/apis/fetchSchema";
import { Request as Flow, RespTPLs } from "@/apis/flow";
import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { Module } from "vuex";
import { RootStore } from "../types";

export interface commonStore {
      idc: string[]
      flow: RespTPLs[]
      queryInfo: QueryInfo
      schemaList: string[]
      spinning: boolean
      sql: string
      sock: any
      schema: string,
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
            queryInfo: {} as QueryInfo,
            schemaList: [],
            spinning: false,
            sql: "",
            sock: null,
            schema: "",
      },
      mutations: {
            GET_IDC (state) {
                  const request = new Request
                  request.IDC().then((res: AxiosResponse<Res<string[]>>) => state.idc = res.data.payload).finally(() => state.idc)
            },
            GET_FLOWS (state) {
                  const request = new Flow
                  request.List().then((res: AxiosResponse<Res<RespTPLs[]>>) => state.flow = res.data.payload)
            },
            SET_SOURCE_SCHEMA (state, query) {
                  state.queryInfo = query
            },
            SET_SCHEMA_List (state, f) {
                  state.schemaList = f.schema
                  state.queryInfo.source = f.source
                  state.queryInfo.source_id = f.source_id
            },
            SET_SCHEMA (state, v) {
                  v === "" ? state.schema = state.schemaList[0] : state.schema = v
            },
            SET_SPINNING (state) {
                  state.spinning = !state.spinning
            },
            ORDER_SET_SQL (state, vl) {
                  state.sql = vl
            },
            QUERY_CONN (state, vl) {
                  state.sock = vl
            }
      }
}