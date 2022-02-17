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
      title: string
      total?: number
      loading?: boolean
}>()

</script>

<style lang="less" scoped>
.chart-card-header {
      position: relative;
      overflow: hidden;
      width: 100%;
      .meta {
            position: relative;
            overflow: hidden;
            width: 100%;
            color: fade(#ffffff, 60);
            font-size: 14px;
            line-height: 22px;
      }
}
.chart-card-action {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
}
.chart-card-footer {
      border-top: 0.5px solid #e8e8e8;
      padding-top: 9px;
      margin-top: 8px;
      > * {
            position: relative;
      }
      .field {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0;
      }
}
.chart-card-content {
      margin-bottom: 30px;
      position: relative;
      height: 46px;
      width: 100%;
      .content-fix {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
      }
}
.total {
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
      color: #ffffff;
      margin-top: 4px;
      margin-bottom: 0;
      font-size: 30px;
      line-height: 38px;
      height: 38px;
}
</style>