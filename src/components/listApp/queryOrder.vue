<template>
      <a-row type="flex" justify="start" align="middle">
            <a-col :span="7" :offset="1">
                  <a-alert :message="$t('order.query.audit.title')" type="warning" show-icon>
                        <template #description>
                              <div v-html="$t('order.query.audit.tips')"></div>
                        </template>
                  </a-alert>
            </a-col>
            <a-col :span="7" :offset="1">
                  <a-form layout="vertical">
                        <a-form-item :label="$t('order.query.audit.source')">
                              <a-select
                                    v-model:value="form.source_id"
                                    show-search
                                    :filter-option="filterOption"
                                    @select="(e: string, a: any) => form.text = t('common.table.source') + `:${a.key}\n`"
                              >
                                    <a-select-option
                                          v-for="i in options"
                                          :key="i.source"
                                          :value="i.source_id"
                                    >{{ i.source }}</a-select-option>
                              </a-select>
                        </a-form-item>
                        <a-form-item :label="$t('order.query.audit.export')" v-if="isExport">
                              <a-radio-group v-model:value="form.export" name="radioGroup">
                                    <a-radio :value="0">{{ $t('common.no') }}</a-radio>
                                    <a-radio :value="1">{{ $t('common.yes') }}</a-radio>
                              </a-radio-group>
                        </a-form-item>
                        <a-form-item :label="$t('order.query.audit.remark')">
                              <a-textarea :rows="5" v-model:value="form.text"></a-textarea>
                        </a-form-item>
                        <a-form-item>
                              <a-button
                                    block
                                    @click="postQuery"
                                    :disabled="disabled"
                              >{{ $t('common.commit') }}</a-button>
                        </a-form-item>
                  </a-form>
            </a-col>
      </a-row>
</template>

<script lang="ts" setup>
import { QueryPost, Request as Query } from "@/apis/query";
import { AxiosResponse } from "axios";
import { onMounted, reactive, ref } from 'vue';
import { Request } from "@/apis/fetchSchema";
import { RespFetchSource } from "@/apis/listAppApis";
import { Res } from "@/config/request";
import { useI18n } from "vue-i18n";

const props = defineProps<{
      isExport: boolean,
      type: string
}>()

const form = reactive<QueryPost>({
      source_id: "",
      text: "",
      export: 0
})

const disabled = ref(false)

const { t } = useI18n()

const filterOption = (input: string, option: any) => {
      return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

const options = ref<any[]>([])

const query = new Query

const request = new Request

const loading = ref(true)

const postQuery = () => {
      query.Post(form).finally(() => disabled.value = true)
}

onMounted(() => {
      request.Source("query").then((res: AxiosResponse<Res<RespFetchSource[]>>) => {
            options.value = res.data.payload
      }).finally(() => {
            loading.value = false
      })
})

</script>