import { COMMON_URI, request } from '@/config/request';

export function getRecordAxis() {
  return request.get(`${COMMON_URI}/record/axis`);
}
