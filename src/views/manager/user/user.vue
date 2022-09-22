<template>
  <PageHeader :title="title.title" :sub-title="title.subTitle"></PageHeader>
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :sm="6">
      <a-card :title="$t('user.form.title')">
        <RegisterForm is-manager></RegisterForm>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="18">
      <UserTable></UserTable>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import PageHeader from '@/components/pageHeader/pageHeader.vue';
  import RegisterForm from '@/components/user/registerForm.vue';
  import UserTable from '@/views/manager/user/userTable.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const title = {
    title: t('user.title'),
    subTitle: t('user.desc'),
  };
</script>

<style scoped></style>
