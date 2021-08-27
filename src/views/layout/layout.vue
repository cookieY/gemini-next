<template>
      <div>
            <a-layout>
                  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
                        <a-row :gutter="24">
                              <a-col :xs="5" :sm="2">
                                    <img src="../../assets/login/logo.png" style="width: 150px;" />
                              </a-col>
                              <a-col :xs="0" :sm="15" :offset="5">
                                    <Menu mode="horizontal"></Menu>
                              </a-col>
                              <a-col :xs="1" :sm="0" :offset="16">
                                    <MenuFoldOutlined
                                          :style="{ fontSize: '20px' }"
                                          @click="is_open = true"
                                    />
                              </a-col>
                        </a-row>
                  </a-layout-header>
                  <a-layout-content :style="{ padding: '0 20px', marginTop: '64px' }">
                        <div :style="{ margin: '16px 0' }">
                              <router-view v-slot="{ Component }">
                                    <component :is="Component" />
                              </router-view>
                        </div>
                  </a-layout-content>
                  <a-layout-footer :style="{ textAlign: 'center' }">{{ Copyright }}</a-layout-footer>
            </a-layout>

            <a-drawer placement="right" :closable="false" :visible="is_open" @close="close">
                  <Menu @close="() => is_open = false"></Menu>
            </a-drawer>
      </div>
</template>
<script setup lang="ts">
import { Copyright } from "@/config/vars";
import { MenuFoldOutlined } from '@ant-design/icons-vue';
import CommonMixin from "@/mixins/common";
import Menu from "@/components/menu/menu.vue";
import { overrideHeaders } from "@/config/request"
const { is_open, close } = CommonMixin()
overrideHeaders()

</script>