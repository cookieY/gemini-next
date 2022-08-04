<template>
      <PageHeader :title="$t('order.apply.commit.title')" :subTitle="$t('order.apply.commit.desc')"></PageHeader>
      <a-card>
            <a-steps size="small" progress-dot>
                  <a-step v-for="i in orderProfileArch.timeline" :title="i.desc" status="process">
                        <template #subTitle>
                              <a-tooltip placement="top">
                                    <template #title>
                                          <span>{{ $t('common.relevant') }}: {{ i.auditor.join(' ') }}</span>
                                    </template>
                                    {{ checkStepState(i.type) }}
                              </a-tooltip>

                        </template>
                        <!-- <template v-slot:description>{{ $t('common.relevant') }}: {{ i.auditor.join(' ') }}</template> -->
                  </a-step>
            </a-steps>
      </a-card>
      <br>
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
                                    <a-select v-model:value="orderItems.data_base" @change="fetchTable"
                                          :dropdownMatchSelectWidth="false" show-search>
                                          <a-select-option v-for=" i in orderProfileArch.db" :key="i">{{ i }}
                                          </a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item :label="$t('common.table.table')">
                                    <a-select v-model:value="orderItems.table" :dropdownMatchSelectWidth="false"
                                          show-search>
                                          <a-select-option v-for=" i in orderProfileArch.table" :key="i">{{ i }}
                                          </a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item :label="$t('common.table.remark')" name="text">
                                    <a-textarea :rows="3" v-model:value="orderItems.text" showCount allowClear>
                                    </a-textarea>
                              </a-form-item>
                              <a-form-item :label="$t('order.profile.timing')">
                                    <a-date-picker show-time @ok="delayTime" />
                              </a-form-item>
                              <a-form-item :label="$t('order.profile.roll')">
                                    <a-radio-group name="radioGroup" v-model:value="orderItems.backup">
                                          <a-radio :value="1">{{ $t('common.yes') }}</a-radio>
                                          <a-radio :value="0">{{ $t('common.no') }}</a-radio>
                                    </a-radio-group>
                              </a-form-item>
                              <a-form-item :label="$t('common.action')">
                                    <a-space>
                                          <a-button :loading="loadingTblBtn" @click="fetchTableArch">{{
                                                      $t('order.apply.table.info')
                                          }}</a-button>
                                          <a-button :loading="loadingPostBtn" @click="postOrder" :disabled="enabled">{{
                                                      $t('common.commit')
                                          }}</a-button>
                                    </a-space>
                              </a-form-item>
                        </a-form>
                  </a-card>
            </a-col>
            <a-col :sm="24" :md="19" :xl="19">
                  <a-card style="min-height: 600px;">
                        <a-tabs v-model:activeKey="activeKey">
                              <a-tab-pane :key="1" :tab="$t('order.apply.tab.sql')" forceRender>
                                    <a-spin :spinning="spin" :delay="100">
                                          <div class="editor_border">
                                                <Editor container-id="applys" ref="editor" @getValues="testResults"
                                                      @changeContent="() => !enabled ? enabled = true : null">
                                                </Editor>
                                          </div>
                                          <br />
                                          <a-table :columns="col" :data-source="tData" bordered rowKey="sql"></a-table>
                                    </a-spin>
                              </a-tab-pane>
                              <a-tab-pane :key="2" :tab="$t('order.apply.tab.table')" force-render>
                                    <a-table :columns="tableArch" :data-source="archData" bordered :scroll="{ y: 400 }"
                                          rowKey="field"></a-table>
                              </a-tab-pane>
                              <a-tab-pane :key="3" :tab="$t('order.apply.tab.index')">
                                    <a-table :columns="indexArch" :data-source="indexData" bordered rowKey="IndexName">
                                          <template #bodyCell="{ column, text, record }">
                                                <template v-if="column.dataIndex === 'NonUnique'">{{ text === 0 ?
                                                            $t('common.yes') : $t('common.no')
                                                }}</template>
                                          </template>
                                    </a-table>
                              </a-tab-pane>
                        </a-tabs>
                  </a-card>
            </a-col>
      </a-row>
</template>
<script lang="ts" setup>
import Editor from '@/components/editor/editor.vue';
import JunoMixin from '@/mixins/juno'
import { onMounted, ref, onUnmounted } from '@vue/runtime-core';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import { SQLTesting } from "@/types"
import FetchMixins from '@/mixins/fetch'
import PageHeader from "@/components/pageHeader/pageHeader.vue"
import { AxiosResponse } from 'axios';
import { Res } from '@/config/request';
import { DBRelated, Timeline } from "@/apis/fetchSchema"
import { Dayjs } from 'dayjs';
import { message } from 'ant-design-vue';
import { Request, SQLTestParams } from '@/apis/orderPostApis';
import { Request as FetchRequest } from "@/apis/fetchSchema"
import CommonMixins from "@/mixins/common"
import router from '@/router';
import { useStore } from '@/store';
import { Modal } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import { debounce } from "lodash-es"
import { createSQLToken } from '@/components/editor/impl';
import * as monaco from 'monaco-editor';

const { t } = useI18n()

const layout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 20 },
};

const loadingTblBtn = ref(false)

const loadingPostBtn = ref(false)

const activeKey = ref(1)

const archData = ref([])

const indexData = ref([])

const spin = ref(false)

const formRef = ref()

const route = useRoute()

const store = useStore()

const request = new Request

const fetchRequest = new FetchRequest

const enabled = ref(true)

const { checkStepState } = CommonMixins()

let monaco_editor: any = null

const rules = {
      data_base: [
            { required: true, message: t('common.check.source'), trigger: 'change' },
      ],
      text: [
            { required: true, message: t('common.check.text'), trigger: 'blur' },
      ]
}

const tData = ref([] as SQLTesting[])

const { col, orderItems, tableArch, indexArch } = JunoMixin()

const { orderProfileArch, editor } = FetchMixins()

const delayTime = (date: Dayjs) => {
      orderItems.delay = date.format('YYYY-MM-DD HH:mm')
}

const fetchTable = (data_base: string) => {
      fetchRequest.Table(orderItems.source_id, data_base).then((res: AxiosResponse<Res<DBRelated>>) => {
            orderProfileArch.table = res.data.payload.results
      })
}

const fetchTableArch = () => {
      loadingTblBtn.value = !loadingTblBtn.value
      fetchRequest.Arch({
            source_id: orderItems.source_id,
            data_base: orderItems.data_base,
            table: orderItems.table,
      }).then((res: AxiosResponse<Res<any>>) => {
            archData.value = res.data.payload.rows
            indexData.value = res.data.payload.idx
            activeKey.value = 2
            message.success(t('order.apply.table.info') + t('common.success'))
      }).finally(() => {
            loadingTblBtn.value = !loadingTblBtn.value
      })
}

const testResults = debounce((sql: string) => {
      spin.value = !spin.value
      request.Test({
            source_id: orderItems.source_id,
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
}, 200)

const postOrder = debounce(() => {
      loadingPostBtn.value = !loadingPostBtn.value
      formRef.value.validate().then(() => {
            let warpper = Object.assign({}, orderItems)
            warpper.sql = editor.value.GetValue()
            orderProfileArch.timeline.forEach((item) => {
                  warpper.relevant = warpper.relevant.concat(item.auditor)
            })
            request.Post(warpper).finally(() => enabled.value = true)
      }).catch(() => {
            message.error(t('order.apply.form.commit'))
      }).finally(() => loadingPostBtn.value = !loadingPostBtn.value)
}, 200)

const fetchHighLight = () => {

      const highlight = store.state.highlight.highlight
      if (highlight[orderItems.source_id as string] === undefined) {
            fetchRequest.HighLight(orderItems.source_id).then((res: AxiosResponse<Res<any>>) => {
                  store.commit("highlight/SAVE_HIGHLIGHT", { key: orderItems.source_id, highlight: res.data.payload })
            })
      }
      monaco_editor = monaco.languages.registerCompletionItemProvider('sql', {
            provideCompletionItems: (model, position): monaco.languages.ProviderResult<monaco.languages.CompletionList> => {
                  let word = model.getWordUntilPosition(position);
                  let range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                  };
                  return {
                        suggestions: createSQLToken(range, store.state.highlight.highlight[orderItems.source_id])
                  }
            },
            triggerCharacters: ['.']

      });
}


onMounted(() => {
      orderItems.type = parseInt(route.query.type as string)
      orderItems.idc = route.query.idc as string
      orderItems.source = route.query.source as string
      orderItems.source_id = route.query.source_id as string

      fetchRequest.Schema(orderItems.source_id, "", true).then((res: AxiosResponse<Res<DBRelated>>) => {
            orderProfileArch.db = res.data.payload.results
      })

      fetchRequest.TimeLine(orderItems.source_id).then((res: AxiosResponse<Res<Timeline[]>>) => {
            res.data.code === 5555 ? router.go(-1) : orderProfileArch.timeline = res.data.payload
      })

      fetchHighLight()

      route.query.remark === 'true' ? editor.value.ChangeEditorText(store.state.common.sql) : null

      window.onbeforeunload = function () {
            if (editor.value.GetValue() !== '') {
                  return t('common.leave')
            }

      }
})

onBeforeRouteLeave((to, from, next) => {
      if (editor.value.GetValue() !== '') {
            Modal.warn({
                  content: t('common.leave'),
                  onOk: () => {
                        next()
                  },
                  onCancel: () => {
                        router.go(11)
                  },
                  okCancel: true
            })
      } else {
            next()
      }

})

onUnmounted(() => {
      window.onbeforeunload = null;
      monaco_editor.dispose()
})


</script>