<template>
      <a-row type="flex" justify="center" align="middle">
            <a-col :span="12">
                  <a-card style="width: 500px;text-align: center;" title="仅审核工单填写">
                        <a-form layout="vertical">
                              <a-form-item label="数据源">
                                    <a-select
                                          v-model:value="onlyAudit.source_id"
                                          @change="timeline"
                                    >
                                          <a-select-option
                                                v-for="i in list.source"
                                                :key="i.source_id"
                                                :value="i.source_id"
                                          >{{ i.source }}</a-select-option>
                                    </a-select>
                              </a-form-item>
                              <a-form-item label="文件上传">
                                    <a-upload-dragger
                                          v-model:fileList="onlyAudit.fileList"
                                          name="file"
                                          accept=".rar, .txt, .sql, .zip"
                                          :multiple="true"
                                          :action="`${COMMON_URI}/common/upload`"
                                          :headers="{ 'Authorization': 'Bearer ' + token }"
                                          @reject="rejectFormat"
                                          @change="fileChange"
                                          :max-count="1"
                                    >
                                          <p class="ant-upload-text">上传SQL文件</p>
                                          <p class="ant-upload-hint">仅支持zip/rar/text/sql后缀名的文件</p>
                                    </a-upload-dragger>
                              </a-form-item>
                        </a-form>
                        <a-form-item>
                              <a-button block @click="postOrder">提交</a-button>
                        </a-form-item>
                  </a-card>
            </a-col>
      </a-row>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { Request, Timeline } from "@/apis/fetchSchema";
import { AxiosResponse } from 'axios';
import { Res, COMMON_URI } from '@/config/request';
import { RespFetchSource } from '@/apis/listAppApis';
import { useStore } from '@/store';
import { message } from 'ant-design-vue';
import { Request as Post } from '@/apis/orderPostApis';
import FetchMixins from '@/mixins/fetch'
import router from '@/router';

const store = useStore()

const request = new Request

const post = new Post

const onlyAudit = reactive({
      source_id: "",
      fileList: [],
      file: "",
      type: 2,
      relevant: [] as any
})

const { orderProfileArch } = FetchMixins()

const token = store.state.user.account.token

const list = reactive({
      source: [] as any[]
})

const rejectFormat = (vl: any) => {
      message.error("仅支持zip/rar/text/sql后缀名的文件")
}

const fileChange = (fn: any) => {
      fn.file.status === "done" ? onlyAudit.file = fn.file.xhr.responseText : ""
}

const postOrder = () => {
      orderProfileArch.timeline.forEach((item) => {
            onlyAudit.relevant = onlyAudit.relevant.concat(item.auditor)
      })
      post.Post(onlyAudit as any)

}

const timeline = () => {
      request.TimeLine(onlyAudit.source_id).then((res: AxiosResponse<Res<Timeline[]>>) => {
            res.data.code === 5555 ? null : orderProfileArch.timeline = res.data.payload
      })
}

onMounted(() => {
      request.Source("ddl").then((res: AxiosResponse<Res<RespFetchSource[]>>) => {
            list.source = res.data.payload
      })


})

</script>