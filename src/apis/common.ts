import { request, COMMON_URI } from "@/config/request"

export function FetchAuditorGetApis () {
      return request({
            method: 'get',
            url: `${COMMON_URI}/fetch/perform`,
      })
}