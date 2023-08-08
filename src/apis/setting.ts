import { COMMON_URI, request, Res } from '@/config/request';
import { Dayjs } from 'dayjs';

export interface Message {
  web_hook: string;
  key: string;
  host: string;
  ssl: boolean;
  port: number;
  user: string;
  password: string;
  to_user: string;
  mail: boolean;
  ding: boolean;
}

export interface LDAP {
  url: string;
  ldaps: boolean;
  user: string;
  password: string;
  type: string;
  sc: string;
  map: string;
  test_user: string;
  test_password: string;
}

export interface Other {
  limit: number;
  idc: string[];
  force: string;
  query: boolean;
  ex_query_time: number;
  query_expire: Dayjs[];
  overdue: Dayjs[];
  export: boolean;
  register: boolean;
  close_ai: string;
  proxy: string;
  domain: string;
}

export interface Settings {
  message: Message;
  ldap: LDAP;
  other: Other;
}

export interface DeleteOrder {
  date: string[];
  tp: boolean;
}

export function getSettingInfo() {
  return request.get<Res<Settings>>(`${COMMON_URI}/manage/setting`);
}

export function testMessageHook(tp: string, testArgs: Settings) {
  return request.put(`${COMMON_URI}/manage/setting?test=${tp}`, testArgs);
}

export function updateSettingInfo(params: Settings) {
  return request.post(`${COMMON_URI}/manage/setting`, params);
}

export function deleteOrderRecords(args: DeleteOrder) {
  return request.delete(`${COMMON_URI}/manage/setting`, {
    data: args,
  });
}
