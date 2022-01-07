<template>
      <a-page-header :title="`单号:${order.work_id}`" @back="() => $router.go(-1)">
            <template #extra>
                  <template
                        v-if="route.params.tp === 'audit' && isCurrent > -1 && order.status === 2"
                  >
                        <a-button key="2" danger ghost @click="r.turnState()">驳回该工单</a-button>
                        <a-button key="1" type="primary" :disabled="enabled" @click="next">审核通过</a-button>
                  </template>
            </template>
            <a-row type="flex" justify="center" align="middle">
                  <a-col :span="16">
                        <a-descriptions :column="2">
                              <a-descriptions-item
                                    label="工单类型"
                              >{{ order.type === 0 ? 'DDL' : 'DML' }}</a-descriptions-item>
                              <a-descriptions-item label="环境">{{ order.idc }}</a-descriptions-item>
                              <a-descriptions-item label="数据源">{{ order.source }}</a-descriptions-item>
                              <a-descriptions-item label="库名">{{ order.data_base }}</a-descriptions-item>
                              <a-descriptions-item label="生成回滚语句">{{ order.backup ? '是' : '否' }}</a-descriptions-item>
                              <a-descriptions-item label="定时执行">{{ order.delay }}</a-descriptions-item>
                              <a-descriptions-item label="当前审核人">
                                    <template v-for="i in order.assigned.split(',')" :key="i">
                                          <a-tag v-if="i !== '提交人'" color="#408B9B">{{ i }}</a-tag>
                                    </template>
                              </a-descriptions-item>
                        </a-descriptions>
                  </a-col>
                  <a-col :span="8">
                        <a-progress
                              :percent="(order.current_step / orderProfileArch.timeline.length) * 100"
                              :strokeWidth="5"
                              :width="150"
                              :stroke-color="StateUsege(order.status).color"
                              type="circle"
                              style="position: relative"
                        >
                              <template #format="percent">
                                    <span
                                          style="color: rgb(193, 205, 214);"
                                    >{{ StateUsege(order.status).title }}</span>
                              </template>
                        </a-progress>
                  </a-col>
            </a-row>
      </a-page-header>
      <a-tabs>
            <a-tab-pane key="1" tab="详情">
                  <a-card title="流程信息" size="small">
                        <Step :current="order.current_step" :step="orderProfileArch.timeline"></Step>
                  </a-card>
                  <br />
                  <a-row :gutter="24">
                        <a-col :xs="24" :sm="5">
                              <a-card style="height: 500px;" title="进度信息" size="small">
                                    <a-timeline
                                          :pending="order.current_step === orderProfileArch.timeline.length ? false : 'Recording...'"
                                    >
                                          <a-timeline-item
                                                v-for="i in usege"
                                                :key="i.id"
                                                color="green"
                                          >{{ i.username }} {{ i.action }} {{ i.time }}</a-timeline-item>
                                    </a-timeline>
                              </a-card>
                              <br />
                              <a-alert message="功能信息" type="info" show-icon>
                                    <template #description>1.在编辑框内右键可进行SQL检测与SQL美化功能</template>
                              </a-alert>
                        </a-col>
                        <a-col :xs="24" :sm="19">
                              <a-spin :spinning="spin" :delay="100">
                                    <Editor
                                          container-id="profile"
                                          ref="profile"
                                          readonly
                                          @getValues="testResults"
                                    ></Editor>
                                    <br />
                                    <a-table
                                          :columns="col"
                                          bordered
                                          size="small"
                                          :dataSource="tData"
                                    ></a-table>
                              </a-spin>
                        </a-col>
                  </a-row>
            </a-tab-pane>

            <a-tab-pane key="2" tab="评论">
                  <Comment :work_id="order.work_id"></Comment>
            </a-tab-pane>

            <a-tab-pane key="3" tab="执行结果">
                  <Results :work_id="order.work_id"></Results>
            </a-tab-pane>

            <a-tab-pane key="4" tab="OSC进度" v-if="order.type === 0"></a-tab-pane>
      </a-tabs>

      <RejectModal :work_id="order.work_id" ref="r"></RejectModal>
</template>
<script lang="ts"  setup>
import RejectModal from "./rejectModal.vue";
import Editor from "@/components/editor/editor.vue";
import JunoMixin from '@/mixins/juno'
import Comment from "./comment.vue";
import Results from "./results.vue";
import Step from '@/components/steps/steps.vue'
import router from "@/router";
import { useStore } from "@/store";
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import FetchMixins from "@/mixins/fetch"
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";
import { StateUsege } from "@/lib"
import { Request, SQLTestParams } from "@/apis/orderPostApis";
import { SQLTesting } from "@/types";
import { useRoute } from "vue-router";
import { Timeline } from "@/apis/fetchSchema";

interface stepUsege {
      action: string
      time: string
      username: string
      id: number
}

const { col } = JunoMixin()

const r = ref()

const store = useStore()

const profile = ref()

const tData = ref()

const enabled = ref(true)

const spin = ref(false)

const request = new Request

const route = useRoute()

const order = computed(() => store.state.order.order)

const { FetchStepUsege, FetchProfileSQL, orderProfileArch, fetchRequest } = FetchMixins()

const usege = ref([] as stepUsege[])

const testResults = (sql: string) => {
      spin.value = !spin.value
      request.Test({
            source: order.value.source,
            is_dml: order.value.type === 1,
            data_base: order.value.data_base,
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

const next = () => {
      request.Next({
            work_id: order.value.work_id as string,
            flag: order.value.current_step as number,
            tp: 'agree',
            source_id: order.value.source_id
      }).then(() => {
            router.go(-1)
      })
}

const isCurrent = ref(-1)

onMounted(() => {

      fetchRequest.TimeLine(order.value.source_id as string).then((res: AxiosResponse<Res<Timeline[]>>) => {
            res.data.code === 5555 ? router.go(-1) : orderProfileArch.timeline = res.data.payload; isCurrent.value = orderProfileArch.timeline[order.value.current_step].auditor.indexOf(store.state.user.account.user)

      })
      FetchStepUsege(order.value.work_id).then((res: AxiosResponse<Res<stepUsege[]>>) => {
            usege.value = res.data.payload
      })
      FetchProfileSQL(order.value.work_id, "10").then((res: AxiosResponse<Res<{ [key: string]: string }>>) => {
            profile.value.ChangeEditorText(res.data.payload.sqls)
      })
})


</script>