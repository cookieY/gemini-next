<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <a-card>
            <AutotaskTable></AutotaskTable>
      </a-card>

</template>
<script lang="ts" setup>
import PageHeader from '@/components/pageHeader/pageHeader.vue';
import AutotaskTable from './autotaskTable.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const title = {
      title: t('auto.title'),
      subTitle: t('auto.desc')
}
</script>