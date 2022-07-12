<template>
      <a-card>
            <DBTableSearch @search="search"></DBTableSearch>
            <c-table :tblRef="tblRef" ref="tbl">
                  <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'action'">
                              <a-space size="small">
                                    <a-button type="primary" size="small" ghost @click="fillInfo(record)">
                                          {{ $t('common.profile') }}</a-button>
                                    <a-popconfirm :title="$t('db.delete.tips')"
                                          @confirm="request.Delete(record.source_id).then(() => tbl.manual())">
                                          <a-button type="primary" size="small" danger ghost>{{ $t('common.delete') }}
                                          </a-button>
                                    </a-popconfirm>
                              </a-space>
                        </template>
                        <template v-if="column.dataIndex === 'is_query'">
                              <a-tag color="#43A687" v-if="text === 2">{{ $t('db.rw') }}</a-tag>
                              <a-tag color="#EA495F" v-if="text === 1">{{ $t('db.r') }}</a-tag>
                              <a-tag color="#B38D57" v-if="text === 0">{{ $t('db.w') }}</a-tag>
                        </template>
                  </template>
            </c-table>
      </a-card>

      <DBModal ref="modal" :idc="idc"></DBModal>
</template>

<script lang="ts" setup>
import { DBExpr, Source, DBResp, DBParams } from "@/apis/db";
import { Res } from "@/config/request";
import DBModal from "./dbModal.vue";
import DBTableSearch from "./dbTableSearch.vue";
import { AxiosResponse } from "axios";
import { ref, reactive, onMounted, toRaw, markRaw } from "vue";
import { EventBus } from "@/lib";
import { tableRef } from "@/components/table";
import { Request } from "@/apis/db";
import i18n from "@/lang";
import { useI18n } from "vue-i18n";

const request = new Request

const { t } = useI18n()

const tblRef = reactive<tableRef>({
      col: [
            { title: t('common.table.name'), dataIndex: "source" },
            { title: t('common.table.env'), dataIndex: "idc" },
            { title: "IP", dataIndex: "ip" },
            { title: t('common.table.type'), dataIndex: "is_query" },
            { title: t('common.action'), dataIndex: "action" }
      ],
      data: [] as Source[],
      pageCount: 1,
      expr: {
            source: "",
            ip: "",
            idc: "",
            is_query: -1
      } as DBExpr,
      fn: (expr: DBParams) => {
            request.List(expr).then((res: AxiosResponse<Res<DBResp>>) => {
                  tblRef.data = res.data.payload.data;
                  tblRef.pageCount = res.data.payload.page;
            });
      }
})

const modal = ref()

const tbl = ref()

const idc = ref([] as string[])

const search = (vl: DBExpr) => {
      tblRef.expr = vl
      tbl.value.manual()
}

const fillInfo = (vl: Source) => {
      modal.value.fillInfo(vl)
}

onMounted(() => {
      EventBus.on('postOk', () => {
            tbl.value.manual()
      })
})

</script>