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
      <p>查询耗时:{{ executeTime }} ms</p>

      <a-table
            bordered
            :columns="col"
            :dataSource="tData"
            :scroll="{ x: maxWidth, y: 300 }"
            @resizeColumn="handleResizeColumn"
      ></a-table>
</template>
<script lang="ts" setup>
import { Request } from "@/apis/query";
import Editor from "@/components/editor/editor.vue";
import { Res } from "@/config/request";
import { useStore } from "@/store";
import { AxiosResponse } from "axios";
import { computed, onMounted, ref } from "vue"

const props = defineProps<{
      id: string
}>()

const query_editor = ref()

const store = useStore()

const request = new Request

const col = ref([])

const tData = ref([])

const maxWidth = ref(1000)

const source_id = computed(() => store.state.common.queryInfo.source_id)

const schema = ref("")

const executeTime = ref(0)

const getValues = (vl: string) => {
      request.QueryData(source_id.value, schema.value, vl).then((res: AxiosResponse<Res<any>>) => {
            col.value = res.data.payload.title
            tData.value = res.data.payload.data
            maxWidth.value = res.data.payload.title.length * 200
            executeTime.value = res.data.payload.time
      })
}

const handleResizeColumn = (w: number, col: { width: number }) => {
      col.width = w;
}

onMounted(() => {
      query_editor.value.RunEditor(store.state.common.highlight)
})

</script>