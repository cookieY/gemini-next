<template>
      <a-page-header :title="$t('order.apply.title')" @back="() => $router.go(-1)">
            <template #tags>
                  <a-tag color="blue">Running</a-tag>
            </template>
            <p>{{ $t('order.apply.desc') }}</p>
            <a-row type="flex" align="middle" style="text-align: center;">
                  <a-space :size="30">
                        <a-statistic :title="$t('order.apply.dml.desc')" :value="count.dml" />
                        <a-statistic :title="$t('order.apply.ddl.desc')" :value="count.ddl" />
                        <a-statistic :title="$t('order.apply.query.desc')" :value="count.query" />
                  </a-space>
            </a-row>
      </a-page-header>

      <a-tabs v-model:activeKey="activeKey">
            <template v-for="i in tags" :key="i.key">
                  <a-tab-pane :tab="i.title">
                        <ListApp :type="i.key" :id="i.id"></ListApp>
                  </a-tab-pane>
            </template>
            <a-tab-pane tab="人工审核" key="only">
                  <a-row type="flex" justify="center" align="middle">
                        <a-col :span="12">
                              <a-card style="width: 500px;text-align: center;" title="仅审核工单填写">
                                    <a-form layout="vertical">
                                          <a-form-item label="数据源">
                                                <a-input v-model:value="onlyAudit.source"></a-input>
                                          </a-form-item>
                                          <a-form-item label="文件上传">
                                                <a-upload-dragger
                                                      v-model:fileList="onlyAudit.fileList"
                                                      name="file"
                                                      :multiple="true"
                                                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                >
                                                      <p class="ant-upload-drag-icon">
                                                            <inbox-outlined></inbox-outlined>
                                                      </p>
                                                      <p class="ant-upload-text">上传SQL文件</p>
                                                      <p
                                                            class="ant-upload-hint"
                                                      >仅支持zip/rar/text/sql后缀名的文件</p>
                                                </a-upload-dragger>
                                          </a-form-item>
                                    </a-form>
                                    <a-form-item>
                                          <a-button block>提交</a-button>
                                    </a-form-item>
                              </a-card>
                        </a-col>
                  </a-row>
            </a-tab-pane>
            <a-tab-pane :tab="$t('order.apply.query.tab')" key="query">
                  <QueryApp></QueryApp>
            </a-tab-pane>
      </a-tabs>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import ListApp from "@/components/listApp/listApp.vue";
import QueryApp from "@/components/listApp/queryApp.vue";
import { useI18n } from 'vue-i18n';
import { useStore } from "@/store";
import { Request } from "@/apis/fetchSchema";
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";

const onlyAudit = reactive({
      source: "",
      fileList: [],
})

const { t } = useI18n()

const store = useStore()

const request = new Request

const activeKey = computed({
      get () {
            return store.state.menu.activeKey
      },
      set (val: string) {
            store.commit("menu/CHANGE_ACTIVE_TABS", val)
      }
})

const count = reactive<{ [key: string]: number }>({
      dml: 0,
      ddl: 0,
      query: 0
})

const tags = [
      { title: t('order.apply.dml.tab'), key: "dml", id: 1 },
      { title: t('order.apply.ddl.tab'), key: "ddl", id: 0 },
]

onMounted(() => {
      request.Source("count").then((res: AxiosResponse<Res<any>>) => {
            count.dml = res.data.payload.dml
            count.ddl = res.data.payload.ddl
            count.query = res.data.payload.query
      })
})
</script>