<template>
      <a-modal v-model:visible="is_open" title="数据源信息" width="800px" @ok="editDB">
            <a-row>
                  <a-col :span="15">
                        <a-form :model="dbForm" v-bind="layout">
                              <a-form-item label="环境" name="idc">
                                    <a-select v-model:value="dbForm.idc">
                                          <a-select-option
                                                v-for="i in idc"
                                                :key="i"
                                                :value="i"
                                          >{{ i }}</a-select-option>
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
                              <a-form-item label="类型" name="is_query">
                                    <a-radio-group
                                          v-model:value="dbForm.is_query"
                                          name="radioGroup"
                                    >
                                          <a-radio :value="2">读写</a-radio>
                                          <a-radio :value="0">写</a-radio>
                                          <a-radio :value="1">读</a-radio>
                                    </a-radio-group>
                              </a-form-item>
                              <a-form-item label="所属流程">
                                    <a-select v-model:value="dbForm.flow_id" @change="mergeFlow">
                                          <a-select-option
                                                v-for="i in flow"
                                                :key="i.id"
                                                :value="i.id"
                                          >{{ i.source }}</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item label="排除的数据库">
                                    <a-select
                                          mode="multiple"
                                          show-search
                                          style="width: 100%"
                                          v-model:value="excludeDB"
                                          :max-tag-count="6"
                                    >
                                          <a-select-option
                                                v-for="i in schemaList"
                                                :key="i"
                                                :value="i"
                                          >{{ i }}</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item label="脱敏字段">
                                    <a-select
                                          v-model:value="insulateWord"
                                          mode="tags"
                                          style="width: 100%"
                                          placeholder="Tags Mode"
                                          :max-tag-count="6"
                                    ></a-select>
                              </a-form-item>
                              <a-form-item :label="$t('common.action')">
                                    <a-button ghost @click="checkConn">测试连接</a-button>
                              </a-form-item>
                        </a-form>
                  </a-col>
                  <a-col :span="8" offset="1">
                        <a-steps direction="vertical" size="small" :current="0">
                              <a-step v-for="i in steps" :title="i.desc">
                                    <template #description>
                                          <a-tag v-for="k in i.auditor" color="#108ee9">{{ k }}</a-tag>
                                    </template>
                              </a-step>
                        </a-steps>
                  </a-col>
            </a-row>
      </a-modal>
</template>

<script lang="ts" setup>
import { Request as Flow } from "@/apis/flow"
import CommonMixins from "@/mixins/common"
import { ref, computed } from "vue"
import { useStore } from '@/store'
import { AxiosResponse } from "axios"
import { Res } from "@/config/request"
import { RespSteps, Steps } from "@/apis/flow"
import { Source, Request as DB } from "@/apis/db"
import { Request } from "@/apis/fetchSchema"

const { is_open, turnState, layout } = CommonMixins()

const store = useStore()

const idc = computed(() => {
      return store.state.common.idc
})

const flow = computed(() => {
      return store.state.common.flow
})

const steps = ref([] as Steps[])

const request = new Request

const db = new DB

const flowReq = new Flow

let dbForm = ref(
      {
            idc: "",
            source: "",
            ip: "",
            port: 0,
            password: "",
            username: "",
            is_query: 2,
            flow_id: 0,
            source_id: "",
            exclude_db_list: "",
            insulate_word_list: ""
      } as Source
)

const schemaList = ref<string[]>([])

const excludeDB = ref<string[]>([])

const insulateWord = ref<string[]>([])

const mergeFlow = (vl: number) => {
      flowReq.Profile(vl).then((res: AxiosResponse<Res<RespSteps>>) => steps.value = res.data.payload.steps)
}

const editDB = () => {
      dbForm.value.exclude_db_list = excludeDB.value.join(",")
      dbForm.value.insulate_word_list = insulateWord.value.join(",")
      db.Ops({ db: dbForm.value, tp: "edit" }).then(() => turnState())
}

const fillInfo = (vl: any) => {
      dbForm.value = vl
      turnState()
      excludeDB.value = dbForm.value.exclude_db_list.split(",")
      insulateWord.value = dbForm.value.insulate_word_list.split(",")
      request.Schema(dbForm.value.source_id, "schema").then((res: AxiosResponse<Res<any>>) => schemaList.value = res.data.payload.results)
      flowReq.Profile(dbForm.value.flow_id).then((res: AxiosResponse<Res<RespSteps>>) => steps.value = res.data.payload.steps)
}


const checkConn = () => {
      db.Ops({ db: dbForm.value, tp: "test", encrypt: true })
}

defineExpose({
      fillInfo
})

</script>