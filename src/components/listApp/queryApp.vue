<template>
      <template v-if="!isQuery">
            <a-row type="flex" align="middle">
                  <a-col :span="6" offset="2">
                        <a-alert :message="$t('order.query.audit.title')" type="warning" show-icon>
                              <template #description>
                                    <div v-html="$t('order.query.audit.tips')"></div>
                              </template>
                        </a-alert>
                  </a-col>
                  <a-col :span="6" offset="1">
                        <a-form layout="vertical">
                              <a-form-item :label="$t('order.query.audit.source')">
                                    <a-select v-model:value="form.source_id">
                                          <a-select-option
                                                v-for="i in options"
                                                :key="i.source_id"
                                                :value="i.source_id"
                                          >{{ i.source }}</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item :label="$t('order.query.audit.remark')">
                                    <a-textarea :rows="5" v-model:value="form.text"></a-textarea>
                              </a-form-item>
                              <a-form-item>
                                    <a-button
                                          type="primary"
                                          block
                                          @click="postQuery"
                                    >{{ $t('common.commit') }}</a-button>
                              </a-form-item>
                        </a-form>
                  </a-col>
            </a-row>
      </template>
      <template v-else>
            <ListApp type="query" :id="110"></ListApp>
      </template>
</template>


<script lang="ts" setup>
import { Res } from "@/config/request"
import { AxiosResponse } from "axios"
import { onMounted, reactive, ref } from "vue"
import { QueryPost, Request as Query } from "@/apis/query";
import { Request } from "@/apis/fetchSchema";
import { RespFetchSource } from "@/apis/listAppApis";
import ListApp from "./listApp.vue";

const loading = ref(true)

const isQuery = ref(false)

const request = new Request

const options = ref<any[]>([])

const query = new Query

const form = reactive<QueryPost>({
      source_id: "",
      text: ""
})

const postQuery = () => {
      query.Post(form)
}

onMounted(() => {
      query.IsQuery().then((res: AxiosResponse<Res<any>>) => {
            isQuery.value = res.data.payload
      }).finally(() => {
            !isQuery.value ? request.Source("query").then((res: AxiosResponse<Res<RespFetchSource[]>>) => {
                  options.value = res.data.payload
            }).finally(() => {
                  loading.value = false
            }) : null
      })
})

</script>