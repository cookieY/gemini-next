<template>
      <a-modal v-model:visible="is_open" :title="props.title" :width="800" @ok="postFlow" :okText="$t('common.save')">
            <a-row>
                  <a-col :span="10">
                        <a-form :model="step" :rules="rules" ref="formRef">
                              <a-form-item :label="$t('menu.manage.flow') + $t('common.table.name')" required>
                                    <a-input v-model:value="flow.source"></a-input>
                              </a-form-item>
                              <a-divider orientation="left">{{ $t('flow.step') }}</a-divider>
                              <a-form-item :label="$t('flow.step') + $t('common.table.name')" name="desc">
                                    <a-input v-model:value="step.desc"></a-input>
                              </a-form-item>
                              <a-form-item :label="$t('flow.step') + $t('common.table.type')" name="type">
                                    <a-select v-model:value="step.type">
                                          <a-select-option :value="0">{{ $t('flow.audit') }}</a-select-option>
                                          <a-select-option :value="1">{{ $t('flow.execute') }}</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item :label="$t('flow.auditor')" name="auditor">
                                    <a-select v-model:value="step.auditor" mode="multiple">
                                          <a-select-option v-for="i in auditor" :key="i.username" :value="i.username">{{
                                          i.username
                                          }}</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item :label="$t('common.action')">
                                    <a-button type="primary" style="margin-left: 10%;" @click="addStep">
                                          {{ $t('common.add') }}</a-button>
                              </a-form-item>
                        </a-form>
                  </a-col>
                  <a-col :span="13" :offset="1">
                        <a-steps direction="vertical" progress-dot size="small" :current="0">
                              <a-step v-for="(element, idx) in flow.steps"
                                    :title="`${element.desc} ${element.type === 1 ? `(${$t('flow.execute') + ' ' + $t('flow.phase')})` : element.type === 0 ? `(${$t('flow.audit') + ' ' + $t('flow.phase')})` : ''}`"
                                    class="empty">
                                    <template #description>
                                          <template v-if="element.type !== -1">
                                                <a-space>
                                                      <a-button ghost size="small" v-if="!element.edit"
                                                            @click="element.edit = true">{{ $t('common.edit') }}
                                                      </a-button>
                                                      <a-button ghost size="small" v-else @click="element.edit = false">
                                                            {{ $t('common.save') }}</a-button>
                                                      <a-button ghost size="small" v-if="!element.edit"
                                                            @click="del(idx)">{{ $t('common.delete') }}</a-button>
                                                      <a-button ghost size="small" v-if="!element.edit"
                                                            @click="upward(idx)">{{ $t('flow.up') }}</a-button>
                                                      <a-button ghost size="small" v-if="!element.edit"
                                                            @click="down(idx)">{{ $t('flow.down') }}</a-button>
                                                </a-space>
                                                <br />
                                          </template>

                                          <div style="margin-top: 2%;">
                                                <a-tag v-if="!element.edit" v-for="k in element.auditor"
                                                      color="#108ee9">{{ k }}</a-tag>
                                                <a-select v-else v-model:value="element.auditor" mode="multiple"
                                                      style="width:100%">
                                                      <a-select-option v-for="k in auditor" :key="k.username"
                                                            :value="k.username">{{ k.username }}</a-select-option>
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
import { useI18n } from "vue-i18n";

const props = defineProps<{
      title: string
}>()

const formRef = ref()

const { t } = useI18n()

const emit = defineEmits(['success'])


const flow = ref({
      steps: [
            {
                  desc: t('flow.commit'),
                  auditor: [t('flow.applicant')],
                  type: -1,  // 0 audit 1 executor
            }
      ] as Steps[]
} as RespSteps)

const request = new Request

const step = ref({} as Steps)

let auditor = ref([] as AuditorList[])

const { is_open, turnState } = CommonMixins()

const rules = {
      desc: [{ required: true, trigger: 'blur', message: t('common.check.flow') }],
      type: [{ required: true, trigger: 'change', message: t('common.check.type') }],
      auditor: [{ required: true, trigger: 'change', message: t('common.check.auditor') }],

}

const addStep = () => {
      if (step.value.type === 1) {
            for (let i of flow.value.steps) {
                  if (i.type === 1) {
                        message.error(t('flow.execute.tips'))
                        return
                  }
            }
      }
      if (flow.value.steps.length === 7) {
            message.error(t('flow.audit.tips'))
            return
      }
      formRef.value.validateFields().then(() => {
            flow.value.steps.push(Object.assign({}, step.value))
            step.value = {} as Steps
      })
}

const upward = (idx: number) => {
      if (idx - 1 == 0) {
            message.error(t('flow.commit.tips'))
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
            message.error(t('flow.save.tips'))
            return
      }
      request.Post(flow.value).then(() => {
            turnState()
            emit('success')
      })
}

const editFlow = (vl: RespSteps) => {
      flow.value = Object.assign({}, vl)
      turnState()
}

const newFlow = () => {
      step.value = {} as Steps
      flow.value.id = -1
      flow.value.steps = [
            {
                  desc: t('flow.commit'),
                  auditor: [t('flow.applicant')],
                  type: -1,  // 0 audit 1 executor
            }
      ] as Steps[]
      flow.value.source = ""
      turnState()
}

onMounted(() => {
      request.User().then((res: AxiosResponse<Res<AuditorList[]>>) => auditor.value = res.data.payload)
})

defineExpose({
      newFlow,
      editFlow
})

</script>