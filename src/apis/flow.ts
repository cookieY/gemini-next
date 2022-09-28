import { request, COMMON_URI, Res } from '@/config/request';
import { AuditorList } from '@/types';

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

export function createFlow(args: RespSteps) {
  return request.post(`${COMMON_URI}/manage/tpl`, args);
}

export function getFlowProfile(id: number) {
  return request.put<Res<RespSteps>>(`${COMMON_URI}/manage/tpl`, { id: id });
}

export function getFlowList() {
  return request.get<Res<RespTPLs[]>>(`${COMMON_URI}/manage/tpl?tp=flow`);
}

export function getFlowUsers() {
  return request.get<Res<AuditorList[]>>(`${COMMON_URI}/manage/tpl?tp=user`);
}

export function deleteFlow(id: number) {
  return request.delete(`${COMMON_URI}/manage/tpl?id=${id}`);
}
