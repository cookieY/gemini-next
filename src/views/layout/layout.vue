<template>
      <a-layout>
            <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
                  <a-row>
                        <a-col span="2">
                              <img src="../../assets/login/logo.png" style="width: 150px;" />
                        </a-col>
                        <a-col :span="15" offset="5">
                              <a-menu
                                    theme="dark"
                                    mode="horizontal"
                                    :style="{ lineHeight: '64px' }"
                              >
                                    <a-menu-item key="/home">
                                          <HomeOutlined />
                                          <span>主页</span>
                                    </a-menu-item>
                                    <a-menu-item key="/ordersubmit">
                                          <UnlockOutlined />
                                          <span>工单申请</span>
                                    </a-menu-item>
                                    <a-menu-item key="/query">
                                          <TagOutlined />
                                          <span>查询</span>
                                    </a-menu-item>
                                    <a-menu-item key="/audit">
                                          <AuditOutlined />
                                          <span>审核</span>
                                    </a-menu-item>
                                    <a-menu-item key="/manager">
                                          <CloudSyncOutlined />
                                          <span>管理</span>
                                    </a-menu-item>
                              </a-menu>
                        </a-col>
                  </a-row>
            </a-layout-header>
            <a-layout-content :style="{ padding: '0 20px', marginTop: '64px' }">
                  <div :style="{ margin: '16px 0' }">
                        <router-view></router-view>
                  </div>
            </a-layout-content>
            <a-layout-footer :style="{ textAlign: 'center' }">{{ Copyright }}</a-layout-footer>
      </a-layout>
</template>
<script setup lang="ts">
import { Copyright } from "@/config/vars";
import { HomeOutlined, AuditOutlined, CloudSyncOutlined, UnlockOutlined, TagOutlined } from '@ant-design/icons-vue';

</script>