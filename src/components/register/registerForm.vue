<template>
      <a-form ref="formRef" :model="registerForm" :rules="rules" v-bind="layout">
            <a-form-item label="用户名:" name="username" has-feedback>
                  <a-input v-model:value="registerForm.username"></a-input>
            </a-form-item>
            <a-form-item label="密码:" name="password" has-feedback>
                  <a-input v-model:value="registerForm.password" type="password"></a-input>
            </a-form-item>
            <a-form-item label="确认密码:" name="confirm_password" has-feedback>
                  <a-input v-model:value="registerForm.confirm_password" type="password"></a-input>
            </a-form-item>
            <a-form-item label="姓名:" name="real_name" has-feedback>
                  <a-input v-model:value="registerForm.real_name"></a-input>
            </a-form-item>
            <a-form-item label="部门:" name="department" has-feedback>
                  <a-input v-model:value="registerForm.department"></a-input>
            </a-form-item>
            <a-form-item label="邮箱:" name="mail" has-feedback>
                  <a-input v-model:value="registerForm.mail"></a-input>
            </a-form-item>
      </a-form>
</template>

<script lang="ts" setup>
import { defineEmits } from "@vue/runtime-core";
import { reactive, UnwrapRef, ref } from "vue";
import { RegisterForm, RegisterApi } from "./apis";
import { RuleObject } from 'ant-design-vue/es/form/interface';

const emit = defineEmits(['closeState'])

const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
};

const registerForm: UnwrapRef<RegisterForm> = reactive({
      username: '',
      password: '',
      confirm_password: '',
      mail: '',
      real_name: '',
      department: ''
})

let regExpPassword = async (rule: RuleObject, value: string) => {
      let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
      if (!pPattern.test(value)) {
            return Promise.reject('至少1个大写字母，1个小写字母，1个数字')
      } else {
            return Promise.resolve();
      }
}

let validPassword = async (rule: RuleObject, value: string) => {
      if (value !== registerForm.password && value !== "") {
            return Promise.reject('输入的密码不一致')
      } else {
            return Promise.resolve();
      }
};

const rules = {
      username: [{ trigger: 'blur', message: "请输入用户名", required: true }],
      password: [{ validator: regExpPassword, trigger: 'blur', required: true }],
      confirm_password: [{ trigger: 'blur', message: "请确认密码", required: true }, { required: true, validator: validPassword, trigger: 'blur' }],
      real_name: [{ trigger: 'blur', message: "请输入姓名", required: true }],
      department: [{ trigger: 'blur', message: "请输入部门", required: true }],
      mail: [{ type: 'email', message: "请输入正确的邮件格式", trigger: 'blur', required: true }],

}

const formRef = ref();

const registered = (): boolean => formRef.value.validate().then(() => {
      RegisterApi(registerForm).then(() => {
            resetFields()
            emit("closeState")
      })
})

const resetFields = () => {
      formRef.value.resetFields();
}

defineExpose({
      registered,
      resetFields
})
</script>