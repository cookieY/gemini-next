<template>
  <a-modal
    v-model:visible="is_open"
    :title="$t('common.sponsor.title')"
    @ok="close"
  >
    <div v-html="$t('common.sponsor.content')"></div>
  </a-modal>
</template>

<script setup lang="ts">
  import CommonMixin from '@/mixins/common';

  const { is_open, close, open } = CommonMixin();

  defineExpose({
    open,
  });
</script>
