<template>
      <a-tag :color="desc.color">
            <template #icon>
                  <component :is="desc.icon" :spin="desc.color === '#2094FC'" />
            </template>
            {{ desc.title }}
      </a-tag>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { OrderState } from "./orderTableApis"
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from "@ant-design/icons-vue"

const props = defineProps<{
      state: number
}>()

const desc = computed(() => {
      switch (props.state) {
            case OrderState.PROCESS:
                  return { color: "#2094FC", title: "执行中", icon: SyncOutlined }
            case OrderState.WAIT:
                  return { color: "#2094FC", title: "待执行", icon: SyncOutlined }
            case OrderState.AUDIT:
                  return { color: "#2094FC", title: "审核中", icon: SyncOutlined }
            case OrderState.SUCCESS:
                  return { color: "#009485", title: "已执行", icon: CheckCircleOutlined }
            case OrderState.REJECT:
                  return { color: "#ff5724", title: "已驳回", icon: CloseCircleOutlined }
            case OrderState.ERROR:
                  return { color: "#ff5724", title: "执行失败", icon: CloseCircleOutlined }
            default:
                  return {}

      }
})

</script>