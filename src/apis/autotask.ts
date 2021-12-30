import { COMMON_URI, request } from "@/config/request"
import { LabelInValue } from "@/types"
import { AxiosPromise } from "axios"


export interface AutoTask {
      name: string
      tp: number
      sourceLabel: LabelInValue
      data_base: string
      table: string
      affect_rows: number
      status?: number
      idc: string
      source?: string
      source_id?: string
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

      Post (tp: string, args: AutoTask): AxiosPromise {
            tp === "curd" ? (args.source_id = args.sourceLabel.value, args.source = args.sourceLabel.label) : null
            return request({
                  method: 'post',
                  url: `${COMMON_URI}/manage/task`,
                  data: {
                        task: args,
                        tp: tp,
                  }
            })
      }

      Delete (taskId: string): AxiosPromise {
            return request({
                  method: 'delete',
                  url: `${COMMON_URI}/manage/task`,
                  params: {
                        task_id: taskId
                  }
            })
      }
}