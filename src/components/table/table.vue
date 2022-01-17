<template>
      <a-table
            :columns="col"
            size="small"
            :dataSource="tData"
            :pagination="false"
            :bordered="bordered"
      ></a-table>
      <br />
      <a-pagination
            :total="page"
            :page-size.sync="pagination.pageSize"
            :show-total="(total) => $t('common.count', { 'count': total })"
            @change="currentPage"
      />
</template>

<script lang="ts" setup>

import CommonMixins from "@/mixins/common"
import { computed, defineEmits } from "vue"
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps<{
      col: any[],
      tData: any[],
      bordered: boolean
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