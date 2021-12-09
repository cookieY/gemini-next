<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <a-row>
            <a-col :xs="24" :sm="6">
                  <a-divider orientation="left">用户注册</a-divider>
                  <RegisterForm isManager></RegisterForm>
            </a-col>
            <a-col :xs="24" :sm="17" :offset="1">
                  <UserTable></UserTable>
            </a-col>
      </a-row>
</template>

<script lang="ts" setup>
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import RegisterForm from "@/components/user/registerForm.vue";
import UserTable from "@/views/manager/user/userTable.vue"

const title = {
      title: "用户",
      subTitle: "用户管理页面"
}

</script>

<style scoped>
</style>