import { COMMON_URI, request } from '@/config/request';

export function updateBoardContext(text: string) {
  return request.post(`${COMMON_URI}/manage/board/post`, {
    text: text,
  });
}

export function getBoardContext() {
  return request.get(`${COMMON_URI}/board/get`);
}
