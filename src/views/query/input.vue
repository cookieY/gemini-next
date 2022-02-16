<template>
      <a-form layout="inline">
            <a-form-item label="数据源">
                  <span>{{ store.state.common.queryInfo.source }}</span>
            </a-form-item>
            <a-form-item label="所选数据库">
                  <a-select v-model:value="schema" style="width: 200px;">
                        <a-select-option
                              v-for="i in store.state.common.schemaList"
                              :value="i"
                        >{{ i }}</a-select-option>
                  </a-select>
            </a-form-item>
      </a-form>

      <Editor
            :container-id="props.id"
            ref="query_editor"
            :height="300"
            is-query
            @getValues="getValues"
      ></Editor>
      <br />
      <Table ref="tbl" :height="300"></Table>
</template>
<script lang="ts" setup>
import Editor from "@/components/editor/editor.vue";
import Table from "./table.vue";
import { useStore } from "@/store";
import { computed, onMounted, onUnmounted, ref } from "vue"
import { EventBus } from "@/lib"

const props = defineProps<{
      id: string
}>()

const query_editor = ref()

const store = useStore()

const tbl = ref()

const source_id = computed(() => store.state.common.queryInfo.source_id)

const schema = ref("")

const getValues = (vl: string) => {
      tbl.value.runResults(source_id.value, schema.value, vl)

}

const paste = () => {
      console.log(1231)
}

onUnmounted(() => {
      EventBus.off("highlight")
})

onMounted(() => {
      EventBus.on("highlight", (highlight: any) => {
            query_editor.value.RunEditor(highlight)
      })
})

</script>