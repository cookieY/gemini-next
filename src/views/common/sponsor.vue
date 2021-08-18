<template>
      <a-modal v-model:visible="is_open" title="让Yearning持续提供更好的功能与服务" @ok="close">
            感谢您支持Yearning！Yearning在保证社区版持续开发的基础上为了回馈曾经在Yearning开发道路上提供积极帮助的朋友们，现推出了基于社区版的赞助版本。
            赞助版基于最新的Yearning社区版本，目前已添加以下功能:
            <p v-for="i in FeatureList">{{ i }}</p>
      </a-modal>
</template>

<script setup lang="ts">
import CommonMixin from "@/mixins/common";
import { FeatureList } from "@/config/vars"

const { is_open, close, open } = CommonMixin()

defineExpose({
      open
})

</script>