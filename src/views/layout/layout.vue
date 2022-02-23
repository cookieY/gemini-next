<template>
      <div v-watermark="{ text: store.state.user.account.user }">
            <a-layout>
                  <a-layout-sider
                        :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
                  >
                        <img src="../../assets/login/logo.png" style="width: 150px;" />
                        <Menu></Menu>
                  </a-layout-sider>

                  <a-layout :style="{ marginLeft: '200px' }">
                        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
                              <a-row>
                                    <a-col :span="3" :offset="19">
                                          <a-dropdown>
                                                <div>
                                                      <a-avatar :src="profile" />
                                                      <span
                                                            style="margin-left: 5%;font-weight: bold;"
                                                      >{{ store.state.user.account.user }}</span>
                                                </div>
                                                <template #overlay>
                                                      <a-menu>
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
                              <a-card size="small">
                                    <router-view v-slot="{ Component }">
                                          <component :is="Component" />
                                    </router-view>
                              </a-card>
                        </a-layout-content>
                  </a-layout>
            </a-layout>
            <a-layout>
                  <a-layout-footer :style="{ textAlign: 'center' }">{{ Copyright }}</a-layout-footer>
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

const { is_open, close } = CommonMixin()

const store = useStore()

overrideHeaders()

</script>