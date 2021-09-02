<template>
      <PageHeader title="工单申请填写" subTitle="填写提交信息并对SQL进行检测"></PageHeader>
      <a-steps type="navigation" size="small">
            <a-step
                  v-for="i in orderProfileArch.timeline"
                  :title="i.desc"
                  :sub-title="i.type === 0 ? '审核' : '执行'"
                  status="process"
            >
                  <template v-slot:description>操作人: {{ i.auditor.join(' ') }}</template>
            </a-step>
      </a-steps>
      <br />
      <a-row :gutter="24" type="flex" justify="center" align="middle">
            <a-col :sm="24" :md="8" :xl="8">
                  <a-form v-bind="layout">
                        <a-form-item label="工单类型">
                              <a-input disabled v-model:value="orderItems.type"></a-input>
                        </a-form-item>
                        <a-form-item label="环境">
                              <a-input disabled v-model:value="orderItems.idc"></a-input>
                        </a-form-item>
                        <a-form-item label="数据源">
                              <a-input disabled v-model:value="orderItems.source"></a-input>
                        </a-form-item>
                        <a-form-item label="库名">
                              <a-select v-model:value="orderItems.data_base" @change="fetchTable">
                                    <a-select-option
                                          v-for=" i in orderProfileArch.db"
                                          :key="i"
                                    >{{ i }}</a-select-option>
                              </a-select>
                        </a-form-item>
                        <a-form-item label="表名">
                              <a-select v-model:value="orderItems.table">
                                    <a-select-option
                                          v-for=" i in orderProfileArch.table"
                                          :key="i"
                                    >{{ i }}</a-select-option>
                              </a-select>
                        </a-form-item>
                        <a-form-item label="工单说明">
                              <a-textarea
                                    :rows="3"
                                    v-model:value="orderItems.text"
                                    showCount
                                    allowClear
                              ></a-textarea>
                        </a-form-item>
                        <a-form-item label="定时执行">
                              <a-date-picker show-time placeholder="Select Time" @ok="delayTime" />
                        </a-form-item>
                        <a-form-item label="生成回滚语句">
                              <a-radio-group name="radioGroup" v-model:value="orderItems.backup">
                                    <a-radio :value="1">是</a-radio>
                                    <a-radio :value="0">否</a-radio>
                              </a-radio-group>
                        </a-form-item>
                        <a-form-item label="操作">
                              <a-space>
                                    <a-button @click="fetchTableArch">获取表结构信息</a-button>
                                    <a-button>提交工单</a-button>
                              </a-space>
                        </a-form-item>
                  </a-form>
            </a-col>
            <a-col :sm="24" :md="16" :xl="16">
                  <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane :key="1" tab="填写SQL语句">
                              <Editor container-id="applys" ref="editor" :height="500"></Editor>
                        </a-tab-pane>
                        <a-tab-pane :key="2" tab="表结构详情" force-render>
                              <a-table
                                    style="height: 500px;"
                                    :columns="tableArch"
                                    :data-source="archData"
                                    bordered
                              ></a-table>
                        </a-tab-pane>
                        <a-tab-pane :key="3" tab="索引详情">
                              <a-table style="height: 500px;"></a-table>
                        </a-tab-pane>
                  </a-tabs>
            </a-col>
      </a-row>
      <br />
      <a-table :columns="col" :data-source="tData" bordered></a-table>
</template>
<script lang="ts"  setup>
import Editor from '@/components/editor/editor.vue';
import JunoMixin from '@/mixins/juno'
import { onMounted, ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { SQLTesting } from "@/views/common/types"
import FetchMixins from '@/mixins/fetch'
import PageHeader from "@/components/pageHeader/pageHeader.vue"
import { AxiosResponse } from 'axios';
import { Res } from '@/config/request';
import { FetchTableArchApis, TableArch } from "@/apis/fetchDB"
import * as moment from "moment"

const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
};

const activeKey = ref(1)

const route = useRoute()

const tData = ref([] as SQLTesting[])

const archData = ref([])

const { col, orderItems, tableArch } = JunoMixin()

const { orderProfileArch, editor, FetchDBName, FetchTimeline, FetchTableName } = FetchMixins()

const delayTime = (date: moment.Moment) => {
      orderItems.delay = date.format('yyyy-MM-dd HH:mm')
}

const fetchTable = (data_base: string) => {
      FetchTableName(orderItems.source, data_base)
}

const fetchTableArch = () => {
      FetchTableArchApis({
            source: orderItems.source,
            data_base: orderItems.data_base,
            table: orderItems.table
      }).then((res: AxiosResponse<Res<any>>) => {
            archData.value = res.data.payload.rows
      })
}


onMounted(() => {
      orderItems.type = route.query.type as string
      orderItems.idc = route.query.idc as string
      orderItems.source = route.query.source as string
      FetchDBName(orderItems.source)
      FetchTimeline(orderItems.idc)
})

</script>