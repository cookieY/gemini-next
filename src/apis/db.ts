import { request, COMMON_URI } from "@/config/request"

export interface Source {
      idc: string
      source: string
      ip: string
      port: number
      username: string
      password: string
      is_query: number
      flow_id: number
}

export interface DBParams {
      page: number
      find: DBExpr
}

export interface DBExpr {
      idc: string
      source: string
      ip: string
      is_query: number
}

export interface DBResp {
      data: Source[]
      page: number
}

export interface RequestDB {
      tp: string
      db: Source
}


export function FetchDBListApis (args: DBParams) {
      return request({
            method: 'put',
            url: `${COMMON_URI}/manage/db`,
            data: args
      })
}

export function OpsDBApis (args: RequestDB) {
      return request({
            method: 'POST',
            url: `${COMMON_URI}/manage/db`,
            data: args
      })
}

export function DelDBApis (args: string) {
      return request({
            method: 'DELETE',
            url: `${COMMON_URI}/manage/db`,
            params: { source_id: args }
      })
}