import { request, COMMON_URI } from '@/config/request';
import { AxiosPromise } from 'axios';

export interface Steps {
  desc: string;
  auditor: string[];
  type?: number;
  edit?: boolean;
}

export interface RespSteps {
  id: number;
  source: string;
  steps: Steps[];
}

export interface RespTPLs {
  id: number;
  source: string;
}

export class Request {
  Post(args: RespSteps): AxiosPromise {
    return request({
      method: 'post',
      data: args,
      url: `${COMMON_URI}/manage/tpl`,
    });
  }

  Profile(id: number): AxiosPromise {
    return request({
      method: 'put',
      url: `${COMMON_URI}/manage/tpl`,
      data: {
        id: id,
      },
    });
  }

  List(): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/manage/tpl`,
      params: {
        tp: 'flow',
      },
    });
  }

  User(): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/manage/tpl`,
      params: {
        tp: 'user',
      },
    });
  }

  Delete(args: string): AxiosPromise {
    return request({
      method: 'DELETE',
      url: `${COMMON_URI}/manage/tpl`,
      params: {
        id: args,
      },
    });
  }
}
