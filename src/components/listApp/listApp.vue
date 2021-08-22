<template>
      <a-list
            :loading="loading"
            :data-source="props.source"
            :grid="{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4 }"
      >
            <template #renderItem="{ item }">
                  <a-list-item>
                        <a-card :body-style="{ paddingBottom: 20 }">
                              <a-card-meta :title="item.title" description="申请数: 10">
                                    <template v-slot:avatar>
                                          <a-avatar size="small" :src="item.avatar" />
                                    </template>
                              </a-card-meta>
                              <template v-slot:actions>
                                    <a-tooltip title="收藏">
                                          <FireOutlined />
                                    </a-tooltip>
                                    <a-tooltip title="审核流程">
                                          <UserSwitchOutlined />
                                    </a-tooltip>
                                    <a-tooltip title="分享">
                                          <ShareAltOutlined />
                                    </a-tooltip>
                                    <a-dropdown>
                                          <a class="ant-dropdown-link">
                                                <EllipsisOutlined />
                                          </a>
                                          <a-menu slot="overlay">
                                                <a-menu-item>
                                                      <a href="javascript:;">1st menu item</a>
                                                </a-menu-item>
                                                <a-menu-item>
                                                      <a href="javascript:;">2nd menu item</a>
                                                </a-menu-item>
                                                <a-menu-item>
                                                      <a href="javascript:;">3rd menu item</a>
                                                </a-menu-item>
                                          </a-menu>
                                    </a-dropdown>
                              </template>
                        </a-card>
                  </a-list-item>
            </template>
      </a-list>
</template>

<script lang="ts" setup>
import { UserSwitchOutlined, FireOutlined, EllipsisOutlined, ShareAltOutlined } from "@ant-design/icons-vue"
const loading = false
const props = defineProps<{
      source?: Array<object>
}>()
</script>
