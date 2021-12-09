<template>
      <DBTableSearch @search="search"></DBTableSearch>
      <a-table :columns="col" :dataSource="tData" :pagination="false" rowKey="source" bordered>
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'action'">
                        <a-space size="small">
                              <a-button
                                    type="primary"
                                    size="small"
                                    ghost
                                    @click="fillInfo(record)"
                              >详情</a-button>
                              <a-popconfirm title="确认要删除该用户吗?" @confirm="DelDBApis(record.source).then(() => currentPage)">
                                    <a-button type="primary" size="small" danger ghost>删除</a-button>
                              </a-popconfirm>
                        </a-space>
                  </template>
                  <template v-if="column.dataIndex === 'is_query'">
                        <a-tag color="#009485" v-if="text === 2">读写</a-tag>
                        <a-tag color="#f50" v-if="text === 1">读</a-tag>
                        <a-tag color="#108ee9" v-if="text === 0">写</a-tag>
                  </template>
            </template>
      </a-table>
      <br />
      <a-pagination
            :total="pagination.pageCount"
            :page-size.sync="pagination.pageSize"
            :show-total="(total) => `共 ${total} 个工单`"
            v-model:current="expr.page"
            @change="currentPage"
      />
      <DBModal ref="fill" :idc="idc"></DBModal>
</template>

<script lang="ts" setup>
import { DBExpr, DBParams, Source, FetchDBListApis, DBResp, DelDBApis } from "@/apis/db";
import { Res } from "@/config/request";
import DBModal from "./dbModal.vue";
import CommonMixins from "@/mixins/common"
import DBTableSearch from "./dbTableSearch.vue";
import { AxiosResponse } from "axios";
import { ref, reactive, onMounted } from "vue";
import { EventBus } from "@/lib";

const { pagination } = CommonMixins()

const tData = ref([] as Source[])

const col = [
      { title: "名称", dataIndex: "source" },
      { title: "环境", dataIndex: "idc" },
      { title: "ip", dataIndex: "ip" },
      { title: "类型", dataIndex: "is_query" },
      { title: "操作", dataIndex: "action" }
]

const fill = ref()

let expr = reactive<DBParams>({
      page: 1,
      find: {
            source: "",
            ip: "",
            idc: "",
            is_query: -1
      } as DBExpr
})

const idc = ref([] as string[])

const search = (vl: DBExpr) => {
      expr.find = vl
      currentPage()
}

const fillInfo = (vl: Source) => {
      fill.value.fillInfo(vl)
}

const currentPage = () => {
      pagination.pageSize = 10
      FetchDBListApis(expr).then((res: AxiosResponse<Res<DBResp>>) => {
            tData.value = res.data.payload.data
            pagination.pageCount = res.data.payload.page
      })
}

onMounted(() => {
      currentPage()
      EventBus.on('postOk', () => {
            currentPage()
      })
})

</script>