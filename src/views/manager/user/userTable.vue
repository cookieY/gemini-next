<template>
      <UserTableSearch @search="search"></UserTableSearch>
      <c-table :tblRef="tblRef" ref="tbl">
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'action'">
                        <a-space size="small">
                              <a-button
                                    size="small"
                                    ghost
                                    v-if="!record.editable"
                                    @click="() => record.editable = true"
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
                                          @click="() => record.editable = false"
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
                        <span v-if="!record.editable">{{ text }}</span>
                        <a-input v-model:value="record[column.dataIndex]" v-else></a-input>
                  </template>
            </template>
      </c-table>
      <ChangePassword ref="p" isManager :user="u"></ChangePassword>
      <UserRules ref="r" isManager></UserRules>
</template>

<script lang="ts" setup>
import UserTableSearch from "./userTableSearch.vue";
import UserRules from "@/components/user/userRules.vue";
import { ref, onMounted, reactive, h } from "vue";
import { Request, UserExpr, UserResp, UserTableData, RegisterForm } from "@/apis/user"
import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { EventBus } from "@/lib";
import ChangePassword from "@/components/user/changePassword.vue";
import { useI18n } from 'vue-i18n';
import { tableRef } from "@/components/table";

const { t } = useI18n()

const tblRef = reactive<tableRef>({
      col: [
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
      ],
      data: [] as UserTableData[],
      pageCount: 0,
      expr: {
            dept: "",
            username: "",
            email: "",
            real_name: ""
      } as UserExpr,
      fn: (expr) => {
            request.List(expr).then((res: AxiosResponse<Res<UserResp>>) => {
                  tblRef.data = res.data.payload.data;
                  tblRef.pageCount = res.data.payload.page;
            });
      }
})

const p = ref()

const r = ref()

const u = ref("")

const tbl = ref()

const request = new Request

const openPasswordModal = (user: string) => {
      p.value.turnState()
      u.value = user
}

const openRuleModal = (user: string) => {
      r.value.lazy(user)
      r.value.turnState()
}

const is_edit = ref(false)

const deleteUser = (user: string) => {
      request.Delete(user).then(() => tbl.value.manual())
}

const search = (vl: UserExpr) => {
      tblRef.expr = vl
      tbl.value.manual()
}

const editUserInfo = (vl: RegisterForm) => {
      request.Edit(vl, true).then(() => {
            tbl.value.manual()
            is_edit.value = false
      })
}

onMounted(() => {
      EventBus.on('closeState', () => {
            tbl.value.manual()
      })
})

</script>

<style scoped>
</style>