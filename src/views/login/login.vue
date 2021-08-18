<template>
      <div class="login_container">
            <div class="hero">
                  <a-row type="flex" justify="space-around" align="bottom">
                        <a-col :span="14" offset="4">
                              <img src="../../assets/login/logo.png" style="width:350px" />
                              <p>{{ subject }}</p>
                              <a-button type="dashed" ghost @click="openSponsor">赞助</a-button>
                        </a-col>
                        <a-col :span="5">
                              <login-form></login-form>
                        </a-col>
                  </a-row>
            </div>
            <div class="footer">
                  <a-row>
                        <a-col :span="24">
                              <div style="text-align: center;">
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
                                                href="https://www.gnu.org/licenses/agpl-3.0.en.html"
                                                target="_blank"
                                                style="color: #FFFFFF"
                                          >AGPL3.0</a-typography-link>
                                    </a-space>
                              </div>
                        </a-col>
                  </a-row>
                  <a-row type="flex" justify="center" align="middle">
                        <a-col :span="24">
                              <div style="text-align: center;">{{ copyright }}</div>
                        </a-col>
                  </a-row>
            </div>

            <sponsor ref="sponsor"></sponsor>
      </div>
</template>


<script lang="ts" setup>
import LoginForm from "@/views/login/login-form.vue";
import Sponsor from "@/views/common/sponsor.vue";
import moment from "moment"
import { ref } from "@vue/reactivity";

const imgUrl = `url(${new URL('../../assets/login/backgroud.jpg', import.meta.url)})`

const subject = ` Dream what you want to dream; go where you want to go; be what you want to be,
                  because you have only one life and one chance to do all the things you want to do.`

const copyright = `© 2019-${moment().format("YYYY")} HenryYee 请使用最新版Chrome浏览器获得最佳体验`

const sponsor = ref()

const openSponsor = () => {
      sponsor.value.open()
}

</script>

<style scoped>
.login_container {
      background-size: 100%;
      background-image: v-bind(imgUrl);
      width: 100%;
      position: absolute;
      height: 100%;
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
      width: 100%;
      height: 40px; /*脚部的高度*/
      clear: both;
      margin-left: 6rem;
      z-index: 999;
      color: white;
}
</style>