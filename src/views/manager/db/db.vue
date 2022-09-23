<template>
  <PageHeader
    :title="$t('menu.manage.source')"
    :sub-title="$t('common.db.sub')"
  ></PageHeader>
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :sm="6">
      <a-card :title="$t('common.new') + ' ' + $t('menu.manage.source')">
        <DBForm></DBForm>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="18">
      <DBTable></DBTable>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import PageHeader from '@/components/pageHeader/pageHeader.vue';
  import { Request, updateUserPrincipal } from '@/apis/user';
  import { onMounted } from 'vue';
  import DBForm from './dbForm.vue';
  import DBTable from './dbTable.vue';
  import { useStore } from '@/store';
  import { AxiosResponse } from 'axios';
  import { Res } from '@/config/request';
  import { queryIDCList } from '@/apis/source';

  const store = useStore();

  const request = new Request();

  onMounted(async () => {
    const { data } = await queryIDCList();
    store.commit('common/GET_IDC', data.payload);
    store.commit('common/GET_FLOWS');
    await updateUserPrincipal();
    store.commit('common/DB_SET_PRINCIPAL', data.payload);
  });
</script>

<style scoped></style>
