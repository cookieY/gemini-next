<template>
      <div :class="[prefixCls, lastCls, blockCls, gridCls]">
            <div v-if="title" class="antd-pro-components-standard-form-row-index-label">
                  <span>{{ title }}</span>
            </div>
            <div class="antd-pro-components-standard-form-row-index-content">
                  <slot></slot>
            </div>
      </div>
</template>

<script  setup lang="ts">
import { defineProps } from "@vue/runtime-core";
const classes = [
      'antd-pro-components-standard-form-row-index-standardFormRowBlock',
      'antd-pro-components-standard-form-row-index-standardFormRowGrid',
      'antd-pro-components-standard-form-row-index-standardFormRowLast'
]
const props = defineProps<{
      title: string
      prefixCls?: string
      lastCls?: boolean
}>()
</script>