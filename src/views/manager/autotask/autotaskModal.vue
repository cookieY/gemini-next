<template>
      <a-modal v-model:visible="is_open" :title="props.title" @ok="postAutotask">
            <a-form layout="vertical">
                  <a-form-item label="自动化任务名称">
                        <a-input v-model:value="autotask.name"></a-input>
                  </a-form-item>
                  <a-form-item label="类型">
                        <a-select placeholder="请选择" v-model:value="autotask.tp">
                              <a-select-option v-for="i in fetchList.tp" :value="i.v">{{ i.title }}</a-select-option>
                        </a-select>
                  </a-form-item>
                  <a-form-item label="环境">
                        <a-select v-model:value="autotask.name" @change="fetchSource">
                              <a-select-option
                                    v-for="i in fetchList.idc"
                                    :key="i"
                                    :value="i"
                              >{{ i }}</a-select-option>
                        </a-select>
                  </a-form-item>
                  <a-form-item label="数据源">
                        <a-input v-model:value="autotask.source"></a-input>
                  </a-form-item>
                  <a-form-item label="数据库">
                        <a-input v-model:value="autotask.data_base"></a-input>
                  </a-form-item>
                  <a-form-item label="数据表">
                        <a-input v-model:value="autotask.table"></a-input>
                  </a-form-item>
                  <a-form-item label="影响行数">
                        <a-input-number v-model:value="autotask.affect_rows"></a-input-number>
                  </a-form-item>
                  <a-form-item label="是否开启">
                        <a-switch v-model:checked="autotask.status"></a-switch>
                  </a-form-item>
            </a-form>
      </a-modal>
</template>

<script lang="ts" setup>

import { AutoTask } from "@/apis/autotask";
import { FetchIDCNameApis, Request } from "@/apis/fetchSchema";
import { Res } from "@/config/request";
import CommonMixins from "@/mixins/common"
import { AxiosResponse } from "axios";
import { readv } from "fs";
import { onMounted, reactive, unref } from "vue";

const props = defineProps<{
      title: string,
}>()

const fetchList = reactive({
      source: [] as string[],
      idc: [] as string[],
      tp: [
            {
                  'title': 'Insert',
                  'v': 0
            },
            {
                  'title': 'Update',
                  'v': 1
            },
            {
                  'title': 'Delete',
                  'v': 2
            }
      ]
})

const autotask = reactive<AutoTask>({
      name: "",
      tp: 0,
      source: "",
      data_base: "",
      table: "",
      affect_rows: 0
})

const initTask = Object.assign({}, autotask)

const request = new Request

const { is_open, turnState } = CommonMixins()

const postAutotask = () => {

}

const newTask = () => {
      Object.assign(autotask, unref(initTask))
      turnState()
}

const editTask = () => { }

const fetchSource = () => {
      request.Source('all').then((res: AxiosResponse<Res<any[]>>) => fetchList.source = res.data.payload.map(item => item.source))
}

onMounted(() => {
      request.IDC().then((res: AxiosResponse<Res<string[]>>) => fetchList.idc = res.data.payload)
})


defineExpose({
      newTask,
      editTask
})


</script>