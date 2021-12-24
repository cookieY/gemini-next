<template>
      <a-row :gutter="24">
            <a-col :xs="24" :md="8">
                  <a-select
                        v-model:value="selected"
                        show-search
                        placeholder="数据源搜索"
                        style="width: 100%;"
                        :filterOption="filterOption"
                        @change="handleChange"
                  >
                        <a-select-option value="all">全部</a-select-option>
                        <a-select-option v-for="i in options" :value="i.source">{{ i.source }}</a-select-option>
                  </a-select>
            </a-col>
      </a-row>
      <br />
      <a-list
            :loading="loading"
            :data-source="source"
            :grid="{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4 }"
            :pagination="pagination"
      >
            <template #renderItem="{ item }">
                  <a-list-item>
                        <a-card :body-style="{ paddingBottom: 20 }">
                              <a-card-meta :title="item.source">
                                    <template v-slot:description>所属环境:{{ item.idc }}</template>
                                    <template v-slot:avatar>
                                          <a-avatar :style="{ backgroundColor: '#Ff9900' }">
                                                <template v-slot:icon>
                                                      <CodepenCircleOutlined />
                                                </template>
                                          </a-avatar>
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
                                                      @click="() => router.push({ path: '/apply/order', query: { type: props.type, idc: item.idc, source: item.source, source_id: item.source_id } })"
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
import { UserSwitchOutlined, EnterOutlined, ShareAltOutlined, CodepenCircleOutlined } from "@ant-design/icons-vue"
import { AxiosResponse } from "axios"
import { Res } from "@/config/request"
import { onMounted, ref } from "@vue/runtime-core";
import { FetchSourceApis, RespFetchSource } from "@/apis/listAppApis"
import { useRouter } from "vue-router"

const props = defineProps<{
      type: string
}>()

const router = useRouter()

const pagination = {
      pageSize: 20,
}

const filterOption = (input: string, option: any) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const handleChange = (value: string) => {
      value === "all" ? source.value = tmpSource : source.value = tmpSource.filter((item: RespFetchSource) => item.source === value)
};

const selected = ref("all")

const emit = defineEmits(['RespIsOk'])

let tmpSource = [] as RespFetchSource[]

let source = ref([] as RespFetchSource[])

let options = ref([] as RespFetchSource[])

let loading = ref(true)

onMounted(() => {
      FetchSourceApis(props.type).then((res: AxiosResponse<Res<RespFetchSource[]>>) => {
            tmpSource = res.data.payload
            source.value = res.data.payload
            options.value = res.data.payload
            emit("RespIsOk", res.data.payload.length)
      }).finally(() => {
            loading.value = false
      })
})

</script>
