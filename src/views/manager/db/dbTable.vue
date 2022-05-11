<template>
      <a-card>
            <DBTableSearch @search="search"></DBTableSearch>
            <c-table :tblRef="tblRef" ref="tbl">
                  <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'action'">
                              <a-space size="small">
                                    <a-button type="primary" size="small" ghost @click="fillInfo(record)">详情</a-button>
                                    <a-popconfirm title="确认要删除该数据源吗?"
                                          @confirm="request.Delete(record.source_id).then(() => tbl.manual())">
                                          <a-button type="primary" size="small" danger ghost>删除</a-button>
                                    </a-popconfirm>
                              </a-space>
                        </template>
                        <template v-if="column.dataIndex === 'is_query'">
                              <a-tag color="#43A687" v-if="text === 2">读写</a-tag>
                              <a-tag color="#EA495F" v-if="text === 1">读</a-tag>
                              <a-tag color="#B38D57" v-if="text === 0">写</a-tag>
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
import { ref, reactive, onMounted } from "vue";
import { EventBus } from "@/lib";
import { tableRef } from "@/components/table";
import { Request } from "@/apis/db";

const request = new Request

const tblRef = reactive<tableRef>({
      col: [
            { title: "名称", dataIndex: "source" },
            { title: "环境", dataIndex: "idc" },
            { title: "ip", dataIndex: "ip" },
            { title: "类型", dataIndex: "is_query" },
            { title: "操作", dataIndex: "action" }
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