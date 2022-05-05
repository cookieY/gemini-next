<template>
      <a-form ref="formRef" :model="dbForm" :rules="rules" v-bind="layout">
            <a-form-item label="环境" name="idc">
                  <a-select v-model:value="dbForm.idc">
                        <a-select-option v-for="i in idc" :key="i" :value="i">{{ i }}</a-select-option>
                  </a-select>
            </a-form-item>
            <a-form-item label="名称" name="source">
                  <a-input v-model:value="dbForm.source"></a-input>
            </a-form-item>
            <a-form-item label="地址" name="ip">
                  <a-input v-model:value="dbForm.ip"></a-input>
            </a-form-item>
            <a-form-item label="端口" name="port">
                  <a-input-number v-model:value="dbForm.port"></a-input-number>
            </a-form-item>
            <a-form-item label="用户名" name="username">
                  <a-input v-model:value="dbForm.username"></a-input>
            </a-form-item>
            <a-form-item label="密码" name="password">
                  <a-input-password v-model:value="dbForm.password"></a-input-password>
            </a-form-item>
            <a-form-item label="流程" name="flow_id">
                  <a-select v-model:value="dbForm.flow_id">
                        <a-select-option v-for="i in flow" :key="i.id" :value="i.id">{{ i.source }}</a-select-option>
                  </a-select>
            </a-form-item>
            <a-form-item label="负责人" name="principal">
                  <a-select v-model:value="dbForm.principal" style="width: 100%" show-search :options="principalList.map(item => ({
                        label: item.username,
                        value: item.username
                  }))">
                  </a-select>
            </a-form-item>
            <a-form-item label="类型" name="is_query">
                  <a-radio-group v-model:value="dbForm.is_query" name="radioGroup">
                        <a-radio :value="2">读写</a-radio>
                        <a-radio :value="0">写</a-radio>
                        <a-radio :value="1">读</a-radio>
                  </a-radio-group>
            </a-form-item>
            <a-form-item label="操作">
                  <a-space size="small">
                        <a-button type="dashed" @click="checkConn">测试连接</a-button>
                        <a-button type="primary" @click="createSource">创建</a-button>
                        <a-button type="primary" danger @click="resetFields">清空</a-button>
                  </a-space>
            </a-form-item>
      </a-form>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { Request, Source } from "@/apis/db";
import CommonMixins from "@/mixins/common"
import DBMixins from "@/mixins/db"
import { useStore } from '@/store'
import { EventBus } from "@/lib";

const store = useStore()

const { layout } = CommonMixins()

const { rules } = DBMixins()

const request = new Request

const principalList = computed(() => store.state.common.principal)

const idc = computed(() => {
      return store.state.common.idc
})

const flow = computed(() => {
      return store.state.common.flow
})

const dbForm = ref(
      {
            idc: "",
            source: "",
            ip: "",
            port: 3306,
            password: "",
            username: "",
            is_query: 2,
            flow_id: null as any,
            principal: ""
      } as Source
)

const formRef = ref()

const resetFields = () => {
      formRef.value.resetFields();
}

const fill = (vl: Source) => {
      dbForm.value = vl
}

const createSource = () => {
      formRef.value.validate().then(() => {
            request.Ops({ db: dbForm.value, tp: "create" }).then(() => {
                  EventBus.emit("postOk")
                  resetFields()
            })
      })
}

const checkConn = () => {
      request.Ops({ db: dbForm.value, tp: "test" })
}


defineExpose({
      fill
})

</script>