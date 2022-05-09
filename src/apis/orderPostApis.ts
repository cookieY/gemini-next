import { request, COMMON_URI } from "@/config/request"
import { OrderItem, OrderTableData } from "@/types";
import { AxiosPromise } from "axios";

export interface Comment {
      username?: string
      time?: string
      content: string
      work_id: string
}

export interface SQLTestParams {
      source: string
      data_base: string
      sql: string
      kind: number
}

export interface SQLAuditOrder {
      work_id: string;
      source_id?: string;
      flag?: number;
      tp?: string;
      text?: string;
}

export interface OrderExpr {
      type: number;
      status: number;
      text: string;
      picker: string[];
      username: string;
}

export interface OrderParams {
      find: OrderExpr,
      page: number
}

export interface OrderTableResp {
      data: OrderTableData[]
      page: number
}

export interface Reject {
      work_id: string
      content: string
}

function checkUri (tp: string) {
      if (tp === 'audit') {
            return `${COMMON_URI}/audit/order/list`
      } else if (tp === 'common') {
            return `${COMMON_URI}/common/list`
      } else if (tp === 'record') {
            return `${COMMON_URI}/record/list`
      }
}

export class Request {
      Test (params: SQLTestParams): AxiosPromise {
            return request({
                  url: `${COMMON_URI}/fetch/test`,
                  method: "PUT",
                  data: params
            })
      }
      Merge (sql: string): AxiosPromise {
            return request({
                  url: `${COMMON_URI}/fetch/merge`,
                  method: "PUT",
                  data: {
                        sqls: sql
                  }
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

      List (expr: OrderParams, tp: string): AxiosPromise {
            return request({
                  url: checkUri(tp),
                  method: "PUT",
                  data: expr
            })
      }

      Results (work_id: string, page: { current: number, pageSize: number }): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/fetch/detail`,
                  params: {
                        work_id: work_id,
                        page: page.current,
                        page_size: page.pageSize
                  }
            })
      }

      Roll (work_id: string, page: number): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/fetch/roll`,
                  params: {
                        work_id: work_id,
                        page: page
                  }
            })
      }

      CommentList (work_id: string): AxiosPromise {
            return request({
                  method: 'get',
                  url: `${COMMON_URI}/fetch/comment`,
                  params: {
                        work_id: work_id,
                  }
            })
      }

      CommentPost (args: Comment): AxiosPromise {
            return request({
                  method: 'post',
                  url: `${COMMON_URI}/fetch/comment`,
                  data: args
            })
      }

}