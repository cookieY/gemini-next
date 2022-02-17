<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <QuerySearch @search="(exp) => { expr.find = exp; currentPage() }"></QuerySearch>
      <a-table :columns="col" :dataSource="tData" :pagination="false" bordered>
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'action'">
                        <a-space>
                              <template v-if="record.status === 2">
                                    <a-popconfirm
                                          :title="$t('order.query.audit.end.tips')"
                                          @confirm="() => request.Stop(record.work_id).then(() => currentPage())"
                                    >
                                          <a-button size="small" danger>{{ $t('order.end') }}</a-button>
                                    </a-popconfirm>
                              </template>

                              <a-button
                                    size="small"
                                    type="primary"
                                    @click="() => $router.push({ path: '/server/order/profile', query: { order: JSON.stringify(record) } })"
                              >{{ $t('common.profile') }}</a-button>
                        </a-space>
                  </template>
                  <template v-if="column.dataIndex === 'status'">
                        <a-tag :color="StateQueryUsege(text).color">
                              <template #icon>
                                    <component
                                          :is="StateQueryUsege(text).icon"
                                          :spin="StateQueryUsege(text).color === '#408B9B'"
                                    />
                              </template>
                              {{ StateQueryUsege(text).title }}
                        </a-tag>
                  </template>
                  <template v-if="column.dataIndex === 'export'">
                        <span>{{ text === 0 ? $t('common.no') : $t('common.yes') }}</span>
                  </template>
            </template>
      </a-table>
      <br />
      <a-pagination
            :total="pagination.pageCount"
            :page-size.sync="pagination.pageSize"
            :show-total="(total) => $t('common.count', { 'count': total })"
            @change="changePage"
      />
</template>
<script lang="ts"  setup>
import { QueryExpr, QueryParams, Request } from "@/apis/query";
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import { StateQueryUsege } from "@/lib"
import CommonMixins from "@/mixins/common"
import QuerySearch from "./querySearch.vue";
import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { onMounted, reactive, ref } from "vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const request = new Request

let tData = ref<any[]>([])

const col = [
      {
            title: t('order.query.table.work_id'),
            dataIndex: "work_id"
      },
      {
            title: t('order.query.table.username'),
            dataIndex: "username"
      },
      {
            title: t('order.query.table.real_name'),
            dataIndex: "real_name"
      },
      {
            title: t('order.query.table.time'),
            dataIndex: "date"
      },
      {
            title: t('order.query.table.export'),
            dataIndex: "export"
      },
      {
            title: t('order.query.table.status'),
            dataIndex: "status"
      },
      {
            title: t('common.action'),
            dataIndex: "action"
      },
]

const title = {
      title: t('order.query.title'),
      subTitle: t('order.query.desc')
}

const { pagination } = CommonMixins()

let expr = reactive<QueryParams>({
      page: 1,
      find: {
            work_id: "",
            username: "",
            status: 7
      } as QueryExpr
})

const changePage = (page: number) => {
      expr.page = page
      currentPage()
}


const currentPage = () => {
      request.List(expr).then((res: AxiosResponse<Res<any>>) => {
            tData.value = res.data.payload.data
            pagination.pageCount = res.data.payload.page
      })
}

onMounted(() => {
      currentPage()
})

</script>