<template>
      <PageHeader title="审核" subTitle="DML/DDL/查询工单审批及执行"></PageHeader>
      <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="order" tab="工单审批">
                  <OrderTable></OrderTable>
            </a-tab-pane>
            <a-tab-pane key="query" tab="查询审批"></a-tab-pane>
      </a-tabs>
</template>

<script lang="ts"  setup>import { ref } from "@vue/runtime-core";
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import OrderTable from "@/components/table/orderTable.vue";
const activeKey = ref("order")

</script>