<template>
      <PageHeader title="2021021203102893" sub-title="工单详情">
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
                                    strokeColor="#793EF9"
                                    style="position: relative"
                              />
                              <div style=" position: absolute; top: 5%; left: 50%; ">
                                    <span>审核中</span>
                              </div>
                        </a-col>
                  </a-row>
                  <br />
                  <Step :current="1" :step="stepList"></Step>
            </template>
      </PageHeader>

      <a-row :gutter="24" type="flex" justify="center">
            <a-col :xs="24" :sm="5">
                  <a-descriptions title="工单信息" :column="1">
                        <a-descriptions-item label="工单类型">Zhou Maomao</a-descriptions-item>
                        <a-descriptions-item label="环境">1810000000</a-descriptions-item>
                        <a-descriptions-item label="数据源">Hangzhou, Zhejiang</a-descriptions-item>
                        <a-descriptions-item label="库名">empty</a-descriptions-item>
                        <a-descriptions-item label="相关人员"></a-descriptions-item>
                  </a-descriptions>
                  <a-divider orientation="left" dashed></a-divider>
                  <a-timeline pending="Recording...">
                        <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
                        <a-timeline-item color="green">Solve initial network problems 2015-09-01</a-timeline-item>
                        <a-timeline-item>
                              <template #dot>
                                    <ClockCircleOutlined style="font-size: 16px" />
                              </template>
                              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                              beatae vitae dicta sunt explicabo.
                        </a-timeline-item>
                  </a-timeline>
            </a-col>
            <a-col :xs="24" :sm="18">
                  <Editor container-id="profile"></Editor>
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
import { Template } from "@/views/common/types";
const { col } = JunoMixin()

const stepList: Template[] = [
      {
            auditor: [],
            desc: "发起阶段",
            type: 0,

      },
      {
            auditor: ["admin", "zhangjin", "henry", "bob"],
            desc: "业务组审核",
            type: 0,
      },
      {
            auditor: ["admin", "zhangjin", "henry", "bob"],
            desc: "DBA执行",
            type: 1,
      }
]


</script>