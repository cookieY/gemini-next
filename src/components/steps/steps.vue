<template>
      <a-steps v-model:current="props.current" size="small">
            <a-step
                  v-for="i in props.step"
                  :title="i.desc"
                  :sub-title="checkStepState(i.type)"
                  disabled
            >
                  <template #description v-if="i.type !== 2">
                        <span>{{ $t('common.relevant') }}: {{ i.auditor.join(' ') }}</span>
                  </template>
            </a-step>
      </a-steps>
</template>


<script lang="ts"  setup>
import { Template } from '@/types';
import CommonMixins from "@/mixins/common"
import { onUpdated } from 'vue';

const props = defineProps<{
      current: number,
      step: Template[],
      status: number
}>()

const { checkStepState } = CommonMixins()

</script>