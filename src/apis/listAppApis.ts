import { request, COMMON_URI } from "@/config/request"


export interface RespFetchSource {
      idc: string
      source: string
      apply?: number
}

export function FetchSourceApis (type: string) {
      return request({
            method: 'get',
            url: `${COMMON_URI}/fetch/source`,
            params: {
                  tp: type
            }
      })
}

export class Request {

}

