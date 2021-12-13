import { request, COMMON_URI } from "@/config/request";

export interface Steps {
      desc: string
      auditor: string[]
      type?: number
      edit?: boolean
}

export interface RespSteps {
      id: number
      source: string
      steps: Steps[]
}

export interface RespTPLs {
      id: number
      source: string
}

export function FetchDBFlowApis (s: number) {
      return request({
            method: 'put',
            url: `${COMMON_URI}/manage/tpl`,
            data: {
                  id: s
            }
      })
}

export function FetchFlowApis () {
      return request({
            method: 'get',
            url: `${COMMON_URI}/manage/tpl`,
      })
}


export function TplCreateOrEditApi (args: RespSteps) {
      return request({
            method: 'post',
            data: args,
            url: `${COMMON_URI}/manage/tpl`
      })
}