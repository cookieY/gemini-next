<template>
  <img src="../../assets/login/logo.png" width="350" />
  <br />
  <a-form :model="loginForm">
    <a-form-item>
      <a-input
        v-model:value="loginForm.username"
        :placeholder="$t('user.username')"
        style="border-radius: 10px"
      />
    </a-form-item>
    <a-form-item>
      <a-input
        v-model:value="loginForm.password"
        :placeholder="$t('user.password')"
        style="border-radius: 10px"
        type="password"
        @press-enter="() => userSignIn()"
      />
    </a-form-item>
    <a-form-item>
      <a-space :size="50">
        <a-checkbox v-model:checked="loginForm.is_ldap">
          <span class="fff">LDAP</span>
        </a-checkbox>
      </a-space>
    </a-form-item>
    <a-button type="dashed" block ghost @click="userSignIn">{{
      $t('common.signin')
    }}</a-button>
    <a-button
      v-if="oidcEnabled"
      type="dashed"
      block
      ghost
      style="margin-top: 10px"
      @click="oidcSignIn"
      >OIDC {{ $t('common.signin') }}
    </a-button>
  </a-form>
</template>

<script setup lang="ts">
  import { UnwrapRef, reactive, ref, onMounted, computed } from 'vue';
  import { signIn, LoginFrom, getOIDCState } from '@/apis/loginApi';
  import router from '@/router';
  import { useStore } from '@/store';
  import { useRoute } from 'vue-router';
  import { debounce } from 'lodash-es';

  const loginForm: UnwrapRef<LoginFrom> = reactive({
    username: '',
    password: '',
    is_ldap: false,
    is_oidc: false,
  });

  const store = useStore();
  const route = useRoute();

  const oidcEnabled = ref(false);
  const oidcSignInUrl = ref('');

  const query = computed(() => route.query).value;

  onMounted(async () => {
    if (query.oidcLogin) {
      const { oidcLogin, ...rest } = query;
      store.commit('user/USER_STORE', rest);
      store.commit('menu/CHANGE_SELECTED', ['/home']);
      router.replace('/home');
    }
    const { data } = await getOIDCState();
    if (data.code == 1200 && data.payload.enabled && data.payload.authUrl) {
      oidcEnabled.value = true;
      oidcSignInUrl.value = data.payload.authUrl;
    }
  });

  const oidcSignIn = () => {
    window.location.href = oidcSignInUrl.value;
  };

  const userSignIn = debounce(async () => {
    const { data } = await signIn(loginForm);
    if (data.code === 1301) {
      return;
    }
    store.commit('user/USER_STORE', data.payload);
    store.commit('menu/CHANGE_SELECTED', ['/home']);
    router.replace('/home');
  }, 200);
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
