<template>
      <a-space>
            <span>查询耗时:{{ executeTime }} ms</span>
      </a-space>

      <a-tabs v-model:activeKey="activeKey">
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

import { computed, nextTick, onMounted, ref } from 'vue';
import { useStore } from '@/store';
import router from '@/router';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from 'xlsx';
import { encode, decode } from "@msgpack/msgpack";

const props = defineProps<{
      height: number
      id: string
}>()

const activeKey = ref(0)

const store = useStore()

const executeTime = ref(0)

const { t } = useI18n()

const isExport = ref(false)

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
      XLSX.writeFile(workbook, 'Yearning_Table_Data.xlsx');
}

const sock = computed(() => store.state.common.sock)

const runResults = (source_id: string, schema: string, sql: string) => {
      sock.value.race(recv)
      const encoded: Uint8Array = encode({ "type": "0", "sql": sql, "schema": schema, "source_id": source_id });
      store.commit("common/SET_SPINNING")
      sock?.value.send(encoded)
}

const recv = async (e: any) => {
      const h = e.data as Blob
      if (h.size > 0) {
            const resp = decode(await h.arrayBuffer()) as any
            if (resp.error !== "") {
                  message.error(resp.error)
            } else {
                  isExport.value = resp.export
                  resp.results.length[0] !== null ? results.value = resp.results : null
                  executeTime.value = resp.query_time
                  resp.status ? (router.go(-1), message.error(t('query.expire'))) : null
            }
      }
      store.commit("common/SET_SPINNING")
}

defineExpose({
      runResults
})


</script>