import { request, COMMON_URI } from "@/config/request"
import { OrderItem } from "@/types";
import { AxiosPromise } from "axios";

export interface SQLTestParams {
      source: string
      data_base: string
      sql: string
      is_dml: boolean
}

export interface SQLAuditOrder {
      work_id: string;
      source_id?: string;
      flag?: number;
      tp?: string;
      text?: string;
}

export class Request {
      Test (params: SQLTestParams): AxiosPromise {
            return request({
                  url: `${COMMON_URI}/fetch/test`,
                  method: "PUT",
                  data: params
            })
      }

      Next (args: SQLAuditOrder): AxiosPromise {
            return request({
                  method: 'post',
                  url: `${COMMON_URI}/audit/order/state`,
                  data: args
            })
      }

      Post (params: OrderItem): AxiosPromise {
            return request({
                  url: `${COMMON_URI}/common/post`,
                  method: "POST",
                  data: params
            })
      }

}