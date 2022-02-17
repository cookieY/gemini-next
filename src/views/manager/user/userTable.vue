<template>
      <UserTableSearch @search="search"></UserTableSearch>
      <a-table :columns="col" :dataSource="tData" :pagination="false" rowKey="username" bordered>
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'action'">
                        <a-space size="small">
                              <a-button
                                    size="small"
                                    ghost
                                    v-if="!is_edit"
                                    @click="() => is_edit = true"
                              >{{ $t('common.edit') }}</a-button>
                              <template v-else>
                                    <a-button
                                          size="small"
                                          ghost
                                          @click="editUserInfo(record)"
                                    >{{ $t('common.save') }}</a-button>
                                    <a-button
                                          size="small"
                                          ghost
                                          @click="() => is_edit = false"
                                    >{{ $t('common.cancel') }}</a-button>
                              </template>
                              <a-button
                                    size="small"
                                    ghost
                                    @click="openPasswordModal(record.username)"
                              >{{ $t('common.password') }}</a-button>
                              <a-button
                                    type="primary"
                                    size="small"
                                    ghost
                                    @click="openRuleModal(record.username)"
                              >{{ $t('common.policy') }}</a-button>
                              <a-popconfirm
                                    :title="$t('user.form.delete.tips')"
                                    @confirm="deleteUser(record.username)"
                              >
                                    <a-button
                                          type="primary"
                                          danger
                                          ghost
                                          size="small"
                                          v-if="record.username !== 'admin'"
                                    >{{ $t('common.delete') }}</a-button>
                              </a-popconfirm>
                        </a-space>
                  </template>
                  <template v-if="['real_name', 'department', 'email'].includes(column.dataIndex)">
                        <span v-if="!is_edit">{{ text }}</span>
                        <a-input v-model:value="record[column.dataIndex]" v-else></a-input>
                  </template>
            </template>
      </a-table>
      <br />
      <a-pagination
            :total="pagination.pageCount"
            :page-size.sync="pagination.pageSize"
            :show-total="(total) => $t('common.count', { 'count': total })"
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n()


const col = [
      {
            title: t('user.form.user'),
            dataIndex: 'username',
      },
      {
            title: t('user.form.real_name'),
            dataIndex: 'real_name',
      },
      {
            title: t('user.form.dept'),
            dataIndex: 'department',
      },
      {
            title: t('user.form.email'),
            dataIndex: 'email',
      },
      {
            title: t('common.action'),
            dataIndex: 'action',
      },
]

const p = ref()

const r = ref()

const u = ref("")

const coverRule = {
      admin: t('user.role.auditor'),
      guest: t('user.role.guest'),
      super: t('common.super')
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
      pagination.pageSize = 10
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