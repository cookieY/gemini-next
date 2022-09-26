import { request, COMMON_URI } from '@/config/request';

export function getBannerContext() {
  return request.get(`${COMMON_URI}/dash/banner`);
}

export function getTopContext() {
  return request.get(`${COMMON_URI}/dash/top`);
}
