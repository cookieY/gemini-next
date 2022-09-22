import { COMMON_URI, request } from '@/config/request';
import { AxiosPromise } from 'axios';
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

export class Request {
  Get(): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/manage/setting`,
    });
  }

  Test(tp: string, testArgs: Settings): AxiosPromise {
    return request({
      method: 'put',
      url: `${COMMON_URI}/manage/setting`,
      params: { test: tp },
      data: testArgs,
    });
  }

  Post(args: Settings): AxiosPromise {
    return request({
      method: 'post',
      url: `${COMMON_URI}/manage/setting`,
      data: args,
    });
  }

  Delete(args: DeleteOrder): AxiosPromise {
    return request({
      method: 'delete',
      url: `${COMMON_URI}/manage/setting`,
      data: args,
    });
  }
}
