import { request, COMMON_URI, Res } from '@/config/request';
import { OrderItem, OrderTableData, SQLTesting } from '@/types';
import { Dayjs } from 'dayjs';

export type RangeValue = [Dayjs, Dayjs];

export interface Comment {
  username?: string;
  time?: string;
  content: string;
  work_id: string;
}

export interface SQLTestParams {
  source_id: string;
  data_base: string;
  sql: string;
  kind: number;
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
  picker?: RangeValue;
  username: string;
}

export interface OrderParams {
  find: OrderExpr;
  page: number;
}

export interface OrderTableResp {
  data: OrderTableData[];
  page: number;
}

export interface Reject {
  work_id: string;
  content: string;
}

function checkUri(tp: string) {
  switch (tp) {
    case 'audit':
      return `${COMMON_URI}/audit/order/list`;
    case 'common':
      return `${COMMON_URI}/common/list`;
    case 'record':
      return `${COMMON_URI}/record/list`;
    default:
      return '';
  }
}

export function checkSQLS(params: SQLTestParams) {
  return request.put<Res<SQLTesting[]>>(`${COMMON_URI}/fetch/test`, params);
}

export function mergeDDLSTMT(sql: string) {
  return request.put(`${COMMON_URI}/fetch/merge`, { sqls: sql });
}

export function getNextOrderState(args: SQLAuditOrder) {
  return request.post(`${COMMON_URI}/audit/order/state`, args);
}

export function changeOrderStateUndo(args: SQLAuditOrder) {
  return request.post(`${COMMON_URI}/audit/order/state`, args);
}

export function userPostOrder(args: OrderItem) {
  return request.post(`${COMMON_URI}/common/post`, args);
}

export function getOrderList(args: OrderParams, tp: string) {
  return request.put(checkUri(tp), args);
}

export function getOrderResult(
  work_id: string,
  page: { current: number; pageSize: number }
) {
  return request.get(`${COMMON_URI}/fetch/detail`, {
    params: {
      work_id: work_id,
      page: page.current,
      page_size: page.pageSize,
    },
  });
}

export function getOrderRollSQLS(work_id: string, page: number) {
  return request.get(`${COMMON_URI}/fetch/roll`, {
    params: {
      work_id: work_id,
      page: page,
    },
  });
}

export function getOrderComment(work_id: string) {
  return request.get(`${COMMON_URI}/fetch/comment`, {
    params: {
      work_id: work_id,
    },
  });
}

export function postOrderComment(args: Comment) {
  return request.post(`${COMMON_URI}/fetch/comment`, args);
}

export class Request {
  //   Test(params: SQLTestParams): AxiosPromise {
  //     return request({
  //       url: `${COMMON_URI}/fetch/test`,
  //       method: 'PUT',
  //       data: params,
  //     });
  //   }
  //   Merge(sql: string): AxiosPromise {
  //     return request({
  //       url: `${COMMON_URI}/fetch/merge`,
  //       method: 'PUT',
  //       data: {
  //         sqls: sql,
  //       },
  //     });
  //   }
  //   Next(args: SQLAuditOrder): AxiosPromise {
  //     return request({
  //       method: 'post',
  //       url: `${COMMON_URI}/audit/order/state`,
  //       data: args,
  //     });
  //   }
  //   Undo(args: SQLAuditOrder): AxiosPromise {
  //     return request({
  //       method: 'post',
  //       url: `${COMMON_URI}/audit/order/state`,
  //       data: args,
  //     });
  //   }
  //   Post(params: OrderItem): AxiosPromise {
  //     return request({
  //       url: `${COMMON_URI}/common/post`,
  //       method: 'POST',
  //       data: params,
  //     });
  //   }
  //   List(expr: OrderParams, tp: string): AxiosPromise {
  //     return request({
  //       url: checkUri(tp),
  //       method: 'PUT',
  //       data: expr,
  //     });
  //   }
  //   Results(
  //     work_id: string,
  //     page: { current: number; pageSize: number }
  //   ): AxiosPromise {
  //     return request({
  //       method: 'get',
  //       url: `${COMMON_URI}/fetch/detail`,
  //       params: {
  //         work_id: work_id,
  //         page: page.current,
  //         page_size: page.pageSize,
  //       },
  //     });
  //   }
  //   Roll(work_id: string, page: number): AxiosPromise {
  //     return request({
  //       method: 'get',
  //       url: `${COMMON_URI}/fetch/roll`,
  //       params: {
  //         work_id: work_id,
  //         page: page,
  //       },
  //     });
  //   }
  //   CommentList(work_id: string): AxiosPromise {
  //     return request({
  //       method: 'get',
  //       url: `${COMMON_URI}/fetch/comment`,
  //       params: {
  //         work_id: work_id,
  //       },
  //     });
  //   }
  //   CommentPost(args: Comment): AxiosPromise {
  //     return request({
  //       method: 'post',
  //       url: `${COMMON_URI}/fetch/comment`,
  //       data: args,
  //     });
  //   }
}
