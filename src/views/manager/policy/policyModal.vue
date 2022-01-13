<template>
      <a-modal v-model:visible="is_open" :title="props.title" :width="800" @ok="postPolicy">
            <a-form layout="vertical">
                  <a-form-item label="权限组名称">
                        <a-input v-model:value="selfRuse.name"></a-input>
                  </a-form-item>
                  <template v-for="i in range">
                        <a-form-item :label="i === 'query' ? `查询权限` : `${i}权限`.toLocaleUpperCase()">
                              <a-checkbox
                                    v-model:checked="checkAll[i]"
                                    :indeterminate="indeterminate[i]"
                                    @change="(e) => onCheckAllChange(e, i)"
                              >全选</a-checkbox>
                              <br />
                              <br />
                              <a-checkbox-group v-model:value="selfRuse[`${i}_source`]">
                                    <a-checkbox
                                          v-for="k in (i === 'query' ? ruse.query : ruse.source)"
                                          :value="`${k.source_id}`"
                                    >{{ k.source }}</a-checkbox>
                              </a-checkbox-group>
                        </a-form-item>
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
import { onMounted, reactive, watch, unref } from "vue"

const emit = defineEmits(['success'])

const { is_open, turnState } = CommonMixins()

const request = new Request()

const props = defineProps<{
      title: string,
}>()

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


const onCheckAllChange = (e: any, type: string) => {
      selfRuse[`${type}_source`] = e.target.checked ? type === 'query' ? ruse.query.map(s => s.source_id) as string[] : ruse.source.map(s => s.source_id) as string[] : [] as string[]
}

const postPolicy = () => {
      request.Post(selfRuse).then(() => { turnState(); emit('success') })

}

const option = (t: string[], n: string) => {
      return [!!t.length && t.length < (n === 'query' ? ruse.query.length : ruse.source.length), t.length === (n === 'query' ? ruse.query.length : ruse.source.length)]
}

const editPolicy = (vl: Policy) => {
      selfRuse.id = vl.id
      selfRuse.name = vl.name
      selfRuse.dml_source = vl.permissions.dml_source
      selfRuse.ddl_source = vl.permissions.ddl_source
      selfRuse.query_source = vl.permissions.query_source
      turnState()
}

const newPolicy = () => {
      Object.assign(selfRuse, unref(initRune))
      turnState()
}

watch(() => selfRuse.ddl_source, (ddl) => {
      [indeterminate.ddl, checkAll.ddl] = option(ddl, "")
})

watch(() => selfRuse.dml_source, (dml) => {
      [indeterminate.dml, checkAll.dml] = option(dml, "")
})

watch(() => selfRuse.query_source, (query) => {
      [indeterminate.query, checkAll.query] = option(query, "query")
})


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