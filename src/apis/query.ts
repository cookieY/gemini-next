import { COMMON_URI, request } from "@/config/request"
import { AxiosPromise } from "axios"



export class Request {

      QuerySchema (source_id: string): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/query/schema`,
                  params: {
                        source_id: source_id
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