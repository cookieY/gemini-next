<template>
      <a-row :gutter="24">
            <a-col :xs="24" :md="8">
                  <a-select show-search placeholder="数据源搜索" style="width: 100%;"></a-select>
            </a-col>
      </a-row>
      <br />
      <a-list
            :loading="loading"
            :data-source="props.source"
            :grid="{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4 }"
            :pagination="pagination"
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
                                    <a-tooltip title="查看审核流程">
                                          <UserSwitchOutlined />
                                    </a-tooltip>
                                    <a-tooltip :title="`所属环境:${item.idc}`">
                                          <ShareAltOutlined />
                                    </a-tooltip>
                                    <a-dropdown>
                                          <a-tooltip title="进入申请页面">
                                                <a
                                                      class="ant-dropdown-link"
                                                      @click="() => router.push('/apply/order')"
                                                >
                                                      <EnterOutlined />
                                                </a>
                                          </a-tooltip>
                                    </a-dropdown>
                              </template>
                        </a-card>
                  </a-list-item>
            </template>
      </a-list>
</template>

<script lang="ts" setup>
import { UserSwitchOutlined, EnterOutlined, ShareAltOutlined } from "@ant-design/icons-vue"
import router from "@/router"
const loading = false
const props = defineProps<{
      source?: Array<object>
}>()

const pagination = {
      pageSize: 20,
};
</script>
