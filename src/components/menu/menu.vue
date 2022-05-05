<template>
      <a-menu mode="inline" v-model:selectedKeys="selectedKey" @click="changeMenu">
            <a-menu-item key="/home">
                  <HomeOutlined />
                  <span>{{ $t('menu.home') }}</span>
            </a-menu-item>
            <a-menu-item key="/server/order/common/list">
                  <UnlockOutlined />
                  <span>{{ $t('menu.order.self') }}</span>
            </a-menu-item>
            <a-menu-item key="/apply">
                  <ConsoleSqlOutlined />
                  <span>{{ $t('menu.order.apply') }}</span>
            </a-menu-item>
            <a-menu-item key="/comptroller/order" v-if="store.state.user.account.is_record === 1">
                  <area-chart-outlined />
                  <span>{{ $t('menu.comptroller.title') }}</span>
            </a-menu-item>
            <a-sub-menu :title="$t('menu.order.title')">
                  <template #icon>
                        <AuditOutlined />
                  </template>
                  <a-menu-item key="/server/order/audit/list">
                        <function-outlined />
                        <span>{{ $t('menu.order.order') }}</span>
                  </a-menu-item>
                  <a-menu-item key="/server/query/list">
                        <MonitorOutlined />
                        <span>{{ $t('menu.order.query') }}</span>
                  </a-menu-item>
            </a-sub-menu>
            <a-sub-menu :title="$t('menu.manage')" v-if="store.state.user.account.user === 'admin'">
                  <template #icon>
                        <CloudSyncOutlined />
                  </template>
                  <a-menu-item key="/manager/user">
                        <UserAddOutlined />
                        <span>{{ $t('menu.manage.user') }}</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/db">
                        <CloudServerOutlined />
                        <span>{{ $t('menu.manage.source') }}</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/flow">
                        <PartitionOutlined />
                        <span>{{ $t('menu.manage.flow') }}</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/policy">
                        <UsergroupAddOutlined />
                        <span>{{ $t('menu.manage.policy') }}</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/rules">
                        <CrownOutlined />
                        <span>{{ $t('menu.manage.rule') }}</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/autotask">
                        <PaperClipOutlined />
                        <span>{{ $t('menu.manage.auto') }}</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/board">
                        <DotChartOutlined />
                        <span>{{ $t('menu.manage.board') }}</span>
                  </a-menu-item>
                  <a-menu-item key="/manager/setting">
                        <ToolOutlined />
                        <span>{{ $t('menu.manage.setting') }}</span>
                  </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="/exist">
                  <LogoutOutlined />
                  <span>{{ $t('menu.loginout') }}</span>
            </a-menu-item>
      </a-menu>
</template>
<script lang="ts"  setup>
import { AreaChartOutlined, DotChartOutlined, HomeOutlined, LogoutOutlined, MonitorOutlined, FunctionOutlined, AuditOutlined, ToolOutlined, PaperClipOutlined, CloudServerOutlined, CloudSyncOutlined, UsergroupAddOutlined, UserAddOutlined, UnlockOutlined, ConsoleSqlOutlined, PartitionOutlined, CrownOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store'
import { ref } from 'vue';
import router from '@/router';

const emit = defineEmits(['close'])

const store = useStore()

const selectedKey = ref(store.state.menu.selectedKey)

const changeMenu = (vl: { keyPath: string[], key: string }) => {
      store.commit("menu/CHANGE_SELECTED", vl.keyPath)
      vl.key === "/exist" ? router.push("/login") : router.push(vl.key).finally(() => emit('close'))
}


</script>