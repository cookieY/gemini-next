<template>
      <order-table-search></order-table-search>
      <a-table :columns="col" :dataSource="tData" :pagination="false" rowKey="work_id">
            <template #type="{ text }">
                  <span>{{ text === 1 ? 'DML' : 'DDL' }}</span>
            </template>
            <template #assigned="{ text }">
                  <a-tag v-for="i in text.split(',')">{{ i }}</a-tag>
            </template>
            <template #status="{ text }">
                  <state-tags :state="text"></state-tags>
            </template>
            <template #action="{ record, text }">
                  <a-button type="primary" size="small" @click="profie(record)">详情</a-button>
            </template>
      </a-table>
      <br />
      <a-pagination
            :total="pagination.pageCount"
            :page-size.sync="pagination.pageSize"
            :show-total="total => `共 ${total} 个工单`"
            v-model:current="expr.page"
            @change="currentPage"
      />
</template>

<script lang="ts" setup>
import auditTable from "@/mixins/auditTable";
import StateTags from "./stateTags.vue"
import OrderTableSearch from "./orderTableSearch.vue"
import CommonMixins from "@/mixins/common"
import { Res } from "@/config/request";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router"
import { AxiosResponse } from "axios";
import { onMounted, reactive, ref } from "vue"
import { FetchOrderTable, OrderTableResp, OrderParams, OrderExpr, OrderTableData } from "@/apis/orderTableApis"
import { useStore } from '@/store'

let tData = ref<OrderTableData[]>([])
let expr = reactive<OrderParams>({
      page: 1,
      find: {
            status: 7,
            type: 2
      } as OrderExpr
})
const { col } = auditTable()

const { pagination } = CommonMixins()

const route = useRoute()
const router = useRouter()

const store = useStore()

const currentPage = (isAudit: boolean = false) => {
      FetchOrderTable(expr, isAudit).then((res: AxiosResponse<Res<OrderTableResp>>) => {
            tData.value = res.data.payload.data
            pagination.pageCount = res.data.payload.page
      })
}

const profie = (record: OrderTableData) => {
      store.commit("order/ORDER_STORE", record)
      router.push({ path: "/server/order/profile" })
}

onBeforeRouteUpdate((to) => {
      currentPage(to.params.tp === "audit")
})


onMounted(() => {
      currentPage(route.params.tp === "audit")
})

</script>