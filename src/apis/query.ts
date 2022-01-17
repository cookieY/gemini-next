import { COMMON_URI, request } from "@/config/request"
import { AxiosPromise } from "axios"


export interface QueryParams {
      page: number
      find: QueryExpr
}

export interface QueryExpr {
      work_id: string
      username: string
      status: number,
      real_name: "",
      export: number
      picker: string[]
}

export interface QueryResp {
      work_id: string
      username: string
      status: number
      real_name: string
      date: string
      export: number
}



export class Request {
      List (args: QueryParams): AxiosPromise {
            return request({
                  method: 'put',
                  url: `${COMMON_URI}/audit/query/list`,
                  data: args
            })
      }

      QuerySchema (source_id: string): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/query/schema`,
                  params: {
                        source_id: source_id
                  }
            })

      }

      IsQuery (): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/fetch/is_query`,
            })
      }

      QueryTable (source_id: string, schema: string): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/query/tables`,
                  params: {
                        source_id: source_id,
                        schema: schema
                  }
            })
      }

      QueryData (source_id: string, schema: string, sql: string): AxiosPromise {
            return request({
                  method: 'post',
                  url: `${COMMON_URI}/query/results`,
                  params: {
                        source_id: source_id,
                        schema: schema,
                        sql: sql
                  }
            })
      }
}