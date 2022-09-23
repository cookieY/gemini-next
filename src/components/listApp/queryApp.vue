<template>
  <component
    :is="com"
    :id="110"
    type="query"
    :is-export="state.export"
    @enter="clickPage"
  />
</template>

<script lang="ts" setup>
  import { Res } from '@/config/request';
  import { AxiosResponse } from 'axios';
  import { onMounted, ref, shallowRef } from 'vue';
  import {
    checkIsQuery,
    IQueryStatus,
    QueryPost,
    Request as Query,
  } from '@/apis/query';
  import ListApp from './listApp.vue';
  import QueryBanner from './queryBanner.vue';
  import QueryOrder from './queryOrder.vue';

  const com = shallowRef<any>(QueryBanner);

  const state = ref<IQueryStatus>({
    export: false,
    status: false,
  });

  const query = new Query();

  const clickPage = () => {
    if (state.value.status) {
      com.value = QueryOrder;
    } else {
      com.value = ListApp;
      query.Post({
        export: state.value.export ? 1 : 0,
      } as QueryPost);
    }
  };

  const fetchState = async () => {
    const { data } = await checkIsQuery();
    state.value = data.payload;
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
