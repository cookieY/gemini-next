<template>
  <a-modal v-bind="$attrs" @ok="save">
    <a-textarea v-model:value="ssl_text" :rows="8"></a-textarea>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const emit = defineEmits(['save']);

  const ssl_text = ref('');

  const save = () => {
    emit('save', ssl_text.value);
  };
</script>

<style scoped></style>
