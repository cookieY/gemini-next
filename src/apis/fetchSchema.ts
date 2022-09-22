import { request, COMMON_URI } from '@/config/request';
import { AxiosPromise } from 'axios';

export interface DBRelated {
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

export class Request {
  IsQuery(): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/fetch/is_query`,
    });
  }

  IDC(): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/fetch/idc`,
    });
  }

  Source(type: string, idc?: string): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/fetch/source`,
      params: {
        tp: type,
        idc: idc,
      },
    });
  }

  Schema(source_id: string, tp?: string, hide?: boolean): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/fetch/base`,
      params: {
        source_id: source_id,
        // tp: tp,
        hide: hide,
      },
    });
  }

  Table(source_id: string, schema: string): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/fetch/table`,
      params: {
        source_id: source_id,
        data_base: schema,
      },
    });
  }

  Arch(source: TableArch): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/fetch/fields`,
      params: source,
    });
  }

  TimeLine(source_id: string): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/fetch/timeline`,
      params: {
        source_id: source_id,
      },
    });
  }

  HighLight(source_id: string): AxiosPromise {
    return request({
      method: 'get',
      url: `${COMMON_URI}/fetch/highlight`,
      params: {
        source_id: source_id,
      },
    });
  }
}
