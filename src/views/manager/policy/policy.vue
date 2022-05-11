<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <a-card>
            <RuleTable></RuleTable>
      </a-card>
</template>
<script lang="ts" setup>
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import RuleTable from "./policyTable.vue";
const title = {
      title: "权限组",
      subTitle: "权限组管理页面"
}
</script>