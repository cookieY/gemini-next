<template>
      <a-table :columns="col" bordered size="small" :dataSource="tData" :pagination="false"></a-table>
      <br />
      <a-pagination
            :total="pagination.pageCount"
            :page-size.sync="pagination.pageSize"
            :show-total="(total) => `共 ${total} 个工单`"
            v-model:current="page"
            @change="currentPage"
      />
</template>
<script lang="ts" setup>

import { Request } from "@/apis/orderPostApis"
import { onMounted, ref } from "vue"
import CommonMixins from "@/mixins/common"
import { AxiosResponse } from "axios"
import { Res } from "@/config/request"

const props = defineProps<{
      work_id: string
}>()

const request = new Request

const page = ref(1)

const col = [
      {
            title: "SQL语句",
            dataIndex: "sql"
      },
      {
            title: "执行结果",
            dataIndex: "state"
      },
      {
            title: "执行行数",
            dataIndex: "affect_row"
      },
      {
            title: "执行时间",
            dataIndex: "time"
      }
]

const tData = ref([])

const { pagination } = CommonMixins()

const currentPage = () => {
      request.Results(props.work_id, page.value).then((res: AxiosResponse<Res<any>>) => {
            tData.value = res.data.payload.record
            pagination.pageCount = res.data.payload.count
      })
}

onMounted(() => {
      currentPage()
})

</script>

<style>
</style>