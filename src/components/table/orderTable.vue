<template lang="pug">
order-table-search(@search="(exp) => { tblRef.expr = exp; tbl.manual() }")
c-table(:tblRef="tblRef" ref="tbl")
      template(#bodyCell="{ column, text, record }")
            template(v-if="column.dataIndex === 'type'")
                  span {{ text === 0 ? 'DDL' : 'DML' }}
            template(v-if="column.dataIndex === 'assigned'")
                  a-tag(v-for="i in text.split(',')")
                        | {{ i }}
            template(v-if="column.dataIndex === 'delay'")
                  | {{ text === 'none' ? $t('order.table.delay') : text }}
            template(v-if="column.dataIndex === 'status'")
                  state-tags(:state="text")
            template(v-if="column.dataIndex === 'action'")
                  a-button(type="primary" size="small" @click="profie(record)")
                        | {{ $t('common.profile') }}
</template>

<script lang="ts" setup>
import StateTags from "./stateTags.vue"
import OrderTableSearch from "./orderTableSearch.vue"
import { Res } from "@/config/request";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router"
import { AxiosResponse } from "axios";
import { onMounted, reactive, ref } from "vue"
import { Request, OrderTableResp, OrderExpr, OrderParams, } from "@/apis/orderPostApis"
import { OrderTableData } from '@/types'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n';
import { tableRef } from ".";

const { t } = useI18n()

const tblRef = reactive<tableRef>({
      col: [
            {
                  title: t('common.table.work_id'),
                  dataIndex: 'work_id',
                  width: 200
            },
            {
                  title: t('common.table.remark'),
                  dataIndex: 'text',
                  ellipsis: true
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
      ],
      data: [] as OrderTableData[],
      pageCount: 0,
      defaultPageSize: 20,
      expr: {
            status: 7,
            type: 2,
            text: "",
            picker: [] as string[],
            username: ""
      } as OrderExpr,
      fn: (expr: OrderParams) => {
            request.List(expr, isAudit.value).then((res: AxiosResponse<Res<OrderTableResp>>) => {
                  tblRef.data = res.data.payload.data
                  tblRef.pageCount = res.data.payload.page
            })
      }
})

const route = useRoute()

const router = useRouter()

const store = useStore()

const request = new Request

const tbl = ref()

const isAudit = ref(false)

const profie = (record: OrderTableData) => {
      store.commit("order/ORDER_STORE", record)
      router.push({ path: route.params.tp === "audit" ? "/server/order/audit/profile" : "/server/order/common/profile" })
}

onBeforeRouteUpdate((to) => {
      isAudit.value = to.params.tp === "audit"
      tbl.value.manual()
})


onMounted(() => {
      isAudit.value = route.params.tp === "audit"
})

</script>