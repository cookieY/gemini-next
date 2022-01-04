<template>
      <a-table :columns="col" bordered size="small" :dataSource="tData"></a-table>
</template>
<script lang="ts" setup>

import { onMounted, ref } from "vue"

const col = [
      {
            title: "SQL语句",
            dataIndex: "sql"
      },
      {
            title: "执行结果",
            dataIndex: "state"
      },
      {
            title: "执行行数",
            dataIndex: "affectrow"
      },
      {
            title: "执行时间",
            dataIndex: "time"
      }
]


onMounted(() => {

})

</script>

<style>
</style>