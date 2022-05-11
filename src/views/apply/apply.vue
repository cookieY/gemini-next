<template>
      <a-page-header :title="$t('order.apply.title')" @back="() => $router.go(-1)" :ghost="false">
            <template #tags>
                  <a-tag color="blue">Running</a-tag>
            </template>
            <p>{{ $t('order.apply.desc') }}</p>
            <a-row type="flex" align="middle" style="text-align: center;">
                  <a-space :size="30">
                        <a-statistic :title="$t('order.apply.dml.desc')" :value="count.dml"></a-statistic>
                        <a-statistic :title="$t('order.apply.ddl.desc')" :value="count.ddl"></a-statistic>
                        <a-statistic :title="$t('order.apply.query.desc')" :value="count.query"></a-statistic>
                  </a-space>
            </a-row>
      </a-page-header>
      <a-card size="small">

            <a-tabs v-model:activeKey="activeKey">
                  <template v-for="i in tags" :key="i.key">
                        <a-tab-pane :tab="i.title">
                              <ListApp :type="i.key" :id="i.id"></ListApp>
                        </a-tab-pane>
                  </template>
                  <a-tab-pane :tab="$t('order.apply.query.tab')" key="query">
                        <QueryApp></QueryApp>
                  </a-tab-pane>
            </a-tabs>
      </a-card>


</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import ListApp from "@/components/listApp/listApp.vue";
import QueryApp from "@/components/listApp/queryApp.vue";
import { useI18n } from 'vue-i18n';
import { useStore } from "@/store";
import { Request } from "@/apis/fetchSchema";
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";

const { t } = useI18n()

const store = useStore()

const request = new Request

const activeKey = computed({
      get () {
            return store.state.menu.activeKey
      },
      set (val: string) {
            store.commit("menu/CHANGE_ACTIVE_TABS", val)
      }
})

const count = reactive<{ [key: string]: number }>({
      dml: 0,
      ddl: 0,
      query: 0
})

const tags = [
      { title: t('order.apply.dml.tab'), key: "dml", id: 1 },
      { title: t('order.apply.ddl.tab'), key: "ddl", id: 0 },
]

onMounted(() => {
      request.Source("count").then((res: AxiosResponse<Res<any>>) => {
            count.dml = res.data.payload.dml
            count.ddl = res.data.payload.ddl
            count.query = res.data.payload.query
      })
})
</script>