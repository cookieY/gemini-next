<template>
      <img src="../../assets/login/logo.png" width="350" />
      <br />
      <a-form :model="loginForm">
            <a-form-item>
                  <a-input v-model:value="loginForm.username" :placeholder="$t('user.username')"
                        style=" border-radius: 10px;" />
            </a-form-item>
            <a-form-item>
                  <a-input v-model:value="loginForm.password" :placeholder="$t('user.password')"
                        style="border-radius: 10px;" @pressEnter="() => signIn()" type="password" />
            </a-form-item>
            <a-form-item>
                  <a-space :size="50">
                        <a-checkbox v-model:checked="loginForm.is_ldap">
                              <span class="fff">LDAP</span>
                        </a-checkbox>
                  </a-space>
            </a-form-item>
            <a-button type="dashed" block @click="signIn" ghost>{{ $t('common.signin') }}</a-button>
            <a-button v-if="oidcEnabled" type="dashed" block @click="oidcSignIn" ghost style="margin-top: 10px">OIDC {{
                        $t('common.signin')
            }}
            </a-button>
      </a-form>
</template>

<script setup lang="ts">

import { Res } from "@/config/request";
import { AxiosResponse } from "axios";
import { UnwrapRef, reactive, ref, onMounted, computed } from "vue";
import { LoginApi, OidcStateApi, LoginFrom } from "@/apis/loginApi";
import { LoginRespPayload } from "@/types"
import router from "@/router";
import { useStore } from "@/store";
import { useRoute } from 'vue-router'
import { debounce } from "lodash-es"

const loginForm: UnwrapRef<LoginFrom> = reactive({
      username: "",
      password: "",
      is_ldap: false,
      is_oidc: false
})

const store = useStore()
const route = useRoute()

const oidcEnabled = ref(false)
const oidcSignInUrl = ref("")

const query = computed(() => route.query).value

onMounted(() => {
      if (query.oidcLogin) {
            const { oidcLogin, ...rest } = query
            store.commit("user/USER_STORE", rest)
            store.commit("menu/CHANGE_SELECTED", ["/home"])
            router.replace("/home")
      }

      OidcStateApi().then((res: any) => {
            if (res.data.code == 1200 && res.data.payload.enabled && res.data.payload.authUrl) {
                  oidcEnabled.value = true
                  oidcSignInUrl.value = res.data.payload.authUrl
            }
      })
})

const oidcSignIn = () => {
      window.location.href = oidcSignInUrl.value
}

const signIn = debounce(() => {
      LoginApi(loginForm).then((res: AxiosResponse<Res<LoginRespPayload>>) => {
            if (res.data.code === 1301) {
                  return
            }
            store.commit("user/USER_STORE", res.data.payload)
            store.commit("menu/CHANGE_SELECTED", ["/home"])
            router.replace("/home")
      })
}, 200)
</script>

<style lang="less" scoped>
.ant-input {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-variant: tabular-nums;
      list-style: none;
      font-feature-settings: 'tnum';
      position: relative;
      display: inline-block;
      width: 100%;
      min-width: 0;
      padding: 4px 11px;
      color: rgba(255, 255, 255, 0.85);
      font-size: 14px;
      line-height: 1.5715;
      background-color: rgba(255, 255, 255, 0);
      background-image: none;
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 2px;
      transition: all 0.3s;
}


.ant-btn.ant-btn-background-ghost {
      color: rgba(255, 255, 255, 0.85);
      border-color: rgba(255, 255, 255, 0.25);
}
</style>

