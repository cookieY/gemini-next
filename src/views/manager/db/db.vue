<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <a-row>
            <a-col :xs="24" :sm="6">
                  <a-divider orientation="left">新建数据源</a-divider>
                  <DBForm></DBForm>
            </a-col>
            <a-col :xs="24" :sm="17" :offset="1">
                  <DBTableVue></DBTableVue>
            </a-col>
      </a-row>
</template>

<script lang="ts" setup>
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import { onMounted } from "vue";
import DBForm from "./dbForm.vue"
import DBTableVue from "./dbTable.vue";
import { useStore } from '@/store'

const title = {
      title: "数据源",
      subTitle: "数据源管理页面"
}
const store = useStore()

onMounted(() => {
      store.commit("common/GET_IDC")
      store.commit("common/GET_FLOWS")
})

</script>

<style scoped>
</style>