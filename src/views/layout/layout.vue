<template>
      <div>
            <a-layout>
                  <a-layout-sider
                        :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
                  >
                        <img src="../../assets/login/logo.png" style="width: 150px;" />
                        <Menu></Menu>
                  </a-layout-sider>
                  <a-layout :style="{ marginLeft: '200px' }">
                        <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
                              <router-view v-slot="{ Component }">
                                    <component :is="Component" />
                              </router-view>
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
import { MenuFoldOutlined } from '@ant-design/icons-vue';
import CommonMixin from "@/mixins/common";
import Menu from "@/components/menu/menu.vue";
import { overrideHeaders } from "@/config/request"
const { is_open, close } = CommonMixin()
overrideHeaders()

</script>