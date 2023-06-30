import { request, COMMON_URI, Res } from '@/config/request';

export interface IDBRelated {
  results: string[];
  highlight: { [key: string]: string }[];
}

export interface Timeline {
  desc: string;
  auditor: string[];
  type: number;
}

export interface TableArch {
  source?: string;
  data_base: string;
  table: string;
  source_id?: string;
}

export interface ISource {
  source: string;
  source_id: string;
}

export interface IKindCount {
  dml: number;
  ddl: number;
  query: number;
}

export interface ITableArch {
  rows: never[];
  idx: never[];
}

export function querySourceList(type: string, idc?: string) {
  return request.get<Res<ISource[] | IKindCount>>(
    `${COMMON_URI}/fetch/source`,
    {
      params: {
        tp: type,
        idc: idc,
      },
    }
  );
}

export function queryIDCList() {
  return request.get<Res<string[]>>(`${COMMON_URI}/fetch/idc`);
}

export function querySchemaList(source_id: string, hide?: boolean) {
  return request.get<Res<string[]>>(`${COMMON_URI}/fetch/base`, {
    params: {
      source_id: source_id,
      hide: hide,
    },
  });
}

export function queryTableList(source_id: string, schema: string) {
  return request.get<Res<string[]>>(`${COMMON_URI}/fetch/table`, {
    params: {
      source_id: source_id,
      data_base: schema,
    },
  });
}

export function queryTableArch(source: TableArch) {
  return request.get<Res<ITableArch>>(`${COMMON_URI}/fetch/fields`, {
    params: source,
  });
}

export function queryTimeline(source_id: string, work_id: string) {
  return request.get<Res<Timeline[]>>(`${COMMON_URI}/fetch/timeline`, {
    params: {
      source_id: source_id,
      work_id: work_id,
    },
  });
}

export function queryHighlight(source_id: string) {
  return request.get<Res<[]>>(`${COMMON_URI}/fetch/highlight`, {
    params: {
      source_id: source_id,
    },
  });
}
