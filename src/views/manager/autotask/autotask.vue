<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <AutotaskTable></AutotaskTable>
</template>
<script lang="ts" setup>
import PageHeader from '@/components/pageHeader/pageHeader.vue';
import AutotaskTable from './autotaskTable.vue';

const title = {
      title: "自动化任务",
      subTitle: "配置相关任务后可以对符合条件的SQL语句自动执行,无需执行人手动执行"
}
</script>