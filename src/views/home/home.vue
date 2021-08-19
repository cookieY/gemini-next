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
                                    <MiniArea containerId="j" color="#Ff9900" />
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
                                    <!-- <MiniArea containerId="j" color="#Ff9900" /> -->
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
      </div>
</template>

<script setup lang="ts">

import { SelfCount } from "@/views/home/homeApis"
import ChartCard from "@/components/chartCard/chartCard.vue"
import MiniArea from "@/components/chartCard/miniArea.vue";
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