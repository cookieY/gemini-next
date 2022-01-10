<template>
      <p>查询耗时:{{ executeTime }} ms</p>
      <a-table
            bordered
            :columns="col"
            :dataSource="tData"
            :scroll="{ x: maxWidth, y: props.height }"
            @resizeColumn="handleResizeColumn"
      ></a-table>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { Request } from "@/apis/query";
import { AxiosResponse } from 'axios';
import { Res } from '@/config/request';

const props = defineProps<{
      height: number
}>()

const col = ref([])

const tData = ref([])

const maxWidth = ref(1000)

const request = new Request

const executeTime = ref(0)

const handleResizeColumn = (w: number, col: { width: number }) => {
      col.width = w;
}

const runResults = (source_id: string, schema: string, sql: string) => {
      request.QueryData(source_id, schema, sql).then((res: AxiosResponse<Res<any>>) => {
            col.value = res.data.payload.title
            tData.value = res.data.payload.data
            maxWidth.value = res.data.payload.title.length * 200
            executeTime.value = res.data.payload.time
      })
}

defineExpose({
      runResults
})


</script>