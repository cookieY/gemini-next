<template>
      <a-table :columns="col" size="small" :dataSource="tData" :pagination="false"></a-table>
      <br />
      <a-pagination
            :total="page"
            :page-size.sync="pagination.pageSize"
            :show-total="(total) => `共 ${total} 个工单`"
            @change="currentPage"
      />
</template>

<script lang="ts" setup>

import CommonMixins from "@/mixins/common"
import { computed, defineEmits } from "vue"

const props = defineProps<{
      col: any[],
      tData: any[]
}>()

const page = computed(() => {
      return props.tData.length
})

const emit = defineEmits(["change"])

const { pagination } = CommonMixins()

const currentPage = (page: number) => {
      emit("change", page)
}

</script>