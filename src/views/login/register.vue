<template>
      <a-modal v-model:visible="is_open" title="用户注册" @ok="registered" @cancel="closeRegister">
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
      </a-modal>
</template>

<script lang="ts" setup>
import CommonMixin from "@/mixins/common";
import { reactive, UnwrapRef, ref } from "vue";
import { RegisterForm, RegisterApi } from "./apis";
import { RuleObject } from 'ant-design-vue/es/form/interface';

const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
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
      console.log(value)
      if (!pPattern.test(value)) {
            return Promise.reject('至少1个大写字母，1个小写字母，1个数字')
      } else {
            return Promise.resolve();
      }
}

let validPassword = async (rule: RuleObject, value: string) => {
      if (value !== registerForm.password) {
            return Promise.reject('输入的密码不一致')
      } else {
            return Promise.resolve();
      }
};

const rules = {
      username: [{ trigger: 'blur', message: "请输入用户名", required: true }],
      password: [{ validator: regExpPassword, trigger: 'blur', required: true }],
      confirm_password: [{ required: true, validator: validPassword, trigger: 'blur' }],
      real_name: [{ trigger: 'blur', message: "请输入姓名", required: true }],
      department: [{ trigger: 'blur', message: "请输入部门", required: true }],
      mail: [{ type: 'email', message: "请输入正确的邮件格式", trigger: 'blur', required: true }],

}

const formRef = ref({} as any);

const registered = () => {
      formRef.value.validate().then(() => RegisterApi(registerForm).finally(() => {
            closeRegister()

      }))
}

const { is_open, close, open } = CommonMixin()

const closeRegister = () => {
      formRef.value.resetFields();
      close()
}

defineExpose({
      open
})
</script>