import { COMMON_URI, request } from '@/config/request';
import { AxiosPromise } from 'axios';

export class Request {
  Axis(): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/record/axis`,
    });
  }

  Post(args: any): AxiosPromise {
    return request({
      method: 'post',
      url: `${COMMON_URI}/manage/roles`,
      data: args,
    });
  }
}
