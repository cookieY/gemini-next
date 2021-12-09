<template>
      <a-table :columns="col" :dataSource="tData" :pagination="false" rowKey="source">
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'action'">
                        <a-space size="small">
                              <a-button
                                    type="primary"
                                    size="small"
                                    ghost
                                    @click="fillInfo(record)"
                              >详情</a-button>
                              <a-button type="primary" size="small" danger ghost>删除</a-button>
                        </a-space>
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
import { DBExpr, DBParams, Source, FetchDBListApis, DBResp } from "@/apis/db";
import { Res } from "@/config/request";
import DBModal from "./dbModal.vue";
import CommonMixins from "@/mixins/common"
import { AxiosResponse } from "axios";
import { ref, reactive, onMounted } from "vue";

const { pagination } = CommonMixins()

const tData = ref([] as Source[])

const col = [
      { title: "名称", dataIndex: "source" },
      { title: "环境", dataIndex: "idc" },
      { title: "ip", dataIndex: "ip" },
      { title: "操作", dataIndex: "action" }
]

const fill = ref()

let expr = reactive<DBParams>({
      page: 1,
      find: {
            source: "",
            ip: "",
            idc: ""
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
      FetchDBListApis(expr).then((res: AxiosResponse<Res<DBResp>>) => {
            tData.value = res.data.payload.data
      })
}

onMounted(() => {
      currentPage()
})

</script>