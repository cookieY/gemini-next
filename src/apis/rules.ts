import { COMMON_URI, Res, request } from '@/config/request';
import { AxiosPromise } from 'axios';

export interface Rules {
  [key: string]: string | number | boolean;
}

export interface CustomRule {
  id?: number;
  desc: string;
  audit_role: Rules;
}

export function getRulesList(): AxiosPromise<Rules> {
  return request.post(`${COMMON_URI}/manage/roles/global`);
}

export function updateGlobalRules(params: Rules): AxiosPromise {
  return request.post(`${COMMON_URI}/manage/roles/global_updated`, params);
}

export function getCustomRulesList(): AxiosPromise<Res<CustomRule[]>> {
  return request.post(`${COMMON_URI}/manage/roles/list`);
}

export function updateRules(params: CustomRule): AxiosPromise {
  return request.post(`${COMMON_URI}/manage/roles/updated`, params);
}

export function addRules(params: CustomRule): AxiosPromise {
  return request.post(`${COMMON_URI}/manage/roles/add`, params);
}

export function deleteRules(params: CustomRule): AxiosPromise {
  return request.post(`${COMMON_URI}/manage/roles/delete`, params);
}

export function getRuleProfile(params: CustomRule): AxiosPromise {
  return request.post(`${COMMON_URI}/manage/roles/profile`, params);
}
