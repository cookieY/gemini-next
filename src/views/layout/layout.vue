<template>
      <div v-watermark="{ text: store.state.user.account.user }">

            <a-layout-sider :style="{ overflow: 'auto', minHeight: '100vh', position: 'fixed', left: 0 }">
                  <img :src="logoUrl" style="width: 150px;" />
                  <Menu></Menu>
            </a-layout-sider>

            <a-layout :style="{ marginLeft: '200px' }">
                  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
                        <a-row>
                              <a-col :span="2">
                                    <a-button @click="toggle" type="text">
                                          <template #icon v-if="isFullscreen">
                                                <FullscreenExitOutlined />
                                          </template>
                                          <template #icon v-else>
                                                <FullscreenOutlined />
                                          </template>
                                    </a-button>
                              </a-col>
                              <a-col :span="5" :offset="17">
                                    <a-dropdown>
                                          <div>
                                                <a-avatar :src="profile" />
                                                <span style="margin-left: 5%;font-weight: bold;">{{
                                                            store.state.user.account.user
                                                }}</span>
                                          </div>
                                          <template #overlay>
                                                <a-menu @click="() => router.push({ path: '/home/profile' })">
                                                      <a-menu-item>
                                                            <a href="javascript:;">个人详情</a>
                                                      </a-menu-item>
                                                </a-menu>
                                          </template>
                                    </a-dropdown>
                              </a-col>
                        </a-row>
                  </a-layout-header>
                  <br />
                  <br />
                  <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
                        <router-view v-slot="{ Component }">
                              <component :is="Component" />
                        </router-view>
                  </a-layout-content>
                  <a-layout-footer :style="{ textAlign: 'center', width: '100%' }">{{
                              Copyright
                  }}
                  </a-layout-footer>
            </a-layout>



            <a-drawer placement="right" :closable="false" :visible="is_open" @close="close">
                  <Menu @close="() => is_open = false"></Menu>
            </a-drawer>
      </div>
</template>
<script setup lang="ts">
import { Copyright } from "@/config/vars";
import CommonMixin from "@/mixins/common";
import Menu from "@/components/menu/menu.vue";
import { overrideHeaders } from "@/config/request"
import { useStore } from "@/store";
import profile from "@/assets/comment/3.svg"
import { useRouter } from "vue-router";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons-vue";
import { useFullscreen } from '@vueuse/core'

const logoUrl = localStorage.getItem("theme") === "light" ? new URL("../../assets/login/logo.jpeg", import.meta.url).href : new URL("../../assets/login/logo.png", import.meta.url).href

const { is_open, close } = CommonMixin()

const store = useStore()

const router = useRouter()




const { isFullscreen, toggle } = useFullscreen()

overrideHeaders()

</script>