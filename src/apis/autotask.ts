import { COMMON_URI, request } from "@/config/request"
import { AxiosPromise } from "axios"


export interface AutoTask {
      name: string
      tp: number
      source: string
      data_base: string
      table: string
      affect_rows: number
      status?: number
}

export interface AutoTaskExpr {
      text: string
      source: string
      tp: number
}

export interface AutoTaskParams {
      page: number
      find: AutoTaskExpr
}

export interface AutoTaskResp {
      data: AutoTask[]
      page: number
}

export class Request {
      List (args: AutoTaskParams): AxiosPromise {
            return request({
                  method: 'put',
                  url: `${COMMON_URI}/manage/task`,
                  data: args
            })
      }
}