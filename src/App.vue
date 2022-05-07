<template>
      <a-config-provider :locale="locale">
            <router-view />
      </a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs';
import 'dayjs/locale';
import { defaultLang } from "@/lang"
dayjs.locale(defaultLang);
const locale = defaultLang === "en-US" ? enUS : zhCN
</script>