<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <QuerySearch @search="(exp) => { tblRef.expr = exp; tbl.manual() }"></QuerySearch>
      <c-table :tblRef="tblRef" ref="tbl">
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'action'">
                        <a-space>
                              <template v-if="record.status === 2">
                                    <a-popconfirm
                                          :title="$t('order.query.audit.end.tips')"
                                          @confirm="() => request.Stop(record.work_id).then(() => tbl.manual())"
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
      </c-table>
</template>
<script lang="ts"  setup>
import { QueryExpr, QueryParams, Request } from "@/apis/query";
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import { StateQueryUsege } from "@/lib"
import QuerySearch from "./querySearch.vue";
import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { reactive, ref } from "vue";
import { useI18n } from 'vue-i18n';
import { tableRef } from "@/components/table";

const { t } = useI18n()

const tbl = ref()

const tblRef = reactive<tableRef>({
      col: [
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
      ],
      data: [] as any[],
      pageCount: 0,
      defaultPageSize: 20,
      expr: {
            work_id: "",
            username: "",
            status: 7
      } as QueryExpr,
      fn: (expr: QueryParams) => {
            request.List(expr).then((res: AxiosResponse<Res<any>>) => {
                  tblRef.data = res.data.payload.data
                  tblRef.pageCount = res.data.payload.page
            })
      }

})

const request = new Request

const title = {
      title: t('order.query.title'),
      subTitle: t('order.query.desc')
}

</script>