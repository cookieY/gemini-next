<template>
  <a-modal
    v-model:visible="is_open"
    :title="$t('query.query.switch')"
    @ok="saveHandle"
  >
    <a-list
      item-layout="horizontal"
      :data-source="source"
      :row-key="(item:any) => item.source_id"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <router-link
                :to="{
                  path: '/apply/query',
                  query: {
                    idc: item.idc,
                    source: item.source,
                    source_id: item.source_id,
                  },
                }"
                replace
              >
                {{ item.source }}</router-link
              >
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ISource, querySourceList } from '@/apis/source';
  import CommonMixins from '@/mixins/common';
  import { onMounted, ref } from 'vue';
  import { onBeforeRouteUpdate } from 'vue-router';

  const { is_open, turnState } = CommonMixins();

  const source = ref([] as ISource[]);

  const saveHandle = () => {
    turnState();
  };

  onBeforeRouteUpdate(() => {
    turnState();
  });

  onMounted(async () => {
    const { data } = await querySourceList('query');
    source.value = data.payload as ISource[];
  });

  defineExpose({
    turnState,
  });
</script>
