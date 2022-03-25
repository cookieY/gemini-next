import type { App } from 'vue';
import CTable from "@/components/table/table.vue"
import { TableColumnsType } from 'ant-design-vue';
import { commonPage } from '@/types';

const components = [CTable]

export declare const install: (app: App) => App<any>;

export interface tableRef {
      col: TableColumnsType
      data: any[]
      pageCount: number,
      expr?: any,
      fn?: any
      defaultPageSize?: number
}

export default {
      install (app: App<any>) {
            components.forEach(comp => {
                  app.component("c-table", comp)
            })
      }
}