import { COMMON_URI, request, Res } from '@/config/request';
import { Dayjs } from 'dayjs';

export type RangeValue = [Dayjs, Dayjs];

export interface QueryParams {
  current: number;
  pageSize: number;
  expr: QueryExpr;
}

export interface QueryExpr {
  work_id: string;
  username: string;
  status: number;
  real_name: '';
  export: number;
  picker?: RangeValue;
}

export interface QueryResp {
  work_id: string;
  username: string;
  status: number;
  real_name: string;
  date: string;
  export: number;
}

export interface QueryPost {
  source_id: string;
  text: string;
  export: number;
}

export interface IQueryStatus {
  status: boolean;
  export: boolean;
}

export interface IQueryListResp {
  data: QueryExpr[];
  page: number;
}

export function checkIsQuery() {
  return request.get<Res<IQueryStatus>>(`${COMMON_URI}/fetch/is_query`);
}

export function queryList(args: QueryParams, tp: string) {
  return request.put<Res<IQueryListResp>>(
    `${COMMON_URI}/audit/query/list?tp=${tp}`,
    args
  );
}

export function queryPostOrder(args: QueryPost) {
  return request.post(`${COMMON_URI}/query/post`, {
    data: args,
  });
}

export function queryAgreeOrder(work_id: string) {
  return request.post(`${COMMON_URI}/audit/query/agreed`, {
    work_id: work_id,
  });
}

export function queryRejectOrder(work_id: string) {
  return request.post(`${COMMON_URI}/audit/query/reject`, {
    work_id: work_id,
  });
}

export function queryStopOrder(work_id: string) {
  return request.post(`${COMMON_URI}/audit/query/stop`, {
    work_id: work_id,
  });
}

export function queryUndoOrder() {
  return request.post(`${COMMON_URI}/audit/query/undo`);
}

export function querySchemaList(source_id: string) {
  return request.get<Res<any>>(`${COMMON_URI}/query/schema`, {
    params: {
      source_id: source_id,
    },
  });
}

export function queryStatus() {
  return request.get<Res<boolean>>(`${COMMON_URI}/fetch/query_status`);
}

export function queryProfile(work_id: string, page: number) {
  return request.put(`${COMMON_URI}/audit/query/profile`, {
    work_id: work_id,
    page: page,
  });
}

export function queryTable(source_id: string, schema: string) {
  return request.get(`${COMMON_URI}/query/tables`, {
    params: {
      source_id: source_id,
      schema: schema,
    },
  });
}
