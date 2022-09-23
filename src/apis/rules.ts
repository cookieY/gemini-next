import { COMMON_URI, request } from '@/config/request';
import { AxiosPromise } from 'axios';

export interface Rules {
  [key: string]: string | number | boolean;
}

export function getRulesList(): AxiosPromise<Rules> {
  return request.get(`${COMMON_URI}/manage/roles`);
}

export function updateRules(params: Rules): AxiosPromise {
  return request.post(`${COMMON_URI}/manage/roles`, params);
}
