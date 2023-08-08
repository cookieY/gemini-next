<template>
  <a-modal
    v-model:visible="is_open"
    :title="$t('common.stmt.title')"
    :width="800"
    @ok="close"
  >
    <p v-for="i in ll" :key="i">{{ i }}</p>
  </a-modal>
</template>

<script setup lang="ts">
  import CommonMixin from '@/mixins/common';
  import { Announce, AnnounceEN } from '@/config/vars';

  const { is_open, close, open } = CommonMixin();

  const ll = sessionStorage.getItem('lang') ? AnnounceEN : Announce;

  defineExpose({
    open,
  });
</script>
