<template>
      <p>查询耗时:{{ executeTime }} ms</p>
      <a-tabs :activeKey="0">
            <a-tab-pane :key="idx" :tab="`结果 ${idx}`" v-for="(i, idx) in results">
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

const props = defineProps<{
      height: number
}>()

const request = new Request

const store = useStore()

const executeTime = ref(0)

const { t } = useI18n()

let results = ref<any[]>([])

const handleResizeColumn = (w: number, col: { width: number }) => {
      col.width = w;
}

const runResults = (source_id: string, schema: string, sql: string) => {
      store.commit("common/SET_SPINNING")
      request.QueryData(source_id, schema, sql).then((res: AxiosResponse<Res<any>>) => {
            results.value = res.data.payload.results
            executeTime.value = res.data.payload.query_time
                  (router.go(-1), message.error(t('query.expire'))) ? res.data.payload.status : null
      }).finally(() => store.commit("common/SET_SPINNING"))
}

defineExpose({
      runResults
})


</script>