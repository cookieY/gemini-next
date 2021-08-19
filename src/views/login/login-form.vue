<template>
      <a-form :model="loginForm" class="login-title">
            <a-form-item>
                  <a-input
                        v-model:value="loginForm.username"
                        placeholder="请输入用户名:"
                        style=" border-radius: 10px;"
                  />
            </a-form-item>
            <a-form-item>
                  <a-input
                        v-model:value="loginForm.password"
                        type="password"
                        placeholder="请输入密码"
                        style="border-radius: 10px;"
                  />
            </a-form-item>
            <a-form-item>
                  <a-space :size="50">
                        <a-checkbox v-model:checked="loginForm.is_ldap">
                              <span>AD域登录</span>
                        </a-checkbox>
                        <a-button type="text" v-if="is_register" @click="is_open = true">
                              <span>用户注册</span>
                        </a-button>
                  </a-space>
            </a-form-item>
            <a-button type="primary" block @click="signIn">登录</a-button>
      </a-form>

      <a-modal v-model:visible="is_open" title="用户注册" @ok="signUp" @cancel="resetForm">
            <register ref="register" @closeState="() => is_open = false"></register>
      </a-modal>
</template>

<script setup lang="ts">
import { Res, OverrideHeaders } from "@/config/request";
import { AxiosResponse } from "axios";
import { UnwrapRef, reactive, ref, onMounted } from "vue";
import { IsRegister, LoginApi, LoginFrom, LoginRespPayload } from "@/views/login/loginApi";
import Register from "@/components/register/registerForm.vue";
import router from "@/router";
import CommonMixin from "@/mixins/common";

const is_register = ref<boolean>(true)

const { is_open } = CommonMixin()

const register = ref()

const signUp = () => {
      register.value.registered()
}

const resetForm = () => {
      register.value.resetFields()
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