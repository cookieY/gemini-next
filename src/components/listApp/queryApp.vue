<template>
  <component
    :is="com"
    :id="110"
    type="query"
    :is-export="isExport"
    @enter="clickPage"
  />
</template>

<script lang="ts" setup>
  import { Res } from '@/config/request';
  import { AxiosResponse } from 'axios';
  import { onMounted, ref, shallowRef } from 'vue';
  import { QueryPost, Request as Query } from '@/apis/query';
  import ListApp from './listApp.vue';
  import QueryBanner from './queryBanner.vue';
  import QueryOrder from './queryOrder.vue';

  const com = shallowRef<any>(QueryBanner);

  const isQuery = ref(false);

  const isExport = ref<boolean>(false);

  const query = new Query();

  const clickPage = () => {
    if (isQuery.value) {
      com.value = QueryOrder;
    } else {
      com.value = ListApp;
      query.Post({
        export: isExport.value ? 1 : 0,
      } as QueryPost);
    }
  };

  const fetchState = () => {
    query.IsQuery().then((res: AxiosResponse<Res<any>>) => {
      isQuery.value = res.data.payload.status;
      isExport.value = res.data.payload.export;
    });
  };

  onMounted(() => {
    query.QueryStatus().then((res: AxiosResponse<Res<boolean>>) => {
      !res.data.payload ? (com.value = ListApp) : fetchState();
    });
  });
</script>

<style scoped>
  .desc p {
    margin-bottom: 1em;
  }
</style>
