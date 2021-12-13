<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <FlowTable></FlowTable>
</template>
<script lang="ts" setup>
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import FlowTable from "./flowTable.vue";
const title = {
      title: "流程",
      subTitle: "流程管理页面"
}
</script>