<template>
  <a-page-header
    :title="$t('common.rule')"
    :sub-title="$t('common.rule.sub')"
    :ghost="false"
  >
    <template #footer>
      <a-tabs>
        <a-tab-pane key="all" :tab="$t('global')">
          <br />
          <rules ref="global" desc="" global />
        </a-tab-pane>
        <a-tab-pane key="refer" :tab="$t('custom_list')">
          <custom />
        </a-tab-pane>
      </a-tabs>
    </template>
  </a-page-header>
</template>

<script setup lang="ts">
  import { getRulesList } from '@/apis/rules';
  import rules from './rules.vue';
  import custom from './custom.vue';
  import { onMounted, ref } from 'vue';

  const global = ref();

  onMounted(async () => {
    const { data } = await getRulesList();
    global.value.onRules(data.payload);
  });
</script>

<style lang="scss" scoped></style>
