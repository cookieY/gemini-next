<template>
    <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
    <a-row>
        <a-col :xs="8" :sm="6">
            <a-divider orientation="left">用户注册</a-divider>
            <a-form v-bind="layout" :model="register" :rules="rules" ref="formRef">
                <a-form-item label="用户名">
                    <a-input v-model:value="register.username"></a-input>
                </a-form-item>
                <a-form-item label="密码">
                    <a-input v-model:value="register.password"></a-input>
                </a-form-item>
                <a-form-item label="确认密码">
                    <a-input v-model:value="register.confirm"></a-input>
                </a-form-item>
                <a-form-item label="部门">
                    <a-input v-model:value="register.department"></a-input>
                </a-form-item>
                <a-form-item label="邮箱">
                    <a-input v-model:value="register.email"></a-input>
                </a-form-item>
                <a-form-item label="角色">
                    <a-select v-model:value="register.rule">
                        <a-select-option value="admin">审核用户</a-select-option>
                        <a-select-option value="guest">普通用户</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="操作">
                    <a-space>
                        <a-button type="primary" style="text-align: center">
                            注册
                        </a-button>
                    </a-space>

                </a-form-item>
            </a-form>
        </a-col>
        <a-col :xs="15" :sm="17" :offset="1">
            <UserTable></UserTable>
        </a-col>
    </a-row>
</template>

<script lang="ts" setup>
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import UserTable from "@/views/manager/user/userTable.vue"
import CommonMixin from "@/mixins/common";
import {onMounted} from "@vue/runtime-core"

const title = {
    title: "用户",
    subTitle: "用户管理页面"
}

const {register} = CommonMixin()

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};

onMounted(() => {
    console.log(12312312)
})
</script>

<style scoped>

</style>