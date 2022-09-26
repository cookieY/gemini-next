import { request, COMMON_URI, Res } from '@/config/request';

export interface Source {
  idc: string;
  source: string;
  ip: string;
  port: number;
  username: string;
  password: string;
  is_query: number;
  flow_id: number;
  source_id: string;
  exclude_db_list: string;
  insulate_word_list: string;
  principal: string;
}

export interface DBParams {
  page: number;
  find: DBExpr;
}

export interface DBExpr {
  idc: string;
  source: string;
  ip: string;
  is_query: number;
}

export interface DBResp {
  data: Source[];
  page: number;
}

export interface RequestDB {
  tp: string;
  db: Source[] | Source;
  encrypt?: boolean;
}

export function getSourceList(args: DBParams) {
  return request.put<Res<DBResp>>(`${COMMON_URI}/manage/db`, args);
}

export function deleteSource(id: string) {
  return request.delete(`${COMMON_URI}/manage/db?source_id=${id}`);
}

export function createSource(args: RequestDB) {
  return request.post(`${COMMON_URI}/manage/db`, args);
}
