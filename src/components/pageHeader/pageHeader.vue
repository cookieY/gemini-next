<template>
      <a-page-header :title="props.title" :sub-title="props.subTitle" @back="() => $router.go(-1)">
            <template #tags>
                  <a-tag color="blue">Running</a-tag>
            </template>
            <template #extra>
                  <slot name="extra"></slot>
            </template>
            <slot name="content"></slot>
      </a-page-header>
</template>
<script lang="ts"  setup>

import { computed, defineProps } from "@vue/runtime-core";

const props = defineProps<{
      title: string,
      subTitle: string
}>()

</script>