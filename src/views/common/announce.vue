<template>
      <a-modal v-model:visible="is_open" :title="$t('common.stmt.title')" @ok="close" :width="800">
            <p v-for="i in ll">{{ i }}</p>
      </a-modal>
</template>

<script setup lang="ts">
import CommonMixin from "@/mixins/common";
import { Announce, AnnounceEN } from "@/config/vars"
import { defaultLang } from "@/lang";

const { is_open, close, open } = CommonMixin()

const ll = defaultLang === 'en_US' ? AnnounceEN : Announce

defineExpose({
      open
})

</script>