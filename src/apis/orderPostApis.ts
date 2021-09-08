import { request, COMMON_URI } from "@/config/request"
import { OrderItem } from "@/types";

export interface SQLTestParams {
      source: string
      data_base: string
      sql: string
      is_dml: boolean
}

export const FetchSQLTestResults = (params: SQLTestParams) => {
      return request({
            url: `${COMMON_URI}/fetch/test`,
            method: "PUT",
            data: params
      })
}

export const PostSQLOrder = (params: OrderItem) => {
      return request({
            url: `${COMMON_URI}/common/post`,
            method: "POST",
            data: params
      })
}