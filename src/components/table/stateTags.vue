<template>
  <a-tag :color="desc.color">
    <template #icon>
      <component :is="desc.icon" :spin="desc.color === '#408B9B'"></component>
    </template>
    {{ desc.title }}
  </a-tag>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { StateUsage } from '@/lib';

  const props = defineProps<{
    state: number;
  }>();

  const desc = computed(() => {
    return StateUsage(props.state);
  });
</script>
