<template>
      <order-table-search
            @search="(exp) => { expr.find = exp; expr.page = 1; currentPage(route.params.tp === 'audit') }"
      ></order-table-search>
      <a-table :columns="col" :dataSource="tData" :pagination="false" rowKey="work_id" bordered>
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'type'">
                        <span>{{ text === 0 ? 'DDL' : 'DML' }}</span>
                  </template>
                  <template v-if="column.dataIndex === 'assigned'">
                        <a-tag v-for="i in text.split(',')">{{ i }}</a-tag>
                  </template>
                  <template v-if="column.dataIndex === 'status'">
                        <state-tags :state="text"></state-tags>
                  </template>
                  <template v-if="column.dataIndex === 'action'">
                        <a-button
                              type="primary"
                              size="small"
                              @click="profie(record)"
                        >{{ $t('common.profile') }}</a-button>
                  </template>
            </template>
      </a-table>
      <br />
      <a-pagination
            :total="pagination.pageCount"
            :page-size.sync="pagination.pageSize"
            :show-total="total => $t('common.count', { 'count': total })"
            v-model:current="expr.page"
            @change="currentPage(route.params.tp === 'audit')"
      />
</template>

<script lang="ts" setup>
import StateTags from "./stateTags.vue"
import OrderTableSearch from "./orderTableSearch.vue"
import CommonMixins from "@/mixins/common"
import { Res } from "@/config/request";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router"
import { AxiosResponse } from "axios";
import { onMounted, reactive, ref } from "vue"
import { Request, OrderTableResp, OrderParams, OrderExpr, } from "@/apis/orderPostApis"
import { OrderTableData } from '@/types'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

let tData = ref<OrderTableData[]>([])

let expr = reactive<OrderParams>({
      page: 1,
      find: {
            status: 7,
            type: 2
      } as OrderExpr
})

const col = [
      {
            title: t('common.table.work_id'),
            dataIndex: 'work_id',
            width: 200
      },
      {
            title: t('common.table.remark'),
            dataIndex: 'text',
      },
      {
            title: t('common.table.type'),
            dataIndex: 'type',
      },
      {
            title: t('common.table.post.time'),
            dataIndex: 'date',
      },
      {
            title: t('common.table.post.user'),
            dataIndex: 'username',
      },
      {
            title: t('common.table.post.real_name'),
            dataIndex: 'real_name',

      },
      {
            title: t('order.profile.timing'),
            dataIndex: 'delay',
      },
      {
            title: t('order.profile.auditor'),
            dataIndex: 'assigned',
      },
      {
            title: t('common.table.state'),
            dataIndex: 'status',

      },
      {
            title: t('common.action'),
            dataIndex: 'action',
            width: 200,
      }
];

const { pagination } = CommonMixins()

const route = useRoute()

const router = useRouter()

const store = useStore()

const request = new Request

const currentPage = (isAudit: boolean = false) => {
      request.List(expr, isAudit).then((res: AxiosResponse<Res<OrderTableResp>>) => {
            tData.value = res.data.payload.data
            pagination.pageCount = res.data.payload.page
      })
}

const profie = (record: OrderTableData) => {
      store.commit("order/ORDER_STORE", record)
      router.push({ path: route.params.tp === "audit" ? "/server/order/audit/profile" : "/server/order/common/profile" })
}

onBeforeRouteUpdate((to) => {
      currentPage(to.params.tp === "audit")
})


onMounted(() => {
      currentPage(route.params.tp === "audit")
})

</script>