<template>
      <a-page-header title="工单申请" @back="() => $router.go(-1)">
            <template #tags>
                  <a-tag color="blue">Running</a-tag>
            </template>
            <p>DML/DDL/查询工单申请及提交</p>
            <a-row type="flex" align="middle" style="text-align: center;">
                  <a-space :size="30">
                        <a-statistic title="可申请的DML数据源" :value="count.dml" />
                        <a-statistic title="可申请的DDL数据源" :value="count.ddl" />
                        <a-statistic title="可查询的数据源" :value="count.query" />
                  </a-space>
            </a-row>
      </a-page-header>

      <a-tabs v-model:activeKey="activeKey">
            <template v-for="i in tags" :key="i.key">
                  <a-tab-pane :tab="i.title">
                        <ListApp :type="i.key" @RespIsOk="(length) => count[i.key] = length"></ListApp>
                  </a-tab-pane>
            </template>
      </a-tabs>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import ListApp from "@/components/listApp/listApp.vue";

const activeKey = ref("dml")

const count = reactive<{ [key: string]: number }>({
      dml: 0,
      ddl: 0,
      query: 0
})

const tags = [
      { title: "表数据修改", key: "dml" },
      { title: "表结构更改", key: "ddl" },
      { title: "查询", key: "query" }
]

</script>