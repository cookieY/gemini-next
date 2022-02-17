<template>
      <a-page-header
            :title="$t('order.profile.work_id', { id: order.work_id })"
            @back="() => $router.go(-1)"
      >
            <template #extra>
                  <template v-if="order.status === 1">
                        <a-button
                              key="2"
                              danger
                              ghost
                              @click="() => query.Reject(order.work_id).then(() => $router.go(-1))"
                        >{{ $t('order.reject') }}</a-button>
                        <a-button
                              key="1"
                              type="primary"
                              @click="() => query.Agree(order.work_id).then(() => $router.go(-1))"
                        >{{ $t('order.agree') }}</a-button>
                  </template>
            </template>
            <a-row type="flex" justify="center" align="middle">
                  <a-col :span="16">
                        <a-descriptions :column="2">
                              <a-descriptions-item
                                    :label="$t('query.profile.username')"
                              >{{ order.username }}</a-descriptions-item>
                              <a-descriptions-item
                                    :label="$t('query.profile.realname')"
                              >{{ order.real_name }}</a-descriptions-item>
                              <a-descriptions-item
                                    :label="$t('query.profile.export')"
                              >{{ order.export === 1 ? $t('common.yes') : $t('common.no') }}</a-descriptions-item>
                              <a-descriptions-item
                                    :label="$t('query.profile.date')"
                              >{{ order.date }}</a-descriptions-item>
                              <a-descriptions-item :label="$t('query.profile.text')">
                                    <pre>{{ order.text }}</pre>
                              </a-descriptions-item>
                              <a-descriptions-item
                                    :label="$t('query.profile.approval')"
                              >{{ order.approval_time }}</a-descriptions-item>
                        </a-descriptions>
                  </a-col>
                  <a-col :span="8">
                        <a-progress
                              :percent="100"
                              :strokeWidth="5"
                              :width="150"
                              :stroke-color="StateQueryUsege(order.status).color"
                              type="circle"
                              style="position: relative"
                        >
                              <template #format="percent">
                                    <span
                                          style="color: rgb(193, 205, 214);"
                                    >{{ StateQueryUsege(order.status).title }}</span>
                              </template>
                        </a-progress>
                  </a-col>
            </a-row>
            <a-tabs>
                  <a-tab-pane key="1" :tab="$t('order.profile.profile')">
                        <a-table
                              bordered
                              :columns="col"
                              :dataSource="tData"
                              size="small"
                              :pagination="false"
                        ></a-table>
                        <br />
                        <a-pagination
                              :total="pagination.pageCount"
                              :page-size.sync="pagination.pageSize"
                              :show-total="(total) => `共 ${total} 条`"
                              v-model:current="page"
                              @change="currentPage"
                        />
                  </a-tab-pane>
            </a-tabs>
      </a-page-header>
</template>

<script lang="ts" setup>
import { Request } from '@/apis/query';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import CommonMixins from '@/mixins/common'
import { AxiosResponse } from 'axios';
import { Res } from '@/config/request';
import { StateQueryUsege } from "@/lib"
import { QueryState } from "@/types"



interface QueryRef {
      work_id: string
      username: string
      date: string
      text: string
      assigned: string
      real_name: string
      export: number
      status: number
      approval_time: string
}

const { t } = useI18n()

const query = new Request

const { pagination } = CommonMixins()

const col = [
      {
            title: 'SQL',
            dataIndex: 'sql'
      },
      {
            title: t('common.table.source'),
            dataIndex: 'source'
      },
      {
            title: t('common.table.schema'),
            dataIndex: 'schema'
      },
      {
            title: t('common.table.time'),
            dataIndex: 'time'
      },
      {
            title: t('common.table.ex_time'),
            dataIndex: 'ex_time'
      }
]

const tData = ref<QueryRef[]>([])

const route = useRoute()

const page = ref(1)

const order = ref<QueryRef>({} as QueryRef)

const currentPage = (page: number) => {
      query.QueryProfile(order.value.work_id, page).then((res: AxiosResponse<Res<any>>) => {
            tData.value = res.data.payload.data
            pagination.pageCount = res.data.payload.page
      })
}

onMounted(() => {
      order.value = JSON.parse(route.query.order as string)
      currentPage(page.value)
})

</script>