<template>
      <a-table :columns="props.tblRef.col" :size="props.size" :dataSource="props.tblRef.data" :loading="loading"
            :pagination="{
                  total: props.tblRef.pageCount,
                  showTotal: total => $t('common.count', { 'count': total }),
                  position: ['bottomLeft'],
                  showSizeChanger: true,
                  defaultPageSize: props.tblRef.defaultPageSize
            }" @change="currentPage" :bordered="props.bordered" @resizeColumn="handleResizeColumn">
            <template v-for="(_, name) in $slots" #[name]="slotData">
                  <slot :name="name" v-bind="slotData"></slot>
            </template>
      </a-table>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import * as t from '@/components/table';

interface propsAttr {
      tblRef: t.tableRef
      bordered?: boolean
      size?: string
      isAll?: boolean
}

const handleResizeColumn = (w: number, col: { width: number }) => {
      col.width = w;
}

const props = withDefaults(defineProps<propsAttr>(), {
      size: "default",
      bordered: true,
})

const loading = ref(true)

const pSize = ref(10)

watch(props.tblRef, () => {
      !props.isAll ? loading.value = false : null
})

const currentPage = (page: { current: number, pageSize: number }) => {
      pSize.value = page.pageSize
      props.tblRef.fn !== undefined ? props.tblRef.fn({ expr: props.tblRef.expr, current: page.current, pageSize: page.pageSize }) : null
      !props.isAll ? loading.value = true : null
}

const manual = () => {
      props.tblRef.fn({ expr: props.tblRef.expr, current: 1, pageSize: pSize.value })
}

onMounted(() => {
      props.isAll ? loading.value = false : loading.value = props.tblRef.data.length === 0
      nextTick(() => {
            props.tblRef.defaultPageSize !== undefined ? pSize.value = props.tblRef.defaultPageSize as number : 10
            props.tblRef.fn !== undefined ? manual() : null
      })
})

defineExpose({
      manual
})

</script>