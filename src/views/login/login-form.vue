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
import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { UnwrapRef, reactive, ref, onMounted } from "vue";
import { IsRegister, LoginApi, LoginFrom } from "@/apis/loginApi";
import { LoginRespPayload } from "@/types"
import Register from "@/components/user/registerForm.vue";
import router from "@/router";
import CommonMixin from "@/mixins/common";
import { useStore } from "@/store";

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

const store = useStore()

const signIn = async () => {
      await LoginApi(loginForm).then((res: AxiosResponse<Res<LoginRespPayload>>) => {
            if (res.data.code === 1301) {
                  return
            }
            store.commit("user/USER_STORE", res.data.payload)
            router.replace("/home")
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
      color: #ffffff;
}
</style>