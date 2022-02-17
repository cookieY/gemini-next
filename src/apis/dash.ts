import { request, COMMON_URI } from "@/config/request"
import { AxiosPromise } from "axios"

export class Request {
      Banner (): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/dash/banner`,
            })
      }

      Top (): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/dash/top`,
            })
      }
}

