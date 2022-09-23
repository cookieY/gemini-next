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
  import { onMounted, ref, shallowRef } from 'vue';
  import {
    checkIsQuery,
    IQueryStatus,
    QueryPost,
    queryPostOrder,
    queryStatus,
  } from '@/apis/query';
  import ListApp from './listApp.vue';
  import QueryBanner from './queryBanner.vue';
  import QueryOrder from './queryOrder.vue';

  const com = shallowRef<any>(QueryBanner);

  const state = ref<IQueryStatus>({
    export: false,
    status: false,
  });

  const clickPage = () => {
    if (state.value.status) {
      com.value = QueryOrder;
    } else {
      com.value = ListApp;
      queryPostOrder({ export: state.value.export ? 1 : 0 } as QueryPost);
    }
  };

  const fetchState = async () => {
    const { data } = await checkIsQuery();
    state.value = data.payload;
  };

  onMounted(async () => {
    const { data } = await queryStatus();
    !data.payload ? (com.value = ListApp) : fetchState();
  });
</script>

<style scoped>
  .desc p {
    margin-bottom: 1em;
  }
</style>
