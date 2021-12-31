import { request, COMMON_URI } from "@/config/request"
import { OrderTableData } from "@/types"
import { AxiosPromise } from "axios"

export interface OrderExpr {
      type?: number;
      status?: number;
      desc?: string;
      picker?: string[];
      user?: string;
}

export interface OrderParams {
      find: OrderExpr,
      page: number
}

export interface OrderTableResp {
      data: OrderTableData[]
      page: number
}

export class Request {
      List (expr: OrderParams, isAudit: boolean): AxiosPromise {
            return request({
                  url: isAudit ? `${COMMON_URI}/audit/order/list` : `${COMMON_URI}/common/list`,
                  method: "PUT",
                  data: expr
            })
      }
}