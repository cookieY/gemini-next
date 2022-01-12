<template>
      <a-modal v-model:visible="is_open" :title="props.title" @ok="postOk">
            <a-form layout="vertical" :model="autotask" :rules="rules" ref="formRef">
                  <a-form-item label="自动化任务名称" name="name">
                        <a-input v-model:value="autotask.name"></a-input>
                  </a-form-item>
                  <a-form-item label="类型">
                        <a-select placeholder="请选择" v-model:value="autotask.tp">
                              <a-select-option v-for="i in taskTp" :value="i.v">{{ i.title }}</a-select-option>
                        </a-select>
                  </a-form-item>
                  <a-form-item label="环境" name="idc">
                        <a-select v-model:value="autotask.idc" @change="fetchSource">
                              <a-select-option
                                    v-for="i in fetchList.idc"
                                    :key="i"
                                    :value="i"
                              >{{ i }}</a-select-option>
                        </a-select>
                  </a-form-item>
                  <a-form-item label="数据源" name="sourceLabel">
                        <a-select
                              v-model:value="autotask.sourceLabel"
                              @change="fetchSchema"
                              labelInValue
                              optionLabelProp="label"
                        >
                              <a-select-option
                                    v-for="i in fetchList.source"
                                    :value="i.source_id"
                                    :label="i.source"
                              >{{ i.source }}</a-select-option>
                        </a-select>
                  </a-form-item>
                  <a-form-item label="数据库" name="data_base">
                        <a-select v-model:value="autotask.data_base" @change="fetchTable">
                              <a-select-option
                                    v-for="i in fetchList.schema"
                                    :key="i"
                                    :value="i"
                              >{{ i }}</a-select-option>
                        </a-select>
                  </a-form-item>
                  <a-form-item label="数据表" name="table">
                        <a-select v-model:value="autotask.table">
                              <a-select-option
                                    v-for="i in fetchList.tables"
                                    :key="i"
                                    :value="i"
                              >{{ i }}</a-select-option>
                        </a-select>
                  </a-form-item>
                  <a-form-item label="影响行数">
                        <a-input-number v-model:value="autotask.affect_rows" :min="0"></a-input-number>
                  </a-form-item>
                  <a-form-item label="是否开启">
                        <a-switch
                              v-model:checked="autotask.status"
                              :checkedValue="1"
                              :unCheckedValue="0"
                        ></a-switch>
                  </a-form-item>
            </a-form>
      </a-modal>
</template>

<script lang="ts" setup>

import { AutoTask, Request as Re } from "@/apis/autotask";
import { DBRelated, Request } from "@/apis/fetchSchema";
import { Res } from "@/config/request";
import CommonMixins from "@/mixins/common"
import { LabelInValue } from "@/types";
import { RuleObject } from 'ant-design-vue/es/form';
import { AxiosResponse } from "axios";
import { onMounted, reactive, unref, ref } from "vue";

const props = defineProps<{
      title: string,
}>()

const formRef = ref()

const fetchList = reactive({
      source: [] as AutoTask[],
      idc: [] as string[],
      schema: [] as string[],
      tables: [] as string[],
})

const autotask = ref<AutoTask>({
      name: "",
      tp: 0,
      sourceLabel: {} as LabelInValue,
      data_base: "",
      table: "",
      affect_rows: 0,
      idc: "",
})

const checkSource = async (_rule: RuleObject, value: LabelInValue) => {
      if (value.value === undefined) {
            return Promise.reject('请选择数据源');
      }
      return Promise.resolve()
}

const rules = {
      name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
      idc: [{ required: true, trigger: 'change', message: '请选择环境' }],
      sourceLabel: [{ required: true, trigger: 'change', validator: checkSource }],
      data_base: [{ required: true, trigger: 'change', message: '请选择数据库' }],
      table: [{ required: true, trigger: 'change', message: '请选择表' }],

}

const initTask = Object.assign({}, autotask)

const request = new Request

const postTask = new Re

const emit = defineEmits(['success'])

const { is_open, turnState, taskTp } = CommonMixins()

const newTask = () => {
      Object.assign(autotask, unref(initTask))
      turnState()
}

const editTask = (task: AutoTask) => {
      autotask.value = Object.assign({}, task)
      turnState()
}

const postOk = () => {
      formRef.value.validateFields().then(() => {
            postTask.Post('curd', autotask.value).then(() => {
                  turnState()
                  emit('success')
            })
      })
}

const fetchSource = (vl: string) => {
      request.Source('idc', vl).then((res: AxiosResponse<Res<any[]>>) => {
            fetchList.source = res.data.payload
      })
}

const fetchSchema = (vl: LabelInValue) => {
      request.Schema(vl.value).then((res: AxiosResponse<Res<DBRelated>>) => fetchList.schema = res.data.payload.results)
}

const fetchTable = (vl: string) => {
      request.Table(autotask.value.sourceLabel.value, vl).then((res: AxiosResponse<Res<DBRelated>>) => fetchList.tables = res.data.payload.results)
}

onMounted(() => {
      request.IDC().then((res: AxiosResponse<Res<string[]>>) => fetchList.idc = res.data.payload)
})


defineExpose({
      newTask,
      editTask
})


</script>