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
  import { getNextOrderState } from '@/apis/orderPostApis';
  import CommonMixins from '@/mixins/common';
  import router from '@/router';
  import { ref } from 'vue';

  const props = defineProps<{
    workId: string;
  }>();

  const content = ref('');

  const confirmLoading = ref(false);

  const postReject = async () => {
    confirmLoading.value = true;
    await getNextOrderState({
      work_id: props.workId,
      text: content.value,
      tp: 'reject',
    });
    confirmLoading.value = false;
    turnState();
    router.go(-1);
  };

  const { is_open, turnState } = CommonMixins();

  defineExpose({
    turnState,
  });
</script>
