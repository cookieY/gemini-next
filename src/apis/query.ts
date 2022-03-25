import { COMMON_URI, request } from "@/config/request"
import { AxiosPromise } from "axios"


export interface QueryParams {
      current: number
      pageSize: number
      expr: QueryExpr
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

export interface QueryPost {
      source_id: string
      text: string
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

      Post (args: QueryPost): AxiosPromise {
            return request({
                  method: 'post',
                  url: `${COMMON_URI}/query/post`,
                  data: args
            })
      }

      Agree (work_id: string): AxiosPromise {
            return request({
                  method: 'post',
                  url: `${COMMON_URI}/audit/query/agreed`,
                  data: {
                        work_id: work_id
                  }
            })
      }

      Stop (work_id: string): AxiosPromise {
            return request({
                  method: 'post',
                  url: `${COMMON_URI}/audit/query/stop`,
                  data: {
                        work_id: work_id
                  }
            })
      }

      Reject (work_id: string): AxiosPromise {
            return request({
                  method: 'post',
                  url: `${COMMON_URI}/audit/query/reject`,
                  data: {
                        work_id: work_id
                  }
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

      QueryStatus (): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/fetch/query_status`,
            })
      }

      QueryProfile (work_id: string, page: number): AxiosPromise {
            return request({
                  method: 'put',
                  url: `${COMMON_URI}/audit/query/profile`,
                  data: {
                        work_id: work_id,
                        page: page
                  }
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