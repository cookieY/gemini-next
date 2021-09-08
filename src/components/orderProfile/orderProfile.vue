<template>
      <PageHeader :title="order.work_id" sub-title="工单详情">
            <template v-slot:extra>
                  <a-button key="2" danger ghost>驳回该工单</a-button>
                  <a-button key="1" type="primary">审核通过</a-button>
            </template>
            <template v-slot:content>
                  <a-row type="flex" justify="center" align="middle">
                        <a-col :span="24">
                              <a-progress
                                    :percent="100"
                                    status="active"
                                    :showInfo="false"
                                    :strokeWidth="25"
                                    :strokeColor="StateUsege(order.status).color"
                                    style="position: relative"
                              />
                              <div style=" position: absolute; top: 5%; left: 50%; ">
                                    <span>{{ StateUsege(order.status).title }}</span>
                              </div>
                        </a-col>
                  </a-row>
                  <br />
                  <Step :current="order.current_step" :step="orderProfileArch.timeline"></Step>
            </template>
      </PageHeader>

      <a-row :gutter="24" type="flex" justify="center">
            <a-col :xs="24" :sm="5">
                  <a-descriptions title="工单信息" :column="1">
                        <a-descriptions-item label="工单类型">{{ order.type === 0 ? 'DDL' : 'DML' }}</a-descriptions-item>
                        <a-descriptions-item label="环境">{{ order.idc }}</a-descriptions-item>
                        <a-descriptions-item label="数据源">{{ order.source }}</a-descriptions-item>
                        <a-descriptions-item label="库名">{{ order.data_base }}</a-descriptions-item>
                        <a-descriptions-item label="生成回滚语句">{{ order.backup ? '是' : '否' }}</a-descriptions-item>
                        <a-descriptions-item label="定时执行">{{ order.delay }}</a-descriptions-item>
                        <a-descriptions-item label="相关人员">
                              <template v-for="i in order.relevant" :key="i">
                                    <a-tag v-if="i !== '提交人'" color="#2094FC">{{ i }}</a-tag>
                              </template>
                        </a-descriptions-item>
                  </a-descriptions>
                  <a-divider orientation="left" dashed></a-divider>
                  <a-timeline pending="Recording...">
                        <a-timeline-item
                              v-for="i in usege"
                              :key="i.id"
                              color="green"
                        >{{ i.action }} {{ i.time }}</a-timeline-item>
                  </a-timeline>
            </a-col>
            <a-col :xs="24" :sm="18">
                  <Editor container-id="profile" ref="profile" readonly></Editor>
                  <br />
                  <a-table :columns="col"></a-table>
            </a-col>
      </a-row>
</template>
<script lang="ts"  setup>
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import Editor from "@/components/editor/editor.vue";
import JunoMixin from '@/mixins/juno'
import Step from '@/components/steps/steps.vue'
import { useStore } from "@/store";
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import FetchMixins from "@/mixins/fetch"
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";
import { StateUsege } from "@/lib"

interface stepUsege {
      action: string
      time: string
      username: string
      id: number
}

const { col } = JunoMixin()

const store = useStore()
const profile = ref()

const order = computed(() => store.state.order.order)

const { FetchTimeline, FetchStepUsege, FetchProfileSQL, orderProfileArch } = FetchMixins()

const usege = ref([] as stepUsege[])

onMounted(() => {
      FetchTimeline(order.value.idc)
      FetchStepUsege(order.value.work_id).then((res: AxiosResponse<Res<stepUsege[]>>) => {
            usege.value = res.data.payload
      })
      FetchProfileSQL(order.value.work_id, "10").then((res: AxiosResponse<Res<{ [key: string]: string }>>) => {
            profile.value.ChangeEditorText(res.data.payload.sqls)
      })
})


</script>