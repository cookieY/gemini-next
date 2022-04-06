<template lang="pug">
a-page-header(:title="$t('order.apply.title')" @back="() => $router.go(-1)")
      template(#tags)
            a-tag(color="blue")
                  | Running
      p {{ $t('order.apply.desc') }}
      a-row(type="flex" align="middle" style="text-align: center;")
            a-space(:size="30")
                  a-statistic(:title="$t('order.apply.dml.desc')" :value="count.dml")
                  a-statistic(:title="$t('order.apply.ddl.desc')" :value="count.ddl")
                  a-statistic(:title="$t('order.apply.query.desc')" :value="count.query")
a-tabs(v-model:activeKey="activeKey")
      template(v-for="i in tags" :key="i.key")
            a-tab-pane(:tab="i.title")
                  ListApp(:type="i.key" :id="i.id")
      a-tab-pane(:tab="$t('order.apply.query.tab')" key="query")
            QueryApp
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