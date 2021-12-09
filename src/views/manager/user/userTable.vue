<template>
      <UserTableSearch @search="search"></UserTableSearch>
      <a-table :columns="col" :dataSource="tData" :pagination="false" rowKey="username">
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'action'">
                        <a-space size="small">
                              <a-button
                                    size="small"
                                    ghost
                                    v-if="!is_edit"
                                    @click="() => is_edit = true"
                              >编辑</a-button>
                              <template v-else>
                                    <a-button size="small" ghost @click="editUserInfo(record)">保存</a-button>
                                    <a-button size="small" ghost @click="() => is_edit = false">取消</a-button>
                              </template>
                              <a-button
                                    size="small"
                                    ghost
                                    @click="openPasswordModal(record.username)"
                              >更改密码</a-button>
                              <a-button
                                    type="primary"
                                    size="small"
                                    ghost
                                    @click="openRuleModal(record.username)"
                              >权限</a-button>
                              <a-popconfirm
                                    title="确认要删除该用户吗?"
                                    @confirm="deleteUser(record.username)"
                              >
                                    <a-button
                                          type="primary"
                                          danger
                                          ghost
                                          size="small"
                                          v-if="record.username !== 'admin'"
                                    >删除用户</a-button>
                              </a-popconfirm>
                        </a-space>
                  </template>
                  <template v-if="['real_name', 'department', 'email'].includes(column.dataIndex)">
                        <span v-if="!is_edit">{{ text }}</span>
                        <a-input v-model:value="record[column.dataIndex]" v-else></a-input>
                  </template>
                  <template v-if="column.dataIndex === 'rule'">
                        <span v-if="!is_edit">{{ coverRule[text] }}</span>
                        <a-select
                              v-model:value="record[column.dataIndex]"
                              v-if="is_edit && text !== 'super'"
                        >
                              <a-select-option value="admin">审核用户</a-select-option>
                              <a-select-option value="guest">普通用户</a-select-option>
                        </a-select>
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
      <ChangePassword ref="p" isManager :user="u"></ChangePassword>
      <UserRules ref="r" isManager></UserRules>
</template>

<script lang="ts" setup>
import UserTableSearch from "./userTableSearch.vue";
import UserRules from "@/components/user/userRules.vue";
import { ref, onMounted, reactive } from "vue";
import { DeleteUserApi, FetchUserListApis, UserExpr, UserParams, UserResp, UserTableData } from "@/apis/user"
import CommonMixins from "@/mixins/common"
import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { EventBus } from "@/lib";
import ChangePassword from "@/components/user/changePassword.vue";
import { RegisterForm, EditInfoApi } from "@/apis/user";

const col = [
      {
            title: '用户名',
            dataIndex: 'username',
      },
      {
            title: '姓名',
            dataIndex: 'real_name',
      },
      {
            title: '部门',
            dataIndex: 'department',
      },
      {
            title: '角色',
            dataIndex: 'rule',
      },
      {
            title: '邮箱',
            dataIndex: 'email',
      },
      {
            title: '操作',
            dataIndex: 'action',
      },
]

const p = ref()

const r = ref()

const u = ref("")

const coverRule = {
      admin: "审核用户",
      guest: "普通用户",
      super: "超级管理员"
}

const openPasswordModal = (user: string) => {
      p.value.turnState()
      u.value = user
}

const openRuleModal = (user: string) => {
      r.value.lazy(user)
      r.value.turnState()
}

let tData = ref([] as UserTableData[])

let expr = reactive<UserParams>({
      page: 1,
      find: {
            dept: "",
            username: "",
            rule: "all"
      } as UserExpr
})
const { pagination } = CommonMixins()

const is_edit = ref(false)

const deleteUser = (user: string) => {
      DeleteUserApi(user).then(() => currentPage())
}

const search = (vl: UserExpr) => {
      expr.find = vl
      currentPage()
}

const editUserInfo = (vl: RegisterForm) => {
      EditInfoApi(vl).then(() => {
            currentPage()
            is_edit.value = false
      })
}

const currentPage = () => {
      FetchUserListApis(expr).then((res: AxiosResponse<Res<UserResp>>) => {
            tData.value = res.data.payload.data
            pagination.pageCount = res.data.payload.page
      })
}

onMounted(() => {
      currentPage()
      EventBus.on('closeState', () => {
            currentPage()
      })
})

</script>

<style scoped>
</style>