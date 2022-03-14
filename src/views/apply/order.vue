<template>
      <PageHeader :title="$t('order.apply.commit.title')" :subTitle="$t('order.apply.commit.desc')"></PageHeader>
      <a-steps type="navigation" size="small">
            <a-step
                  v-for="i in orderProfileArch.timeline"
                  :title="i.desc"
                  :sub-title="checkStepState(i.type)"
                  status="process"
            >
                  <template
                        v-slot:description
                  >{{ $t('common.relevant') }}: {{ i.auditor.join(' ') }}</template>
            </a-step>
      </a-steps>
      <br />
      <a-row :gutter="24" type="flex" justify="center">
            <a-col :sm="24" :md="5" :xl="5">
                  <a-card>
                        <a-form v-bind="layout" :model="orderItems" :rules="rules" ref="formRef">
                              <a-form-item :label="$t('common.table.type')">
                                    <span>{{ orderItems.type === 0 ? "DDL" : "DML" }}</span>
                              </a-form-item>
                              <a-form-item :label="$t('common.table.env')">
                                    <span>{{ orderItems.idc }}</span>
                              </a-form-item>
                              <a-form-item :label="$t('common.table.source')">
                                    <span>{{ orderItems.source }}</span>
                              </a-form-item>
                              <a-form-item :label="$t('common.table.schema')" name="data_base">
                                    <a-select
                                          v-model:value="orderItems.data_base"
                                          @change="fetchTable"
                                    >
                                          <a-select-option
                                                v-for=" i in orderProfileArch.db"
                                                :key="i"
                                          >{{ i }}</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item :label="$t('common.table.table')">
                                    <a-select v-model:value="orderItems.table">
                                          <a-select-option
                                                v-for=" i in orderProfileArch.table"
                                                :key="i"
                                          >{{ i }}</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item :label="$t('common.table.remark')" nane="text" required>
                                    <a-textarea
                                          :rows="3"
                                          v-model:value="orderItems.text"
                                          showCount
                                          allowClear
                                    ></a-textarea>
                              </a-form-item>
                              <a-form-item :label="$t('order.profile.timing')">
                                    <a-date-picker show-time @ok="delayTime" />
                              </a-form-item>
                              <a-form-item :label="$t('order.profile.roll')">
                                    <a-radio-group
                                          name="radioGroup"
                                          v-model:value="orderItems.backup"
                                    >
                                          <a-radio :value="1">{{ $t('common.yes') }}</a-radio>
                                          <a-radio :value="0">{{ $t('common.no') }}</a-radio>
                                    </a-radio-group>
                              </a-form-item>
                              <a-form-item :label="$t('common.action')">
                                    <a-space>
                                          <a-button
                                                @click="fetchTableArch"
                                          >{{ $t('order.apply.table.info') }}</a-button>
                                          <a-button
                                                @click="postOrder"
                                                :disabled="enabled"
                                          >{{ $t('common.commit') }}</a-button>
                                    </a-space>
                              </a-form-item>
                        </a-form>
                  </a-card>
            </a-col>
            <a-col :sm="24" :md="19" :xl="19">
                  <div style="min-height: 600px;">
                        <a-tabs v-model:activeKey="activeKey">
                              <a-tab-pane :key="1" :tab="$t('order.apply.tab.sql')" forceRender>
                                    <a-spin :spinning="spin" :delay="100">
                                          <Editor
                                                container-id="applys"
                                                ref="editor"
                                                :height="400"
                                                @getValues="testResults"
                                          ></Editor>
                                          <br />
                                          <a-table
                                                :columns="col"
                                                :data-source="tData"
                                                bordered
                                                rowKey="sql"
                                          ></a-table>
                                    </a-spin>
                              </a-tab-pane>
                              <a-tab-pane :key="2" :tab="$t('order.apply.tab.table')" force-render>
                                    <a-table
                                          :columns="tableArch"
                                          :data-source="archData"
                                          bordered
                                          :scroll="{ y: 400 }"
                                          rowKey="field"
                                    ></a-table>
                              </a-tab-pane>
                              <a-tab-pane :key="3" :tab="$t('order.apply.tab.index')">
                                    <a-table
                                          :columns="indexArch"
                                          :data-source="indexData"
                                          bordered
                                          rowKey="IndexName"
                                    >
                                          <template
                                                #NonUnique="{ text }"
                                          >{{ text === 0 ? '是' : '否' }}</template>
                                    </a-table>
                              </a-tab-pane>
                        </a-tabs>
                  </div>
            </a-col>
      </a-row>
</template>
<script lang="ts" setup>
import Editor from '@/components/editor/editor.vue';
import JunoMixin from '@/mixins/juno'
import { onMounted, ref, onUnmounted } from '@vue/runtime-core';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import { OrderItem, SQLTesting } from "@/types"
import FetchMixins from '@/mixins/fetch'
import PageHeader from "@/components/pageHeader/pageHeader.vue"
import { AxiosResponse } from 'axios';
import { Res } from '@/config/request';
import { DBRelated, Timeline } from "@/apis/fetchSchema"
import { Dayjs } from 'dayjs';
import { message } from 'ant-design-vue';
import { Request, SQLTestParams } from '@/apis/orderPostApis';
import { Request as FetchRequest } from "@/apis/fetchSchema"
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import CommonMixins from "@/mixins/common"
import router from '@/router';
import { store } from '@/store';
import { Modal } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const layout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 20 },
};

const activeKey = ref(1)

const archData = ref([])

const indexData = ref([])

const spin = ref(false)

const formRef = ref()

const route = useRoute()

const request = new Request

const fetchRequest = new FetchRequest

const enabled = ref(true)

const { checkStepState } = CommonMixins()

const rules = {
      data_base: [
            { required: true, message: '请选择对应的数据库', trigger: 'change' },
      ],
      text: [
            { required: true, message: '请填写工单说明', trigger: 'blur' },
      ]
}

const tData = ref([] as SQLTesting[])

const { col, orderItems, tableArch, indexArch } = JunoMixin()

const { orderProfileArch, editor } = FetchMixins()

const delayTime = (date: Dayjs) => {
      orderItems.delay = date.format('yyyy-MM-DD HH:mm')
}

const fetchTable = (data_base: string) => {
      fetchRequest.Table(orderItems.source_id, data_base).then((res: AxiosResponse<Res<DBRelated>>) => {
            orderProfileArch.table = res.data.payload.results
      })
}

const fetchTableArch = () => {
      fetchRequest.Arch({
            source_id: orderItems.source_id,
            data_base: orderItems.data_base,
            table: orderItems.table,
      }).then((res: AxiosResponse<Res<any>>) => {
            archData.value = res.data.payload.rows
            indexData.value = res.data.payload.idx
            activeKey.value = 2
            message.success('已获取表结构信息')
      })
}

const testResults = (sql: string) => {
      console.log(orderItems.type)
      spin.value = !spin.value
      request.Test({
            source: orderItems.source,
            kind: orderItems.type,
            data_base: orderItems.data_base,
            sql: sql
      } as SQLTestParams)
            .then((res: AxiosResponse<Res<SQLTesting[]>>) => {
                  let counter = 0
                  tData.value = res.data.payload
                  tData.value.forEach((item: SQLTesting) => {
                        if (item.level !== 0) {
                              counter++
                        }
                  })
                  enabled.value = counter !== 0
            })
            .finally(() => spin.value = !spin.value)
}

const postOrder = () => {
      formRef.value.validate().then(() => {
            let warpper = Object.assign({}, orderItems)
            warpper.sql = editor.value.GetValue()
            orderProfileArch.timeline.forEach((item) => {
                  warpper.relevant = warpper.relevant.concat(item.auditor)
            })
            request.Post(warpper).finally(() => enabled.value = true)
      }).catch((error: ValidateErrorEntity<OrderItem>) => {
            message.error("请填写必要信息后提交工单")
      })

}


onMounted(() => {
      orderItems.type = parseInt(route.query.type as string)
      orderItems.idc = route.query.idc as string
      orderItems.source = route.query.source as string
      orderItems.source_id = route.query.source_id as string

      fetchRequest.Schema(orderItems.source_id, "", true).then((res: AxiosResponse<Res<DBRelated>>) => {
            orderProfileArch.db = res.data.payload.results
            editor.value.RunEditor(res.data.payload.highlight)
      })
      fetchRequest.TimeLine(orderItems.source_id).then((res: AxiosResponse<Res<Timeline[]>>) => {
            res.data.code === 5555 ? router.go(-1) : orderProfileArch.timeline = res.data.payload
      })

      route.query.remark === 'true' ? editor.value.ChangeEditorText(store.state.common.sql) : null

      window.onbeforeunload = function () {
            return t('common.leave')
      }
})

onBeforeRouteLeave((to, from, next) => {
      Modal.warn({
            content: t('common.leave'),
            onOk: () => {
                  next()
            },
            onCancel: () => {
                  router.go(1)
            },
            okCancel: true
      })
})

onUnmounted(() => {
      window.onbeforeunload = null;
})


</script>