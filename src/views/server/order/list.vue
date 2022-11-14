<template>
  <PageHeader :title="title.title" :sub-title="title.subTitle"></PageHeader>
  <OrderTable></OrderTable>
</template>

<script lang="ts" setup name="server/order/audit">
  import { ref } from 'vue';
  import { useRoute, onBeforeRouteUpdate } from 'vue-router';
  import PageHeader from '@/components/pageHeader/pageHeader.vue';
  import OrderTable from '@/components/table/orderTable.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const route = useRoute();

  const checkTitle = (audit: string): { [key: string]: string } => {
    return audit === 'audit'
      ? { title: t('order.order.title'), subTitle: t('order.desc.audit') }
      : { title: t('menu.order.self'), subTitle: t('order.desc.self') };
  };

  let title = ref(checkTitle(route.params.tp as string));

  onBeforeRouteUpdate((to) => {
    title.value = checkTitle(to.params.tp as string);
  });
</script>
