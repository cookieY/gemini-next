<template>
  <a-steps :current="props.current" size="small">
    <a-step
      v-for="i in props.step"
      :key="i.desc"
      :title="i.desc"
      :sub-title="checkStepState(i.type)"
      disabled
    >
      <template v-if="i.type !== 2" #description>
        <span>{{ $t('common.relevant') }}: {{ i.auditor.join(' ') }}</span>
      </template>
    </a-step>
  </a-steps>
</template>

<script lang="ts" setup>
  import { Template } from '@/types';
  import CommonMixins from '@/mixins/common';

  const props = defineProps<{
    current: number;
    step: Template[];
    status: number;
  }>();

  const { checkStepState } = CommonMixins();
</script>
