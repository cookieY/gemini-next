<template>
  <pre style="height: 500px; overflow: auto">
            {{ pre }}
      </pre
  >
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useStore } from '@/store';
  import { checkSchema } from '@/lib';
  import { COMMON_URI } from '@/config/request';
  import { useWebSocket } from '@vueuse/core';
  import { message } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';

  const pre = ref('');

  const store = useStore();

  const props = defineProps<{
    workId: string;
  }>();

  const { t } = useI18n();

  onMounted(() => {
    useWebSocket(
      `${checkSchema()}${COMMON_URI}/audit/order/osc?work_id=${props.workId}`,
      {
        autoReconnect: {
          retries: 3,
          delay: 1000,
          onFailed() {
            message.error(t('query.ws.error'));
          },
        },
        heartbeat: {
          interval: 5000,
          message: 'ping',
        },
        protocols: [store.state.user.account.token],
        onMessage: (e, event) => {
          pre.value = event.data;
        },
      }
    );
  });
</script>

<style></style>
