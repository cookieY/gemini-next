<template>
      <a-space>
            <span>查询耗时:{{ executeTime }} ms</span>
      </a-space>

      <a-tabs :activeKey="0">
            <a-tab-pane :key="idx" :tab="`结果 ${idx}`" v-for="(i, idx) in results">
                  <template v-if="isExport">
                        <a-button size="small" type="primary" ghost @click="downloadXLS(i.data)">导出</a-button>
                        <br />
                        <br />
                  </template>
                  <a-table
                        bordered
                        :columns="i.field"
                        :dataSource="i.data"
                        :scroll="{ x: i.length * 200, y: props.height }"
                        @resizeColumn="handleResizeColumn"
                  ></a-table>
            </a-tab-pane>
      </a-tabs>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { Request } from "@/apis/query";
import { AxiosResponse } from 'axios';
import { Res } from '@/config/request';
import { useStore } from '@/store';
import router from '@/router';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from 'xlsx';

const props = defineProps<{
      height: number
      isExport?: boolean
}>()

const request = new Request

const store = useStore()

const executeTime = ref(0)

const { t } = useI18n()

let results = ref<any[]>([])

const handleResizeColumn = (w: number, col: { width: number }) => {
      col.width = w;
}

const downloadXLS = (data: any) => {
      const options = {
            '!cols': [
                  { wpx: 100 },
                  { wpx: 100 },
                  { wpx: 100 },
                  { wpx: 100 },
                  { wpx: 100 },
            ]
      };
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      worksheet['!cols'] = options['!cols'];
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, '排庭表.xlsx');
}

const runResults = (source_id: string, schema: string, sql: string) => {
      store.commit("common/SET_SPINNING")
      request.QueryData(source_id, schema, sql).then((res: AxiosResponse<Res<any>>) => {
            results.value = res.data.payload.results
            executeTime.value = res.data.payload.query_time
            res.data.payload.status ? (router.go(-1), message.error(t('query.expire'))) : null
      }).finally(() => store.commit("common/SET_SPINNING"))
}

defineExpose({
      runResults
})


</script>