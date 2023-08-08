<template>
  <a-modal v-model:visible="is_open" :title="$t('order.delay')">
    <a-date-picker show-time :disabled-date="disabledDate" @ok="delayTime" />
    <template #footer>
      <a-button type="danger" @click="killSchedule">
        {{ $t('order.terminate') }}
      </a-button>
      <a-button type="primary" @click="changeDelayTime">
        {{ $t('order.change') }}
      </a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  import { scheduledChange } from '@/apis/orderPostApis';
  import CommonMixins from '@/mixins/common';
  import dayjs, { Dayjs } from 'dayjs';
  import { reactive } from 'vue';

  const { is_open, turnState } = CommonMixins();

  const delay = reactive({
    time: '',
    work_id: '',
  });

  const delayTime = (date: Dayjs) => {
    delay.time = date.format('YYYY-MM-DD HH:mm');
  };

  const disabledDate = (current: Dayjs) => {
    // Can not select days before today and today
    return current.add(1, 'day') < dayjs().endOf('day');
  };

  const killSchedule = () => {
    scheduledChange(delay.work_id, 'kill');
    turnState();
  };

  const changeDelayTime = () => {
    scheduledChange(delay.work_id, delay.time);
    turnState();
  };

  const openSchedule = (work_id: string) => {
    turnState();
    delay.work_id = work_id;
  };

  defineExpose({
    openSchedule,
  });
</script>

<style scoped></style>
