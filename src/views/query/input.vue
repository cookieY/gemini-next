<template>
      <Editor :container-id="props.id" ref="query_editor" :height="300"></Editor>
      <br />
      <a-table bordered></a-table>
</template>
<script lang="ts" setup>
import Editor from "@/components/editor/editor.vue";
import { useStore } from "@/store";
import { onMounted, ref, nextTick, watch, computed } from "vue"

const props = defineProps<{
      id: string
}>()

const query_editor = ref()

const store = useStore()

onMounted(() => {
      query_editor.value.RunEditor(store.state.common.highlight)
})

</script>