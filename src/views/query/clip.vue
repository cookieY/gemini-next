<template>
  <a-drawer
    v-model:visible="visible"
    :width="500"
    :title="$t('common.clip')"
    placement="bottom"
  >
    <a-row :gutter="16">
      <template v-for="(i, idx) in clip" :key="i">
        <a-col :span="4">
          <ClipBoard :id-ref="idx" :clips="i" @del-btn="spliceClip"></ClipBoard>
        </a-col>
      </template>
    </a-row>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Clip } from '@/types';
  import ClipBoard from './clipBoard.vue';

  const visible = ref(false);

  const clip = ref<Clip[]>([]);

  const spliceClip = (ref: number) => {
    clip.value.splice(ref, 1);
    localStorage.setItem('clip', JSON.stringify(clip.value));
  };

  onMounted(() => {
    document.onkeyup = (e) => {
      if (e.altKey && e.ctrlKey && e.code == 'KeyV') {
        visible.value = true;
        if (localStorage.getItem('clip') !== null) {
          clip.value = JSON.parse(localStorage.getItem('clip') as string);
        }
      }
    };
  });
</script>
