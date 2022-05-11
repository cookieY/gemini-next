<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <a-row>
            <a-col :xs="24" :sm="6">
                  <a-card title="新建数据源">
                        <DBForm></DBForm>
                  </a-card>
            </a-col>
            <a-col :xs="24" :sm="17" :offset="1">
                  <DBTable></DBTable>
            </a-col>
      </a-row>
</template>

<script lang="ts" setup>
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import { Request } from "@/apis/user"
import { onMounted } from "vue";
import DBForm from "./dbForm.vue"
import DBTable from "./dbTable.vue";
import { useStore } from '@/store'
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";

const title = {
      title: "数据源",
      subTitle: "数据源管理页面"
}
const store = useStore()

const request = new Request

onMounted(() => {
      store.commit("common/GET_IDC")
      store.commit("common/GET_FLOWS")
      request.Principal().then((res: AxiosResponse<Res<any>>) => {
            store.commit("common/DB_SET_PRINCIPAL", res.data.payload)
      })

})

</script>

<style scoped>
</style>