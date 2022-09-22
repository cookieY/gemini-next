// 公共引用的type

export interface LoginRespPayload {
  token: string;
  real_name: string;
  rule: string;
  user: string;
  is_record: number;
}

export enum OrderState {
  REJECT = 0,
  SUCCESS,
  AUDIT,
  PROCESS,
  ERROR,
  WAIT,
  Undo,
}

export enum QueryState {
  AUDIT = 1,
  PROCESS,
  DONE,
  REJECT,
}

export interface Template {
  auditor: string[];
  type: number;
  desc: string;
  source?: string;
}

export interface OrderTableData {
  work_id: string;
  username: string;
  text: string;
  backup: number;
  date: string;
  real_name: string;
  executor: string;
  status: number;
  type: number;
  delay: string;
  source: string;
  idc: string;
  data_base: string;
  table: string;
  execute_time: string;
  assigned: string;
  current_step: number;
  relevant: [];
  source_id?: string;
  sql?: string;
  file?: string;
}

export interface OrderItem {
  type: string | number;
  idc: string;
  source: string;
  source_id: string;
  data_base: string;
  table: string;
  delay: string;
  text: string;
  backup: number;
  sql?: string;
  relevant: string[];
}

export interface SQLTesting {
  status: number;
  level: number;
  error: string;
  sql: string;
  affect_rows: string;
}

export interface AuditorList {
  username: string;
  real_name: string;
}

export interface LabelInValue {
  label: string;
  value: string;
}

export interface Clip {
  title: string;
  desc: string;
}

export interface commonPage<T> {
  expr: T;
  current: number;
  page_size: number;
}
