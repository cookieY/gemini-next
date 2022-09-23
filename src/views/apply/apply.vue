<template>
  <div>
    <a-page-header
      :title="$t('order.apply.title')"
      :ghost="false"
      @back="() => $router.go(-1)"
    >
      <template #tags>
        <a-tag color="blue">Running</a-tag>
      </template>
      <p>{{ $t('order.apply.desc') }}</p>
      <a-row type="flex" align="middle" style="text-align: center">
        <a-space :size="30">
          <a-statistic
            :title="$t('order.apply.dml.desc')"
            :value="count.dml"
          ></a-statistic>
          <a-statistic
            :title="$t('order.apply.ddl.desc')"
            :value="count.ddl"
          ></a-statistic>
          <a-statistic
            :title="$t('order.apply.query.desc')"
            :value="count.query"
          ></a-statistic>
        </a-space>
      </a-row>
    </a-page-header>
    <a-card size="small">
      <a-tabs v-model:activeKey="activeKey">
        <template v-for="i in tags" :key="i.key">
          <a-tab-pane :tab="i.title">
            <ListApp :id="i.id" :type="i.key"></ListApp>
          </a-tab-pane>
        </template>
        <a-tab-pane key="query" :tab="$t('order.apply.query.tab')">
          <QueryApp></QueryApp>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import ListApp from '@/components/listApp/listApp.vue';
  import QueryApp from '@/components/listApp/queryApp.vue';
  import { useI18n } from 'vue-i18n';
  import { useStore } from '@/store';
  import { querySourceList, IKindCount } from '@/apis/source';

  const { t } = useI18n();

  const store = useStore();

  const activeKey = computed({
    get() {
      return store.state.menu.activeKey;
    },
    set(val: string) {
      store.commit('menu/CHANGE_ACTIVE_TABS', val);
    },
  });

  const count = ref<IKindCount>({
    dml: 0,
    ddl: 0,
    query: 0,
  });

  const tags = [
    { title: t('order.apply.dml.tab'), key: 'dml', id: 1 },
    { title: t('order.apply.ddl.tab'), key: 'ddl', id: 0 },
  ];

  onMounted(async () => {
    const { data } = await querySourceList('count');
    count.value = data.payload as IKindCount;
  });
</script>
