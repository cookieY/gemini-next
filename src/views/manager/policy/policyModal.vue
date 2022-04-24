<template>
      <a-modal v-model:visible="is_open" :title="props.title" :width="800" @ok="postPolicy">
            <a-form layout="vertical">
                  <a-form-item label="权限组名称">
                        <a-input v-model:value="selfRuse.name" :disabled="isEdit"></a-input>
                  </a-form-item>
                  <template v-for="i in range">
                        <a-transfer
                              :titles="[' ' + $t('common.all') + `${i.toLocaleUpperCase()}权限`, ' ' + $t('common.selected') + `${i.toLocaleUpperCase()}权限`]"
                              :rowKey="record => record.source_id" v-model:target-keys="selfRuse[`${i}_source`]"
                              :data-source="i === 'query' ? ruse.query : ruse.source" show-search
                              :render="item => item.source" :list-style="{
                                    width: '400px',
                                    height: '300px',
                              }" />
                        <a-divider></a-divider>
                  </template>
            </a-form>
      </a-modal>
</template>
<script lang="ts" setup>
import { Policy, PolicyPost, PolicyRuse, Request } from "@/apis/policy"
import { Res } from "@/config/request"
import CommonMixins from "@/mixins/common"
import { AxiosResponse } from "axios"
import { onMounted, reactive, watch, unref, ref } from "vue"

const emit = defineEmits(['success'])

const { is_open, turnState } = CommonMixins()

const request = new Request()

const props = defineProps<{
      title: string,
}>()

const isEdit = ref(false)

const ruse = reactive<PolicyRuse>({
      source: [],
      query: []
});

const checkAll = reactive({
      ddl: false,
      dml: false,
      query: false
});

const indeterminate = reactive({
      ddl: false,
      dml: false,
      query: false
})

const selfRuse = reactive<PolicyPost>({
      ddl_source: [],
      dml_source: [],
      query_source: [],
      name: "",
      id: 0
})

let initRune = Object.assign({}, selfRuse)

enum range { DDL = "ddl", DML = "dml", QUERY = "query" }

const postPolicy = () => {
      request.Post(selfRuse).then(() => { turnState(); emit('success') })

}

const editPolicy = (vl: Policy) => {
      isEdit.value = true
      selfRuse.id = vl.id
      selfRuse.name = vl.name
      vl.permissions.query_source === null ? selfRuse.query_source = [] : selfRuse.query_source = vl.permissions.query_source
      vl.permissions.dml_source === null ? selfRuse.dml_source = [] : selfRuse.dml_source = vl.permissions.dml_source
      vl.permissions.ddl_source === null ? selfRuse.ddl_source = [] : selfRuse.ddl_source = vl.permissions.ddl_source
      turnState()
}

const newPolicy = () => {
      isEdit.value = false
      Object.assign(selfRuse, unref(initRune))
      turnState()
}


onMounted(() => {
      request.Get().then((res: AxiosResponse<Res<PolicyRuse>>) => {
            ruse.source = res.data.payload.source
            ruse.query = res.data.payload.query
      })
})

defineExpose({
      newPolicy,
      editPolicy
})


</script>