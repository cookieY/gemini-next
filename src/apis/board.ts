import { COMMON_URI, request } from '@/config/request';
import { AxiosPromise } from 'axios';

export class Request {
  Post(vl: string): AxiosPromise {
    return request({
      method: 'post',
      url: `${COMMON_URI}/manage/board/post`,
      data: {
        board: vl,
      },
    });
  }

  Get(): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/board/get`,
    });
  }
}
