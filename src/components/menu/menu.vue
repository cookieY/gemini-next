<template>
      <a-menu mode="inline" v-model:selectedKeys="selectedKey" @click="changeMenu">
            <a-menu-item key="/home">
                  <HomeOutlined />
                  <span>主页</span>
            </a-menu-item>
            <a-menu-item key="/server/order/common/list">
                  <UnlockOutlined />
                  <span>我的工单</span>
            </a-menu-item>
            <a-menu-item key="/apply">
                  <ConsoleSqlOutlined />
                  <span>工单申请</span>
            </a-menu-item>
            <a-menu-item key="/server/order/audit">
                  <AuditOutlined />
                  <span>工单审核</span>
            </a-menu-item>
            <a-sub-menu title="管理">
                  <template #icon>
                        <CloudSyncOutlined />
                  </template>
                  <a-menu-item key="/manager/user">
                        <UserAddOutlined />
                        <span>用户</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/db">
                        <CloudServerOutlined />
                        <span>数据源</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/flow">
                        <PartitionOutlined />
                        <span>流程</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/policy">
                        <UsergroupAddOutlined />
                        <span>权限组</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/rules">
                        <CrownOutlined />
                        <span>审核规则</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/autotask">
                        <PaperClipOutlined />
                        <span>自动化任务</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/setting">
                        <ToolOutlined />
                        <span>设置</span>
                  </a-menu-item>
            </a-sub-menu>
      </a-menu>
</template>
<script lang="ts"  setup>
import { HomeOutlined, AuditOutlined, ToolOutlined, PaperClipOutlined, CloudServerOutlined, CloudSyncOutlined, UsergroupAddOutlined, UserAddOutlined, UnlockOutlined, ConsoleSqlOutlined, PartitionOutlined, CrownOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store'
import { ref } from 'vue';
import router from '@/router';
const props = defineProps<{
      mode?: string
}>()

const emit = defineEmits(['close'])

const store = useStore()

const selectedKey = ref(store.state.menu.selectedKey)

const changeMenu = (vl: { keyPath: string[], key: string }) => {
      store.commit("menu/CHANGE_SELECTED", vl.keyPath)
      router.push(vl.key).finally(() => emit('close'))
}


</script>