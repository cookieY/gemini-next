<template>
      <div>
            <a-row :gutter="24">
                  <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                        <ChartCard :loading="loading" title="工单总数" total="10000">
                              <template v-slot:action>
                                    <a-tooltip title="3213131">
                                          <InfoCircleOutlined />
                                    </a-tooltip>
                              </template>
                              <template v-slot:content>
                                    <MiniArea containerId="order" color="#2094F3" />
                              </template>

                              <template v-slot:footer>
                                    昨日提交数：
                                    <span>12</span>
                              </template>
                        </ChartCard>
                  </a-col>
                  <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                        <ChartCard :loading="loading" title="查询总数" total="10000">
                              <template v-slot:action>
                                    <a-tooltip title="3213131">
                                          <InfoCircleOutlined />
                                    </a-tooltip>
                              </template>
                              <template v-slot:content>
                                    <MiniArea containerId="query" color="#Ff9900" />
                              </template>

                              <template v-slot:footer>
                                    昨日查询数：
                                    <span>12</span>
                              </template>
                        </ChartCard>
                  </a-col>
                  <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                        <ChartCard :loading="loading" title="数据源" total="10000">
                              <template v-slot:action>
                                    <a-tooltip title="3213131">
                                          <InfoCircleOutlined />
                                    </a-tooltip>
                              </template>
                              <template v-slot:content>
                                    <MiniCol container-id="source" color="#009485"></MiniCol>
                              </template>

                              <template v-slot:footer>
                                    昨日查询数：
                                    <span>12</span>
                              </template>
                        </ChartCard>
                  </a-col>
                  <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                        <ChartCard :loading="loading" title="用户数" total="10000">
                              <template v-slot:action>
                                    <a-tooltip title="3213131">
                                          <InfoCircleOutlined />
                                    </a-tooltip>
                              </template>
                              <template v-slot:content>
                                    <a-progress
                                          :percent="85"
                                          status="active"
                                          :show-info="false"
                                          :strokeWidth="15"
                                          :strokeColor="{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                          }"
                                    />
                              </template>

                              <template v-slot:footer>
                                    昨日查询数：
                                    <span>12</span>
                              </template>
                        </ChartCard>
                  </a-col>
            </a-row>
            <div style="width: 99%;margin: 0 auto;">
                  <a-card style="text-align: center;">
                        <a-row :gutter="24">
                              <a-col :sm="24" :md="12" :xl="6">
                                    <a-statistic title="我提交工单数" :value="112893" />
                              </a-col>
                              <a-col :sm="24" :md="12" :xl="6">
                                    <a-statistic title="我正在审核中工单数" :value="112893" />
                              </a-col>
                              <a-col :sm="24" :md="12" :xl="6">
                                    <a-statistic title="我的查询总数" :value="112893" />
                              </a-col>
                              <a-col :sm="24" :md="12" :xl="6">
                                    <a-statistic title="等待我审核的工单" :value="112893" />
                              </a-col>
                        </a-row>
                  </a-card>
                  <br />
                  <a-row :gutter="24">
                        <a-col :sm="24" :md="24" :xl="16">
                              <a-card title="公告" style="height: 560px;">
                                    <div></div>
                              </a-card>
                        </a-col>
                        <a-col :sm="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">
                              <a-card title="数据源top10">
                                    <MiniBar container-id="thend" color="#Ff9900"></MiniBar>
                              </a-card>
                        </a-col>
                  </a-row>
            </div>
      </div>
</template>

<script setup lang="ts">
import ChartCard from "@/components/chartCard/chartCard.vue"
import MiniArea from "@/components/chartCard/miniArea.vue";
import MiniCol from "@/components/chartCard/miniCol.vue";
import MiniBar from "@/components/chartCard/miniBar.vue";
import { InfoCircleOutlined } from '@ant-design/icons-vue';

const description = (): string => {
      const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
      const index = Math.floor(Math.random() * arr.length)
      return arr[index]
}

const now = (): string => {
      const time = new Date()
      const hour = time.getHours()
      return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

const loading = false


</script>