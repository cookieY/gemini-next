<template>
    <a-table :columns="col" :dataSource="tData" :pagination="false" rowKey="username"></a-table>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {Register} from "@/types";

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
let tData = ref([] as Register[])
</script>

<style scoped>

</style>