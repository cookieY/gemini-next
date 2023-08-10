import { getFlowList, RespTPLs } from '@/apis/flow';
import { Res } from '@/config/request';
import { encode } from '@msgpack/msgpack';
import { WebSocketResult } from '@vueuse/core';
import { AxiosResponse } from 'axios';
import { Module } from 'vuex';
import { RootStore } from '../types';

export interface commonStore {
  idc: string[];
  flow: RespTPLs[];
  queryInfo: QueryInfo;
  schemaList: string[];
  spinning: boolean;
  sql: string;
  sock: any;
  schema: string;
  principal: any[];
}

export interface QueryInfo {
  source_id: string;
  source: string;
  schema: string;
}

export const common: Module<commonStore, RootStore> = {
  namespaced: true,
  state: {
    idc: [] as string[],
    flow: [] as RespTPLs[],
    queryInfo: {} as QueryInfo,
    schemaList: [],
    spinning: false,
    sql: '',
    sock: {} as WebSocketResult<any>,
    schema: '',
    principal: [],
  },
  mutations: {
    GET_IDC(state, idc) {
      state.idc = idc;
    },
    GET_FLOWS(state) {
      getFlowList().then(
        (res: AxiosResponse<Res<RespTPLs[]>>) => (state.flow = res.data.payload)
      );
    },
    SET_SOURCE_SCHEMA(state, query) {
      state.queryInfo = query;
    },
    SET_SCHEMA_List(state, f) {
      state.schemaList = f.schema;
      state.queryInfo.source = f.source;
      state.queryInfo.source_id = f.source_id;
    },
    SET_SCHEMA(state, v) {
      state.schema = v;
    },
    SET_SPINNING(state) {
      state.spinning = !state.spinning;
    },
    SET_DISABLED_SPINNING(state) {
      state.spinning = false;
    },
    ORDER_SET_SQL(state, vl) {
      state.sql = vl;
    },
    QUERY_CONN(state, vl) {
      state.sock = vl;
    },
    DB_SET_PRINCIPAL(state, vl) {
      state.principal = vl;
    },
  },
};
