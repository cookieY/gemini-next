<template>
      <a-form :model="loginForm" class="login-title">
            <a-form-item>
                  <a-input
                        v-model:value="loginForm.username"
                        placeholder="请输入用户名:"
                        style="opacity: 0.6; border-radius: 10px;"
                  />
            </a-form-item>
            <a-form-item>
                  <a-input
                        v-model:value="loginForm.password"
                        type="password"
                        placeholder="请输入密码"
                        style="opacity: 0.6;border-radius: 10px;"
                  />
            </a-form-item>
            <a-form-item>
                  <a-checkbox v-model:checked="loginForm.is_ldap">
                        <span>AD域登录</span>
                  </a-checkbox>
            </a-form-item>
            <a-button type="primary" block @click="signIn">登录</a-button>
            <br />
            <br />
            <a-button type="primary" block v-if="is_register" @click="signUp">注册</a-button>
      </a-form>
      <register ref="register"></register>
</template>

<script setup lang="ts">
import { Res, OverrideHeaders } from "@/config/request";
import { AxiosResponse } from "axios";
import { UnwrapRef, reactive, ref, onMounted } from "vue";
import { IsRegister, LoginApi, LoginFrom, LoginRespPayload } from "./apis";
import Register from "@/views/login/register.vue"
import router from "@/router";

let is_register = ref<boolean>(true)

const register = ref()

const signUp = () => {
      register.value.open()
}

const loginForm: UnwrapRef<LoginFrom> = reactive({
      username: "",
      password: "",
      is_ldap: false
})

const signIn = async () => {
      await LoginApi(loginForm).then((res: AxiosResponse<Res<LoginRespPayload>>) => {
            if (res.data.code === 1301) {
                  return
            }
            OverrideHeaders(res.data.payload.token)
            sessionStorage.setItem('real_name', res.data.payload.real_name);
            sessionStorage.setItem('jwt', 'Bearer ' + res.data.payload.token)
            sessionStorage.setItem('user', loginForm.username);
            router.replace("/dash")
      })
}

onMounted(() => {
      IsRegister().then((res: AxiosResponse<Res<boolean>>) => {
            is_register.value = res.data.payload
      })
})


</script>

<style scoped>
.login-title span {
      opacity: 0.6;
      color: #ffffff;
}
</style>