import { request, COMMON_URI } from "@/config/request"

export enum OrderState {
      REJECT = 0,
      SUCCESS,
      AUDIT,
      PROCESS,
      ERROR,
      WAIT,
}

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

export interface OrderTableData {
      work_id: string
      username: string
      text: string
      backup: number
      date: string
      real_name: string
      executor: string
      status: number
      type: number
      delay: string
      source: string
      idc: string
      data_base: string
      table: string
      execute_time: string
      assigned: string
      current_step: number
      relevant: []
}


export const FetchOrderTable = (expr: OrderParams, isAudit: boolean) => {
      return request({
            url: isAudit ? `${COMMON_URI}/audit/order/list` : `${COMMON_URI}/common/list`,
            method: "PUT",
            data: expr
      })
}