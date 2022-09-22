<template>
  <a-card :loading="props.loading" :body-style="{ padding: '20px 24px 8px' }">
    <div class="chart-card-header">
      <div class="meta">
        <span class="chart-card-title">
          <slot name="title">{{ props.title }}</slot>
        </span>
        <span class="chart-card-action">
          <slot name="action"></slot>
        </span>
      </div>
      <div class="total">
        <slot name="total">
          <span>{{ props.total }}</span>
        </slot>
      </div>
    </div>
    <div class="chart-card-content">
      <div class="content-fix">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="chart-card-footer">
      <div class="field">
        <slot name="footer"></slot>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title: string;
    total?: number;
    loading?: boolean;
  }>();
</script>

<style lang="less" scoped></style>
