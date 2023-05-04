<template>
  <PageHeader
    :title="$t('menu.manage.source_group')"
    :sub-title="$t('common.db_group.sub')"
  ></PageHeader>
  <a-card>
    <GroupTable />
  </a-card>
</template>

<script lang="ts" setup>
  import PageHeader from '@/components/pageHeader/pageHeader.vue';
  import GroupTable from './table.vue';
</script>
