<template>
  <a-config-provider :locale="lang">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import enUS from 'ant-design-vue/es/locale/en_US';
  import { locale } from 'dayjs';
  import 'dayjs/locale';
  import { defaultLang } from '@/lang';
  locale(defaultLang);

  const lang = defaultLang === 'en_US' ? enUS : zhCN;
</script>
