<template>
      <div>
            <a-row :gutter="24">
                  <a-col :xs="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                        <ChartCard :loading="loading" title="工单总数" :total="banner.order">
                              <template v-slot:action>
                                    <a-tooltip title="3213131">
                                          <InfoCircleOutlined />
                                    </a-tooltip>
                              </template>
                              <template v-slot:content>
                                    <MiniArea containerId="order" color="#2094F3" />
                              </template>
                        </ChartCard>
                  </a-col>
                  <a-col :xs="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                        <ChartCard :loading="loading" title="查询总数" :total="banner.query">
                              <template v-slot:action>
                                    <a-tooltip title="3213131">
                                          <InfoCircleOutlined />
                                    </a-tooltip>
                              </template>
                              <template v-slot:content>
                                    <MiniArea containerId="query" color="#Ff9900" />
                              </template>
                        </ChartCard>
                  </a-col>
                  <a-col :xs="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                        <ChartCard :loading="loading" title="数据源" :total="banner.source">
                              <template v-slot:action>
                                    <a-tooltip title="3213131">
                                          <InfoCircleOutlined />
                                    </a-tooltip>
                              </template>
                              <template v-slot:content>
                                    <MiniCol container-id="source" color="#009485"></MiniCol>
                              </template>
                        </ChartCard>
                  </a-col>
                  <a-col :xs="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                        <ChartCard :loading="loading" title="用户数" :total="banner.user">
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
                        </ChartCard>
                  </a-col>
            </a-row>

            <a-card style="text-align: center;">
                  <a-row :gutter="24">
                        <a-col :xs="24" :md="12" :xl="6">
                              <a-statistic
                                    :title="$t('common.bash.self.dml')"
                                    :value="banner.self_dml"
                              />
                        </a-col>
                        <a-col :xs="24" :md="12" :xl="6">
                              <a-statistic
                                    :title="$t('common.bash.self.ddl')"
                                    :value="banner.self_ddl"
                              />
                        </a-col>
                        <a-col :xs="24" :md="12" :xl="6">
                              <a-statistic
                                    :title="$t('common.bash.self.query')"
                                    :value="banner.self_query"
                              />
                        </a-col>
                        <a-col :xs="24" :md="12" :xl="6">
                              <a-statistic
                                    :title="$t('common.bash.self.audit')"
                                    :value="banner.self_audit"
                              />
                        </a-col>
                  </a-row>
            </a-card>
            <br />
            <a-row :gutter="24">
                  <a-col :xs="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
                        <a-card title="公告" style="height: 560px;width: 100%;">
                              <div v-html="boardContent"></div>
                        </a-card>
                  </a-col>
                  <a-col :xs="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">
                        <a-card title="数据源top10">
                              <MiniBar container-id="thend" color="#Ff9900"></MiniBar>
                        </a-card>
                  </a-col>
            </a-row>
      </div>
</template>

<script setup lang="ts">
import ChartCard from "@/components/chartCard/chartCard.vue"
import MiniArea from "@/components/chartCard/miniArea.vue";
import MiniCol from "@/components/chartCard/miniCol.vue";
import MiniBar from "@/components/chartCard/miniBar.vue";
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { Request } from "@/apis/dash";
import { Request as Board } from "@/apis/board"
import { onMounted, ref } from "vue";
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";


const loading = false

const request = new Request

const board = new Board

const banner = ref<any>([])

const boardContent = ref<string>("")


onMounted(() => {
      request.Banner().then((res: AxiosResponse<Res<any>>) => banner.value = res.data.payload)
      board.Get().then((res: AxiosResponse<Res<string>>) => boardContent.value = res.data.payload)
})

</script>

<style>
.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
      color: aliceblue;
}
</style>