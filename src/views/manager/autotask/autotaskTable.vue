<template>
      <a-row>
            <a-col :span="24">
                  <a-form layout="inline">
                        <a-form-item>
                              <a-button type="primary" @click="p.newTask()">{{ $t("auto.create") }}</a-button>
                        </a-form-item>
                        <a-form-item>
                              <a-input-search
                                    :placeholder="$t('auto.search.tips')"
                                    enter-button
                                    allowClear
                                    v-model:value="expr.find.text"
                                    @search="currentPage"
                              />
                        </a-form-item>
                  </a-form>
            </a-col>
      </a-row>

      <br />
      <a-table :columns="col" :dataSource="tData" :pagination="false" rowKey="id" bordered>
            <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'action'">
                        <a-space>
                              <a-button
                                    ghost
                                    size="small"
                                    @click="p.editTask(record)"
                              >{{ $t('common.edit') }}</a-button>
                              <a-popconfirm
                                    :title="$t('auto.delete.tips')"
                                    @confirm="request.Delete(record.task_id).then(() => currentPage())"
                              >
                                    <a-button ghost size="small" danger>{{ $t('common.delete') }}</a-button>
                              </a-popconfirm>
                        </a-space>
                  </template>
                  <template
                        v-if="column.dataIndex === 'tp'"
                  >{{ taskTp.filter(item => item.v === text)[0].title }}</template>
                  <template v-if="column.dataIndex === 'status'">
                        <a-switch
                              v-model:checked="record.status"
                              :checkedValue="1"
                              :unCheckedValue="0"
                              @change="() => request.Post('active', record)"
                        ></a-switch>
                  </template>
            </template>
      </a-table>
      <br />
      <a-pagination
            :total="pagination.pageCount"
            :page-size.sync="pagination.pageSize"
            :show-total="(total) => $t('common.count', { count: total })"
            v-model:current="expr.page"
            @change="currentPage"
      />
      <AutotaskModal ref="p" @success="currentPage"></AutotaskModal>
</template>

<script lang="ts" setup>

import { onMounted, reactive, ref } from "vue"
import CommonMixins from "@/mixins/common"
import { AutoTaskExpr, AutoTask, AutoTaskParams, AutoTaskResp, Request } from "@/apis/autotask"
import { AxiosResponse } from "axios"
import { Res } from "@/config/request"
import AutotaskModal from "./autotaskModal.vue"
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const p = ref()

const col = [
      {
            title: t('common.table.name'),
            dataIndex: 'name',
      },
      {
            title: t('common.table.type'),
            dataIndex: 'tp',
      },
      {
            title: t('common.table.env'),
            dataIndex: 'idc',
      },
      {
            title: t('common.table.source'),
            dataIndex: 'source',
      },
      {
            title: t('common.table.schema'),
            dataIndex: 'data_base',
      },
      {
            title: t('common.table.table'),
            dataIndex: 'table',
      },
      {
            title: t('common.table.max'),
            dataIndex: 'affect_rows',
      },
      {
            title: t('common.table.state'),
            dataIndex: 'status',
      },
      {
            title: t('common.action'),
            dataIndex: 'action',
      },
]

const tData = ref([] as AutoTask[])

const { pagination, taskTp } = CommonMixins()

const request = new Request

const expr = reactive<AutoTaskParams>({
      find: {} as AutoTaskExpr,
      page: 1
})

const currentPage = () => {
      request.List(expr).then((res: AxiosResponse<Res<AutoTaskResp>>) => {
            tData.value = res.data.payload.data
            pagination.pageCount = res.data.payload.page
      })
}

onMounted(() => {
      currentPage()
})


</script>