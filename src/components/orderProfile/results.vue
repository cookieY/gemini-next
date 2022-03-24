<template>
      <a-form layout="inline">
            <a-form-item>
                  <a-space>
                        <a-popconfirm
                              :title="$t('order.profile.results.roll.tips')"
                              @confirm="submit"
                        >
                              <a-button>{{ $t("order.profile.results.commit.rollback") }}</a-button>
                        </a-popconfirm>
                        <a-popconfirm
                              :title="$t('order.profile.results.recommit.tips')"
                              @confirm="recommit"
                        >
                              <a-button>{{ $t("order.profile.results.commit.recommit") }}</a-button>
                        </a-popconfirm>
                  </a-space>
            </a-form-item>
      </a-form>
      <br />
      <a-collapse v-model:activeKey="activeKey" accordion>
            <a-collapse-panel key="1" :header="$t('order.profile.results.result')">
                  <c-table :tbl-ref="resultTable" size="small"></c-table>
            </a-collapse-panel>
            <a-collapse-panel key="2" :header="$t('order.profile.results.roll')">
                  <c-table :tbl-ref="rollTable" is-all size="small"></c-table>
            </a-collapse-panel>
      </a-collapse>
</template>
<script lang="ts" setup>

import { Request } from "@/apis/orderPostApis"
import { onMounted, reactive, ref } from "vue"
import { AxiosResponse } from "axios"
import { Res } from "@/config/request"
import { useStore } from "@/store"
import { useRouter } from "vue-router"
import { useI18n } from 'vue-i18n';
import { tableRef } from "../table"

const { t } = useI18n()

const props = defineProps<{
      work_id: string
}>()

const activeKey = ref("1")

const request = new Request

const resultTable = reactive<tableRef>({
      col: [
            {
                  title: t('common.table.sql'),
                  dataIndex: "sql",
                  ellipsis: true
            },
            {
                  title: t('common.table.result'),
                  dataIndex: "state",
            },
            {
                  title: t('common.table.rows'),
                  dataIndex: "affect_row",
            },
            {
                  title: t('common.table.time'),
                  dataIndex: "time",
            },
            {
                  title: t('common.table.error'),
                  dataIndex: "error",
            }
      ],
      data: [],
      pageCount: 0,
      fn: ({ expr, current, pageSize }) => {
            console.log(current, pageSize)
            request.Results(props.work_id, { current: current, pageSize: pageSize }).then((res: AxiosResponse<Res<any>>) => {
                  resultTable.data = res.data.payload.record
                  resultTable.pageCount = res.data.payload.count
            })
      }
})

const rollTable = reactive<tableRef>({
      col: [
            {
                  title: t('common.table.sql'),
                  dataIndex: "sql"
            }
      ],
      data: [],
      pageCount: 0,
})

const router = useRouter()

const store = useStore()

const tData = ref<any[]>([])

const rollingData = ref<any[]>([])

const currentRolling = (vl: number) => {
      request.Roll(props.work_id, vl).then((res: AxiosResponse<Res<any>>) => {
            rollTable.data = res.data.payload.sql
            rollTable.pageCount = res.data.payload.count
      })
}

const submit = () => {
      const warpper = Object.assign({}, store.state.order.order)
      warpper.sql = rollingData.value.map(item => item.sql).join("\n")
      request.Post(warpper as any).finally(() => router.go(-1))
}

const recommit = () => {
      router.push({
            name: "apply/order",
            query: {
                  type: store.state.order.order.type,
                  idc: store.state.order.order.idc,
                  source: store.state.order.order.source,
                  source_id: store.state.order.order.source_id,
                  remark: 'true'
            }
      })
      store.commit("common/ORDER_SET_SQL", tData.value.map(item => item.sql).join("\n"))
}

onMounted(() => {
      currentRolling(1)
})

</script>

<style>
</style>