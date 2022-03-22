<template>
      <a-table
            :columns="props.tblRef.col"
            :size="props.size"
            :dataSource="props.tblRef.data"
            :loading="loading"
            :pagination="{
                  total: props.tblRef.pageCount,
                  showTotal: total => $t('common.count', { 'count': total }),
                  position: ['bottomLeft']
            }"
            @change="currentPage"
            :bordered="props.bordered"
            @resizeColumn="handleResizeColumn"
      ></a-table>
</template>

<script lang="ts" setup>
import { nextTick } from 'process';
import { onMounted, ref, watch } from 'vue';
import { tableRef } from '.';

interface propsAttr {
      tblRef: tableRef
      bordered?: boolean
      size?: string
}

const handleResizeColumn = (w: number, col: { width: number }) => {
      col.width = w;
}

const props = withDefaults(defineProps<propsAttr>(), {
      size: "small",
      bordered: true
})

const loading = ref(true)

watch(props.tblRef, () => {
      loading.value = false
})


const emit = defineEmits(["change"])

const currentPage = (page: { current: number }) => {
      emit("change", page.current)
      loading.value = true
}

onMounted(() => {
      loading.value = props.tblRef.data.length === 0
})

</script>