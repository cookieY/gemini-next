<template>
      <img src="../../assets/login/logo.png" width="350" />
      <br />
      <a-form :model="loginForm" class="login-title">
            <a-form-item>
                  <a-input
                        v-model:value="loginForm.username"
                        placeholder="用户名:"
                        style=" border-radius: 10px;"
                  />
            </a-form-item>
            <a-form-item>
                  <a-input
                        v-model:value="loginForm.password"
                        type="password"
                        placeholder="密码"
                        style="border-radius: 10px;"
                        @pressEnter="() => signIn()"
                  />
            </a-form-item>
            <a-form-item>
                  <a-space :size="50">
                        <a-checkbox v-model:checked="loginForm.is_ldap">
                              <span>AD域登录</span>
                        </a-checkbox>
                  </a-space>
            </a-form-item>
            <a-button type="dashed" block @click="signIn" ghost>登录</a-button>
      </a-form>
</template>

<script setup lang="ts">
import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { UnwrapRef, reactive, ref, onMounted } from "vue";
import { LoginApi, LoginFrom } from "@/apis/loginApi";
import { LoginRespPayload } from "@/types"
import router from "@/router";
import { useStore } from "@/store";

const loginForm: UnwrapRef<LoginFrom> = reactive({
      username: "",
      password: "",
      is_ldap: false
})

const store = useStore()

const signIn = async () => {
      await LoginApi(loginForm).then((res: AxiosResponse<Res<LoginRespPayload>>) => {
            if (res.data.code === 1301) {
                  return
            }
            store.commit("user/USER_STORE", res.data.payload)
            store.commit("menu/CHANGE_SELECTED", ["/home"])
            router.replace("/home")
      })
}
</script>

<style scoped>
.login-title span {
      color: #ffffff;
}
</style>
