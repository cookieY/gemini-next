<template>
      <a-form layout="inline">
            <a-form-item label="数据源">
                  <span>{{ store.state.common.queryInfo.source }}</span>
            </a-form-item>
            <a-form-item label="所选数据库">
                  <a-select v-model:value="schema" style="width: 200px;" show-search :dropdownMatchSelectWidth="false">
                        <a-select-option v-for="i in store.state.common.schemaList" :value="i">{{ i }}</a-select-option>
                  </a-select>
            </a-form-item>
      </a-form>

      <Editor :container-id="props.id" ref="query_editor" :height="300" is-query @getValues="getValues"></Editor>
      <br />
      <Table ref="tbl" :height="300" :id="id"></Table>
</template>
<script lang="ts" setup>
import Editor from "@/components/editor/editor.vue";
import Table from "./table.vue";
import { useStore } from "@/store";
import { computed, onMounted, ref } from "vue"
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { Request } from "@/apis/fetchSchema";
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";

const props = defineProps<{
      id: string
}>()

const query_editor = ref()

const store = useStore()

const route = useRoute()

const tbl = ref()

const request = new Request()

const source_id = computed(() => store.state.common.queryInfo.source_id)

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
      tbl.value.runResults(source_id.value, schema.value, vl)

}

const initial = (source_id: string) => {
      const hightligh = store.state.highlight.highligt
      if (hightligh[source_id as string] !== undefined) {
            query_editor.value.RunEditor(hightligh[source_id as string])
      } else {
            request.HighLight(source_id).then((res: AxiosResponse<Res<any>>) => {
                  query_editor.value.RunEditor(res.data.payload)
                  store.commit("highlight/SAVE_HIGHLIGHT", { key: source_id, highlight: res.data.payload })
            })
      }
}

onBeforeRouteUpdate((to) => {
      initial(to.query.source_id as string)
})

onMounted(() => {
      initial(route.query.source_id as string)
})

</script>