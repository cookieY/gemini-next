import type { App } from 'vue';
import CTable from '@/components/table/table.vue';
import { TableColumnsType } from 'ant-design-vue';
import { WebSocketResult } from '@vueuse/core';

const components = [CTable];

export declare const install: (app: App) => App<any>;

export interface tableRef {
  col: TableColumnsType;
  data: any[];
  pageCount: number;
  expr?: any;
  fn?: any;
  defaultPageSize?: number;
  isloop?: boolean;
  websocket?: WebSocketResult<any>;
}

export default {
  install(app: App<any>) {
    components.forEach((comp) => {
      app.component('CTable', comp);
    });
  },
};
