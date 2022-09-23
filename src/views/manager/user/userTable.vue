<template>
  <a-card>
    <UserTableSearch @search="search"></UserTableSearch>
    <c-table ref="tbl" :tbl-ref="tblRef">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space size="small">
            <a-button
              v-if="!record.editable"
              size="small"
              ghost
              @click="() => (record.editable = true)"
              >{{ $t('common.edit') }}</a-button
            >
            <template v-else>
              <a-button size="small" ghost @click="editUserInfo(record)"
                >{{ $t('common.save') }}
              </a-button>
              <a-button
                size="small"
                ghost
                @click="() => (record.editable = false)"
                >{{ $t('common.cancel') }}</a-button
              >
            </template>
            <a-button
              size="small"
              ghost
              @click="openPasswordModal(record.username)"
              >{{ $t('common.password') }}</a-button
            >
            <a-button
              type="primary"
              size="small"
              ghost
              @click="openRuleModal(record.username)"
            >
              {{ $t('common.policy') }}</a-button
            >
            <a-popconfirm
              :title="$t('user.form.delete.tips')"
              @confirm="deleteUser(record.username)"
            >
              <a-button
                v-if="record.username !== 'admin'"
                type="primary"
                danger
                ghost
                size="small"
                >{{ $t('common.delete') }}</a-button
              >
            </a-popconfirm>
          </a-space>
        </template>
        <template
          v-if="
            ['real_name', 'department', 'email', 'is_recorder'].includes(
              column.dataIndex
            )
          "
        >
          <template v-if="!record.editable">
            <span v-if="column.dataIndex === 'is_recorder'">{{
              text === 2 ? $t('common.no') : $t('common.yes')
            }}</span>
            <span v-else>{{ text }}</span>
          </template>
          <template v-else>
            <a-select
              v-if="column.dataIndex === 'is_recorder'"
              v-model:value="record[column.dataIndex]"
            >
              <a-select-option :key="2" :value="2">{{
                $t('common.no')
              }}</a-select-option>
              <a-select-option :key="1" :value="1">{{
                $t('common.yes')
              }}</a-select-option>
            </a-select>
            <a-input v-else v-model:value="record[column.dataIndex]"></a-input>
          </template>
        </template>
      </template>
    </c-table>
  </a-card>

  <ChangePassword
    v-model:visible="isOpen"
    is-manager
    @post="handlePassword"
  ></ChangePassword>
  <UserRules ref="r" is-manager></UserRules>
</template>

<script lang="ts" setup>
  import UserTableSearch from './userTableSearch.vue';
  import UserRules from '@/components/user/userRules.vue';
  import { ref, onMounted, reactive } from 'vue';
  import {
    UserExpr,
    UserTableData,
    RegisterForm,
    Password,
    updatePassword,
    deleteUserAccount,
    getUserList,
    updateUserInfo,
  } from '@/apis/user';
  import { EventBus } from '@/lib';
  import ChangePassword from '@/components/user/changePassword.vue';
  import { useI18n } from 'vue-i18n';
  import { tableRef } from '@/components/table';
  import { CommonPage } from '@/types';

  const { t } = useI18n();

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
        title: t('user.form.recorder'),
        dataIndex: 'is_recorder',
      },
      {
        title: t('common.action'),
        dataIndex: 'action',
      },
    ],
    data: [] as UserTableData[],
    pageCount: 0,
    expr: {
      dept: '',
      username: '',
      email: '',
      real_name: '',
    } as UserExpr,
    fn: async (expr: CommonPage<UserExpr>) => {
      const { data } = await getUserList(expr);
      tblRef.data = data.payload.data;
      tblRef.pageCount = data.payload.page;
    },
  });

  const isOpen = ref(false);

  const r = ref();

  const account = ref('');

  const tbl = ref();

  const openPasswordModal = (user: string) => {
    isOpen.value = !isOpen.value;
    account.value = user;
  };

  const openRuleModal = (user: string) => {
    r.value.lazy(user);
    r.value.turnState();
  };

  const is_edit = ref(false);

  const deleteUser = async (user: string) => {
    await deleteUserAccount(user);
    tbl.value.manual();
  };

  const search = (vl: UserExpr) => {
    tblRef.expr = vl;
    tbl.value.manual();
  };

  const editUserInfo = async (user: RegisterForm) => {
    await updateUserInfo(user, true);
    tbl.value.manual();
    is_edit.value = false;
  };

  const handlePassword = async (formItem: Password) => {
    await updatePassword({
      password: formItem,
      username: account.value,
      isManager: true,
    });
    isOpen.value = false;
  };

  onMounted(() => {
    EventBus.on('closeState', () => {
      tbl.value.manual();
    });
  });
</script>

<style scoped></style>
