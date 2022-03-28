<template>
      <a-modal v-model:visible="is_open" title="欢迎使用Yearning SQL审核平台" @ok="close" :width="800">
            <p v-for="i in Announce">{{ i }}</p>
      </a-modal>
</template>

<script setup lang="ts">
import CommonMixin from "@/mixins/common";
import { Announce } from "@/config/vars"

const { is_open, close, open } = CommonMixin()

defineExpose({
      open
})

</script>