<template>
  <a-drawer
    v-bind="$attrs"
    :width="500"
    :header-style="{ display: 'none' }"
    :body-style="{ padding: 0 }"
    destroy-on-close
  >
    <orderProfile />
  </a-drawer>
</template>

<script setup lang="ts">
  import orderProfile from './orderProfile.vue';
</script>

<style scoped></style>
