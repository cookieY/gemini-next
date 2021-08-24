<template>
      <a-steps type="navigation" size="small" v-model:current="props.current">
            <a-step
                  v-for="i in props.step"
                  :title="i.desc"
                  :sub-title="i.type ? '执行阶段' : '审核阶段'"
                  :status="props.current === 0 ? 'process' : 'wait'"
            >
                  <template #description>相关人: {{ i.auditor.join(' ') }}</template>
            </a-step>
      </a-steps>
</template>



<script lang="ts"  setup>
import { Template } from '@/views/common/types';
import { defineProps } from 'vue'

const props = defineProps<{
      current: number,
      step: Template[],
}>()

</script>