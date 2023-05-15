import { COMMON_URI, Res, request } from '@/config/request';

export function PostAnalysisGPT(sql: string) {
  return request.post<Res<any>>(`${COMMON_URI}/fetch/gpt`, {
    sql,
  });
}
