<template>
      <a-card>
            <a-page-header title="工单申请" @back="() => $router.go(-1)">
                  <template #tags>
                        <a-tag color="blue">Running</a-tag>
                  </template>
                  <p>DML/DDL/查询工单申请及提交</p>
                  <a-row type="flex" align="middle" style="text-align: center;">
                        <a-space :size="30">
                              <a-statistic title="可申请的DML数据源" :value="8" />
                              <a-statistic title="可申请的DDL数据源" :value="8" />
                              <a-statistic title="可查询的数据源" :value="8" />
                        </a-space>
                  </a-row>
            </a-page-header>
      </a-card>

      <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="dml" tab="DML工单申请">
                  <div>
                        <ListApp :source="source"></ListApp>
                  </div>
            </a-tab-pane>
            <a-tab-pane key="ddl" tab="DDL工单申请">
                  <ListApp :source="source"></ListApp>
            </a-tab-pane>
            <a-tab-pane key="query" tab="查询申请">
                  <ListApp :source="source"></ListApp>
            </a-tab-pane>
      </a-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ListApp from "@/components/listApp/listApp.vue";

const activeKey = ref("dml")

const source = [
      {
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
            title: "Alipay"
      },
      {
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
            title: "Alipay"
      },
      {
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
            title: "Alipay"
      },
      {
            avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
            title: "test-db",
            idc: "aliyun"
      },

]
const tags = [
      { title: "收藏", key: "favorite" },
      { title: "表数据修改", key: "dml" },
      { title: "表结构更改", key: "ddl" },
      { title: "查询", key: "query" }
]

</script>