<template>
      <a-row>
            <a-col :span="24">
                  <a-form layout="inline">
                        <a-form-item>
                              <a-button
                                    type="primary"
                                    @click="() => { title = '新建权限组'; p.newPolicy() }"
                              >新建权限组</a-button>
                        </a-form-item>
                        <a-form-item>
                              <a-input-search
                                    placeholder="输入权限组名称"
                                    enter-button
                                    allowClear
                                    @search="onSearch"
                              />
                        </a-form-item>
                  </a-form>
            </a-col>
      </a-row>

      <br />
      <c-table :tblRef="tblRef" ref="tbl">
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'action'">
                        <a-space size="small">
                              <a-button
                                    type="primary"
                                    size="small"
                                    ghost
                                    @click="() => { title = '编辑权限组'; p.editPolicy(record) }"
                              >详情</a-button>
                              <a-popconfirm
                                    title="确认要删除该权限组吗?"
                                    @confirm="request.Drop(record.group_id).then(() => tbl.manual())"
                              >
                                    <a-button
                                          type="primary"
                                          size="small"
                                          danger
                                          ghost
                                    >{{ $t('common.delete') }}</a-button>
                              </a-popconfirm>
                        </a-space>
                  </template>
            </template>
      </c-table>
      <PolicyModal ref="p" :title="title" @success="tbl.manual()"></PolicyModal>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue"
import PolicyModal from "./policyModal.vue"
import { PolicyParams, PolicyExpr, Policy, PolicyResp, Request } from "@/apis/policy"
import { AxiosResponse } from "axios"
import { Res } from "@/config/request"
import { tableRef } from "@/components/table"

const tblRef = reactive<tableRef>({
      col: [
            { title: "权限组名称", dataIndex: "name" },
            { title: "操作", dataIndex: "action" },
      ],
      data: [] as Policy[],
      pageCount: 0,
      expr: {
            text: ""
      } as PolicyExpr,
      fn: (expr: PolicyParams) => {
            request.List(expr).then((res: AxiosResponse<Res<PolicyResp>>) => {
                  tblRef.data = res.data.payload.data
                  tblRef.pageCount = res.data.payload.page
            })
      }
})

const p = ref()

const tbl = ref()

const title = ref("新建权限组")

const request = new Request()

const onSearch = (vl: string) => {
      tblRef.expr.text = vl
      tbl.value.manual()
}

</script>