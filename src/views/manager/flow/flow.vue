<template>
      <PageHeader :title="$t('menu.manage.flow')" :subTitle="$t('common.flow.sub')"></PageHeader>
      <a-card>
            <FlowTable></FlowTable>
      </a-card>

</template>
<script lang="ts" setup>
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import FlowTable from "./flowTable.vue";
</script>