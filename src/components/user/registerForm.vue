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
            <a-form-item label="角色:" name="rule" has-feedback>
                  <a-select v-model:value="registerForm.rule">
                        <a-select-option value="admin">审核用户</a-select-option>
                        <a-select-option value="guest">普通用户</a-select-option>
                  </a-select>
            </a-form-item>
            <a-form-item label="部门:" name="department" has-feedback>
                  <a-input v-model:value="registerForm.department"></a-input>
            </a-form-item>
            <a-form-item label="邮箱:" name="email" has-feedback>
                  <a-input v-model:value="registerForm.email"></a-input>
            </a-form-item>
            <a-form-item label="操作">
                  <a-button type="primary" @click="registered">注册</a-button>
            </a-form-item>
      </a-form>
</template>

<script lang="ts" setup>
import CommonMixins from "@/mixins/common"
import { reactive, UnwrapRef, ref, withDefaults, } from "vue";
import { RegisterForm, RegisterApi } from "@/apis/user";
import { RuleObject } from 'ant-design-vue/es/form/interface';
import { EventBus } from "@/lib";

interface propsAttr {
      isManager: boolean
}

const props = withDefaults(defineProps<propsAttr>(), {
      isManager: false
})

const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
};

const registerForm: UnwrapRef<RegisterForm> = reactive({
      username: '',
      password: '',
      confirm_password: '',
      email: '',
      real_name: '',
      department: '',
      rule: ''
})

const { regExpPassword } = CommonMixins()

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
      rule: [{ trigger: 'change', message: "请选择角色", required: true }],
      email: [{ type: 'email', message: "请输入正确的邮件格式", trigger: 'blur', required: true }],

}

const formRef = ref();

const registered = (): boolean => formRef.value.validate().then(() => {
      RegisterApi(registerForm, props.isManager).then(() => {
            resetFields()
            EventBus.emit("closeState")
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