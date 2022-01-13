<template>
      <a-form layout="inline">
            <a-form-item>
                  <a-button @click="submit">提交回滚工单</a-button>
            </a-form-item>
      </a-form>
      <br />
      <a-collapse v-model:activeKey="activeKey" accordion>
            <a-collapse-panel key="1" header="执行结果">
                  <Table :col="col" :t-data="tData" @change="currentPage"></Table>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="回滚语句">
                  <Table :col="rolling" :t-data="rollingData" @change="currentRolling"></Table>
            </a-collapse-panel>
      </a-collapse>
</template>
<script lang="ts" setup>

import { Request } from "@/apis/orderPostApis"
import { onMounted, ref } from "vue"
import { AxiosResponse } from "axios"
import { Res } from "@/config/request"
import Table from "./table.vue"
import { useStore } from "@/store"
import { useRouter } from "vue-router"
import { EventBus } from "@/lib"

const props = defineProps<{
      work_id: string
}>()

const activeKey = ref("1")

const request = new Request

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

const rolling = [
      {
            title: "SQL语句",
            dataIndex: "sql"
      },
]

const router = useRouter()

const store = useStore()

const tData = ref([])

const rollingData = ref<any[]>([])

const currentPage = (vl: number) => {
      request.Results(props.work_id, vl).then((res: AxiosResponse<Res<any>>) => {
            tData.value = res.data.payload.record
      })
}

const currentRolling = (vl: number) => {
      request.Roll(props.work_id, vl).then((res: AxiosResponse<Res<any>>) => {
            rollingData.value = res.data.payload.sql
      })
}

const submit = () => {
      const warpper = Object.assign({}, store.state.order.order)
      warpper.sql = rollingData.value.map(item => item.sql).join("\n")
      request.Post(warpper as any).finally(() => router.go(-1))
}

onMounted(() => {
      currentPage(1)
      currentRolling(1)
})

</script>

<style>
</style>