<template>
      <a-modal v-model:visible="is_open" :title="props.title" :width="800" @ok="postFlow">
            <a-row>
                  <a-col :span="9">
                        <a-form v-bind="layout">
                              <a-form-item label="流程名称">
                                    <a-input v-model:value="flow.source"></a-input>
                              </a-form-item>
                              <a-divider orientation="left">步骤编辑</a-divider>
                              <a-form-item label="阶段名称">
                                    <a-input v-model:value="step.desc"></a-input>
                              </a-form-item>
                              <a-form-item label="步骤类型">
                                    <a-select v-model:value="step.type">
                                          <a-select-option :value="0">审核</a-select-option>
                                          <a-select-option :value="1">执行</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item label="审核人员">
                                    <a-select v-model:value="step.auditor" mode="multiple">
                                          <a-select-option
                                                v-for="i in auditor"
                                                :key="i.username"
                                                :value="i.username"
                                          >{{ i.username }}</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item label="操作">
                                    <a-button
                                          type="primary"
                                          style="margin-left: 10%;"
                                          @click="addStep"
                                    >添加</a-button>
                              </a-form-item>
                        </a-form>
                  </a-col>
                  <a-col :span="14" :offset="1">
                        <a-steps direction="vertical" progress-dot size="small" :current="0">
                              <a-step
                                    v-for="(element, idx) in flow.steps"
                                    :title="`${element.desc} (${element.type !== 0 ? '执行阶段' : '审核阶段'})`"
                                    class="empty"
                              >
                                    <template #description>
                                          <template v-if="element.type !== -1">
                                                <a-space>
                                                      <a-button
                                                            ghost
                                                            size="small"
                                                            v-if="!element.edit"
                                                            @click="element.edit = true"
                                                      >编辑</a-button>
                                                      <a-button
                                                            ghost
                                                            size="small"
                                                            v-else
                                                            @click="element.edit = false"
                                                      >保存</a-button>
                                                      <a-button
                                                            ghost
                                                            size="small"
                                                            v-if="!element.edit"
                                                            @click="del(idx)"
                                                      >删除</a-button>
                                                      <a-button
                                                            ghost
                                                            size="small"
                                                            v-if="!element.edit"
                                                            @click="upward(idx)"
                                                      >向上移动</a-button>
                                                      <a-button
                                                            ghost
                                                            size="small"
                                                            v-if="!element.edit"
                                                            @click="down(idx)"
                                                      >向下移动</a-button>
                                                </a-space>
                                                <br />
                                          </template>

                                          <div style="margin-top: 2%;">
                                                <a-tag
                                                      v-if="!element.edit"
                                                      v-for="k in element.auditor"
                                                      color="#108ee9"
                                                >{{ k }}</a-tag>
                                                <a-select
                                                      v-else
                                                      v-model:value="element.auditor"
                                                      mode="multiple"
                                                      style="width:100%"
                                                >
                                                      <a-select-option
                                                            v-for="k in auditor"
                                                            :key="k.username"
                                                            :value="k.username"
                                                      >{{ k.username }}</a-select-option>
                                                </a-select>
                                          </div>
                                    </template>
                              </a-step>
                        </a-steps>
                  </a-col>
            </a-row>
      </a-modal>
</template>
<script lang="ts" setup>
import CommonMixins from "@/mixins/common"
import { Step as aStep, Steps as aSteps } from 'ant-design-vue';
import { onMounted, ref } from "vue"
import { RespSteps, Steps, Request } from "@/apis/flow"
import { AxiosResponse } from "axios"
import { Res } from "@/config/request"
import { AuditorList } from "@/types"
import { message } from 'ant-design-vue';

const props = defineProps<{
      title: string
}>()

const emit = defineEmits(['success'])


const flow = ref({
      steps: [
            {
                  desc: '提交阶段',
                  auditor: ['提交人'],
                  type: -1,  // 0 audit 1 executor
            }
      ] as Steps[]
} as RespSteps)

const request = new Request

const step = ref({} as Steps)

let auditor = ref([] as AuditorList[])

const { is_open, layout, turnState } = CommonMixins()

const addStep = () => {
      if (step.value.type === 1) {
            for (let i of flow.value.steps) {
                  if (i.type === 1) {
                        message.error("执行阶段仅允许添加一次!")
                        return
                  }
            }
      }
      if (flow.value.steps.length === 7) {
            message.error("中间审核环节最多支持5层")
            return
      }
      flow.value.steps.push(Object.assign({}, step.value))
      step.value = {} as Steps
}

const upward = (idx: number) => {
      if (idx - 1 == 0) {
            message.error("不可移动到初始步骤")
            return
      }
      flow.value.steps[idx] = flow.value.steps.splice(idx - 1, 1, flow.value.steps[idx])[0];
}

const down = (idx: number) => {
      if (idx + 1 == flow.value.steps.length) {
            return
      }
      flow.value.steps[idx] = flow.value.steps.splice(idx + 1, 1, flow.value.steps[idx])[0];
}

const del = (idx: number) => {
      flow.value.steps.splice(idx, 1)
}

const postFlow = () => {
      if (flow.value.steps[flow.value.steps.length - 1].type !== 1) {
            message.error("最后步骤必须为执行类型！保存失败!")
            return
      }
      request.Post(flow.value).then(() => {
            turnState()
            emit('success')
      })
}

const editFlow = (vl: RespSteps) => {
      flow.value = vl
      turnState()
}

onMounted(() => {
      request.User().then((res: AxiosResponse<Res<AuditorList[]>>) => auditor.value = res.data.payload)
})

defineExpose({
      turnState,
      editFlow
})

</script>