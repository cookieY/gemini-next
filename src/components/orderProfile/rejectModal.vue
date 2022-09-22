<template>
  <a-modal
    v-model:visible="is_open"
    :title="$t('order.profile.reject.title')"
    :confirm-loading="confirmLoading"
    @ok="postReject"
  >
    <a-textarea v-model:value="content" :rows="5"></a-textarea>
  </a-modal>
</template>

<script lang="ts" setup>
  import { Request } from '@/apis/orderPostApis';
  import CommonMixins from '@/mixins/common';
  import router from '@/router';
  import { ref } from 'vue';

  const props = defineProps<{
    work_id: string;
  }>();

  const content = ref('');

  const request = new Request();

  const confirmLoading = ref(false);

  const postReject = () => {
    confirmLoading.value = true;
    request
      .Next({ work_id: props.work_id, text: content.value, tp: 'reject' })
      .finally(() => {
        confirmLoading.value = false;
        turnState();
        router.go(-1);
      });
  };

  const { is_open, turnState } = CommonMixins();

  defineExpose({
    turnState,
  });
</script>
