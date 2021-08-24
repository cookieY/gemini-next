<template>
      <a-menu
            theme="dark"
            :mode="props.mode"
            :style="{ lineHeight: '64px' }"
            v-model:selectedKeys="selectedKey"
            @click="changeMenu"
      >
            <a-menu-item key="/home">
                  <HomeOutlined />
                  <span>主页</span>
            </a-menu-item>
            <a-menu-item key="/personal">
                  <UnlockOutlined />
                  <span>我的申请</span>
            </a-menu-item>
            <a-menu-item key="/apply">
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
</template>
<script lang="ts"  setup>
import { HomeOutlined, AuditOutlined, CloudSyncOutlined, TagOutlined, UnlockOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store'
import { onMounted, ref } from 'vue';
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