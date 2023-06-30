<template>
  <a-steps :current="props.current" size="small" direction="vertical">
    <a-step
      v-for="(i, idx) in props.step"
      :key="i.desc"
      :title="i.desc"
      disabled
    >
      <template #subTitle>
        <a-tag color="blue"> {{ i.action !== '' ? i.action : '审核中' }}</a-tag>
        {{ i.time }}
      </template>

      <template v-if="i.type !== 2" #description>
        <a-space>
          <template v-if="idx >= props.current">
            <span>{{ $t('common.relevant') }}: {{ i.auditor.join(' ') }}</span>
          </template>
          <template v-else>
            <span>{{ $t('common.relevant') }}: {{ i.username }}</span>
          </template>
        </a-space>
      </template>
    </a-step>
  </a-steps>
</template>

<script lang="ts" setup>
  import CommonMixins from '@/mixins/common';
  import { StateUsage } from '@/lib';

  const props = defineProps<{
    current: number;
    step: any[];
    status: number;
  }>();

  const { checkStepState } = CommonMixins();
</script>
