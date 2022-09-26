<template>
  <div>
    <div style="margin-left: 2%">
      <a-space>
        <span class="fff">version 3.1.1</span>
        <a-button
          v-if="is_register"
          type="dashed"
          ghost
          size="small"
          @click="is_open = true"
        >
          {{ $t('user.form.title') }}
        </a-button>
      </a-space>
    </div>
    <video id="v1" autoplay loop muted>
      <source src="../../assets/login/1.mp4" type="video/mp4" />
    </video>

    <div class="login_container">
      <login-form></login-form>
    </div>

    <div class="footer">
      <a-row>
        <a-col :span="24">
          <div style="text-align: center">
            <a-space size="large">
              <a-typography-link
                href="https://yearning.io"
                target="_blank"
                style="color: #ffffff"
                >{{ $t('common.about') }}</a-typography-link
              >
              <a-tooltip>
                <template #title>{{ $t('common.qq') }}</template>
                {{ $t('common.community') }}
              </a-tooltip>
              <a-typography-link style="color: #ffffff" @click="openSponsor">
                {{ $t('common.sponsor') }}
              </a-typography-link>
              <a-typography-link
                style="color: #ffffff"
                @click="announce.open()"
              >
                {{ $t('common.statement') }}
              </a-typography-link>
              <a-typography-link
                href="https://www.gnu.org/licenses/agpl-3.0.en.html"
                target="_blank"
                style="color: #ffffff"
                >AGPL3.0</a-typography-link
              >
              <div style="text-align: center">{{ Copyright }}</div>
            </a-space>
          </div>
        </a-col>
      </a-row>
    </div>

    <Sponsor ref="sponsor"></Sponsor>

    <Announce ref="announce"></Announce>

    <a-modal v-model:visible="is_open" :title="$t('user.form.title')">
      <template #footer></template>
      <Register ref="register"></Register>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from '@/views/login/login-form.vue';
  import Sponsor from '@/views/common/sponsor.vue';
  import { ref, onMounted } from 'vue';
  import { Copyright } from '@/config/vars';
  import CommonMixin from '@/mixins/common';
  import Register from '@/components/user/registerForm.vue';
  import Announce from '../common/announce.vue';
  import { EventBus } from '@/lib';
  import { systemRegisterState } from '@/apis/loginApi';

  const is_register = ref(false);

  const sponsor = ref();

  const announce = ref();

  const register = ref();

  const { is_open } = CommonMixin();

  const openSponsor = () => {
    sponsor.value.open();
  };

  onMounted(async () => {
    const { data } = await systemRegisterState();
    is_register.value = data.payload.reg;

    EventBus.on('closeState', () => {
      is_open.value = false;
    });
  });
</script>

<style scoped>
  .ant-btn.ant-btn-background-ghost {
    color: #fff;
    border-color: #fff;
  }

  .login_container {
    position: absolute;
    margin-top: 10%;
    margin-left: 40%;
  }

  .hero {
    display: flex;
    z-index: 0;
    margin-top: 17%;
    gap: 1rem;
    color: aliceblue;
    font-size: 20px;
  }

  .footer {
    position: absolute;
    bottom: 6px;
    height: 40px;
    /*脚部的高度*/
    clear: both;
    margin-left: 2%;
    z-index: 999;
    color: white;
  }

  video {
    position: fixed;
    right: 0px;
    bottom: 0px;
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;

    z-index: -11;
  }

  source {
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
  }
</style>
