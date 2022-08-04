<template>
      <a-form layout="inline">
            <a-form-item :label="$t('common.table.source')">
                  <span>{{ store.state.common.queryInfo.source }}</span>
            </a-form-item>
            <a-form-item :label="$t('common.choose') + $t('common.table.schema')">
                  <a-select v-model:value="schema" style="width: 200px;" show-search :dropdownMatchSelectWidth="false">
                        <a-select-option v-for="i in store.state.common.schemaList" :value="i">{{ i }}</a-select-option>
                  </a-select>
            </a-form-item>
      </a-form>
      <Editor :container-id="props.id" ref="query_editor" is-query @getValues="getValues"></Editor>
      <br />
      <Table ref="tbl" :height="300" :id="id"></Table>
</template>
<script lang="ts" setup>
import Editor from "@/components/editor/editor.vue";
import Table from "./table.vue";
import { useStore } from "@/store";
import { computed, ref } from "vue"

const props = defineProps<{
      id: string
}>()

const query_editor = ref()

const store = useStore()

const tbl = ref()

const schema = computed({
      get () {
            return store.state.common.schema
      },
      set (v: string) {
            store.commit("common/SET_SCHEMA", v)
      }
})

const getValues = (vl: string) => {
      store.commit("order/SET_QUERY_HISTORY", vl)
      tbl.value.runResults(schema.value, vl)
}

</script>