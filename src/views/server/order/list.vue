<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <OrderTable :audit-order="isAudit"></OrderTable>
</template>

<script lang="ts"  setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import OrderTable from "@/components/table/orderTable.vue";
import router from "@/router";

const title: { [key: string]: string } = router.currentRoute.value.params.tp === "audit" ? { title: "工单审核", subTitle: "DML/DDL工单审批及执行" } : { title: "我的工单", subTitle: "我的DML/DDL工单查看" }

const isAudit = computed(() => {
      return router.currentRoute.value.params.tp === "audit"
})



onMounted(() => {

})

</script>