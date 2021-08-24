<template>
      <a-table :columns="col" :data-source="tData"></a-table>
</template>

<script lang="ts" setup>
import auditTable from "@/mixins/auditTable";
import { reactive } from "vue"
const tData = reactive([])
const { col } = auditTable()

</script>