import { request, COMMON_URI } from "@/config/request";

export interface Steps {
      desc: string
      auditor: string[]
}

export interface RespSteps {
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