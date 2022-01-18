<template>
      <a-table
            :columns="col"
            :size="size"
            :dataSource="tData"
            :pagination="false"
            :bordered="bordered"
      >
            <slot></slot>
      </a-table>
      <br />
      <a-pagination
            :total="pageCount"
            :page-size.sync="pagination.pageSize"
            :show-total="(total) => $t('common.count', { 'count': total })"
            @change="currentPage"
      />
</template>

<script lang="ts" setup>

import CommonMixins from "@/mixins/common"
import { defineEmits } from "vue"

interface propsAttr {
      col: any[]
      tData: any[]
      bordered: boolean
      pageCount: number
      size?: string
}

const props = withDefaults(defineProps<propsAttr>(), {
      size: "small"
})

const emit = defineEmits(["change"])

const { pagination } = CommonMixins()

const currentPage = (page: number) => {
      emit("change", page)
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         </script>