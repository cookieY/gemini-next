<template>
      <a-table
            :columns="props.col"
            :size="props.size"
            :dataSource="props.tData"
            :pagination="false"
            :bordered="props.bordered"
      >
            <slot></slot>
      </a-table>
      <br />
      <a-pagination
            :total="props.count"
            :page-size="10"
            :show-total="(total) => $t('common.count', { 'count': total })"
            @change="currentPage"
      />
</template>

<script lang="ts" setup>

import CommonMixins from "@/mixins/common"

interface propsAttr {
      col: any[]
      tData: any[]
      bordered: boolean
      size?: string
      count: number
}

const props = withDefaults(defineProps<propsAttr>(), {
      size: "small"
})

const emit = defineEmits(["change"])

const currentPage = (page: number) => {
      emit("change", page)
}

</script>