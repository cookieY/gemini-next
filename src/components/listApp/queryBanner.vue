<template>
  <a-result
    status="info"
    :title="$t('query.banner.title')"
    :sub-title="$t('query.banner.sub')"
  >
    <template #extra>
      <a-button key="console" type="primary" @click="go">{{
        $t('common.enter')
      }}</a-button>
      <a-button key="buy" @click="router.go(-1)">{{
        $t('common.back')
      }}</a-button>
    </template>

    <div class="desc">
      <p style="font-size: 16px">
        <strong>{{ $t('query.banner.attion') }}</strong>
      </p>
      <p>
        <PushpinFilled />
        {{ $t('query.banner.attion.1') }}
      </p>
      <p>
        <PushpinFilled />
        {{ $t('query.banner.attion.2') }}
      </p>
      <p>
        <PushpinFilled />
        {{ $t('query.banner.attion.3') }}
      </p>
      <p>
        <PushpinFilled />
        {{ $t('query.banner.attion.4') }}
      </p>
    </div>
  </a-result>
</template>

<script lang="ts" setup>
  import router from '@/router';
  import { PushpinFilled } from '@ant-design/icons-vue';

  defineProps<{
    isExport: boolean;
    type: string;
  }>();

  const emit = defineEmits(['enter']);

  const go = () => {
    emit('enter');
  };
</script>
