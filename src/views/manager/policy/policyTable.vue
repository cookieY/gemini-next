<template>
      <a-row>
            <a-col :span="24">
                  <a-form layout="inline">
                        <a-form-item>
                              <a-button type="primary" @click="p.newPolicy()">新建权限组</a-button>
                        </a-form-item>
                        <a-form-item>
                              <a-input-search
                                    placeholder="输入权限组名称"
                                    enter-button
                                    @search="onSearch"
                              />
                        </a-form-item>
                  </a-form>
            </a-col>
      </a-row>

      <br />
      <a-table :columns="col" :dataSource="tData" :pagination="false" rowKey="id" bordered>
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'action'">
                        <a-space size="small">
                              <a-button
                                    type="primary"
                                    size="small"
                                    ghost
                                    @click="p.editPolicy(record)"
                              >详情</a-button>
                              <a-popconfirm
                                    title="确认要删除该权限组吗?"
                                    @confirm="request.Drop(record.group_id).then(() => currentPage())"
                              >
                                    <a-button type="primary" size="small" danger ghost>删除</a-button>
                              </a-popconfirm>
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
      <PolicyModal ref="p" :title="title" @success="currentPage"></PolicyModal>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import CommonMixins from "@/mixins/common"
import PolicyModal from "./policyModal.vue"
import { PolicyParams, PolicyExpr, Policy, PolicyResp, Request } from "@/apis/policy"
import { AxiosResponse } from "axios"
import { Res } from "@/config/request"

const { pagination } = CommonMixins()

const tData = ref([] as Policy[])

const col = [
      { title: "权限组名称", dataIndex: "name" },
      { title: "操作", dataIndex: "action" },
]

const p = ref()

const title = ref("新建权限组")

let expr = reactive<PolicyParams>({
      page: 1,
      find: {
            text: ""
      } as PolicyExpr
})

const request = new Request()

const onSearch = (vl: string) => {
      expr.find.text = vl
      currentPage()
}

const currentPage = () => {
      pagination.pageSize = 10
      request.List(expr).then((res: AxiosResponse<Res<PolicyResp>>) => {
            tData.value = res.data.payload.data
            pagination.pageCount = res.data.payload.page
      })
}

onMounted(() => {
      currentPage()
})

</script>