<template>
      <div>
            <div style="margin-left: 2%;">
                  <a-space>
                        <span>version 3.0.0</span>
                        <a-button
                              type="dashed"
                              v-if="is_register"
                              @click="is_open = true"
                              ghost
                              size="small"
                        >用户注册</a-button>
                  </a-space>
            </div>
            <video id="v1" autoplay loop muted>
                  <source src="../../assets/login/mountain.mp4" type="video/mp4" />
            </video>
            <div class="login_container">
                  <login-form></login-form>
                  <a-row>
                        <a-col :span="8"></a-col>
                        <a-col :span="4"></a-col>
                  </a-row>
            </div>

            <div class="footer">
                  <a-row>
                        <a-col :span="24">
                              <div style="text-align: center">
                                    <a-space size="large">
                                          <a-typography-link
                                                href="https://yearning.io"
                                                target="_blank"
                                                style="color: #FFFFFF"
                                          >关于Yearning</a-typography-link>
                                          <a-tooltip>
                                                <template #title>Q群: 363323798</template>
                                                社区
                                          </a-tooltip>
                                          <a-typography-link
                                                @click="openSponsor"
                                                style="color: #FFFFFF"
                                          >赞助</a-typography-link>
                                          <a-typography-link
                                                href="https://www.gnu.org/licenses/agpl-3.0.en.html"
                                                target="_blank"
                                                style="color: #FFFFFF"
                                          >AGPL3.0</a-typography-link>
                                          <div style="text-align: center;">{{ Copyright }}</div>
                                    </a-space>
                              </div>
                        </a-col>
                  </a-row>
            </div>

            <Sponsor ref="sponsor"></Sponsor>

            <a-modal v-model:visible="is_open" title="用户注册">
                  <template #footer></template>
                  <register ref="register" @closeState="() => is_open = false"></register>
            </a-modal>
      </div>
</template>


<script lang="ts" setup>
import LoginForm from "@/views/login/login-form.vue";
import Sponsor from "@/views/common/sponsor.vue";
import { ref } from "@vue/reactivity";
import { Copyright } from "@/config/vars";
import { onMounted } from "vue";
import { IsRegister } from "@/apis/loginApi";
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";
import CommonMixin from "@/mixins/common";
import Register from "@/components/user/registerForm.vue";
// const subject = ` Dream what you want to dream; go where you want to go; be what you want to be,
//                   because you have only one life and one chance to do all the things you want to do.`

const is_register = ref(false)

const sponsor = ref()

const register = ref()

const { is_open } = CommonMixin()

const openSponsor = () => {
      sponsor.value.open()
}

const resetForm = () => {
      register.value.resetFields()
}

const signUp = () => {
      register.value.registered()
}

onMounted(() => {
      IsRegister().then((res: AxiosResponse<Res<any>>) => {

            is_register.value = res.data.payload.reg
      })
})

</script>

<style scoped>
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
      height: 40px; /*脚部的高度*/
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