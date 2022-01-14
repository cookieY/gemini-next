<template>
      <a-page-header :title="$t('order.apply.title')" @back="() => $router.go(-1)">
            <template #tags>
                  <a-tag color="blue">Running</a-tag>
            </template>
            <p>{{ $t('order.apply.desc') }}</p>
            <a-row type="flex" align="middle" style="text-align: center;">
                  <a-space :size="30">
                        <a-statistic :title="$t('order.apply.dml.desc')" :value="count.dml" />
                        <a-statistic :title="$t('order.apply.ddl.desc')" :value="count.ddl" />
                        <a-statistic :title="$t('order.apply.query.desc')" :value="count.query" />
                  </a-space>
            </a-row>
      </a-page-header>

      <a-tabs v-model:activeKey="activeKey">
            <template v-for="i in tags" :key="i.key">
                  <a-tab-pane :tab="i.title">
                        <ListApp
                              :type="i.key"
                              :id="i.id"
                              @RespIsOk="(length) => count[i.key] = length"
                        ></ListApp>
                  </a-tab-pane>
            </template>
      </a-tabs>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import ListApp from "@/components/listApp/listApp.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const activeKey = ref("dml")

const count = reactive<{ [key: string]: number }>({
      dml: 0,
      ddl: 0,
      query: 0
})

const tags = [
      { title: t('order.apply.dml.tab'), key: "dml", id: 1 },
      { title: t('order.apply.ddl.tab'), key: "ddl", id: 0 },
      { title: t('order.apply.query.tab'), key: "query", id: 2 }
]

</script>