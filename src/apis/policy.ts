import { request, COMMON_URI, Res } from '@/config/request';

export interface PolicyExpr {
  text: string;
}

export interface PolicyParams {
  page: number;
  find: PolicyExpr;
}

interface line {
  id: number;
  name: string;
}

export interface Policy extends line {
  permissions: PolicyPost;
}

export interface checkList {
  source?: string;
  source_id?: string;
}

export interface PolicyPost extends line {
  dml_source: string[];
  ddl_source: string[];
  query_source: string[];
}

export interface checkProps {
  source: checkList[];
  query: checkList[];
}

export interface PolicyResp {
  page: number;
  data: Policy[];
}

export interface PolicyRuse {
  source: checkList[];
  query: checkList[];
}

export function getPolicyList(params: PolicyParams) {
  return request.put<Res<PolicyResp>>(`${COMMON_URI}/manage/policy`, params);
}

export function getPolicySources() {
  return request.get<Res<PolicyRuse>>(`${COMMON_URI}/manage/policy/source`);
}

export function updatePolicy(params: PolicyPost) {
  return request.post(`${COMMON_URI}/manage/policy`, params);
}

export function deletePolicy(group_id: string) {
  return request.delete(`${COMMON_URI}/manage/policy?group_id=${group_id}`);
}
