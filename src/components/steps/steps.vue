<template>
      <a-steps type="navigation" size="small" v-model:current="props.current">
            <a-step v-for="i in props.step" :title="i.desc" :sub-title="checkStepState(i.type)">
                  <template #description>{{ $t('common.relevant') }}: {{ i.auditor.join(' ') }}</template>
            </a-step>
      </a-steps>
</template>


<script lang="ts"  setup>
import { Template } from '@/types';
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n';
import CommonMixins from "@/mixins/common"

const { t } = useI18n()

const props = defineProps<{
      current: number,
      step: Template[],
}>()



const { checkStepState } = CommonMixins()

</script>