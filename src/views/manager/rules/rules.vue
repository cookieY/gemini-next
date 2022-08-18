<template>
      <PageHeader :title="$t('common.rule')" :subTitle="$t('common.rule.sub')"></PageHeader>
      <a-card>
            <a-row>
                  <a-col :span="19">
                        <a-input-search placeholder="input search text" enter-button @search="onSearch" />
                  </a-col>
                  <a-col :span="4" offset="1">
                        <a-button type="primary" @click="request.Post(engine)">{{ $t('common.save') }}</a-button>
                  </a-col>
            </a-row>
            <br />
            <a-table bordered :columns="col" :data-source="rules" :pagination="false">
                  <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'action'">
                              <a-switch v-if="record.tp === 0" v-model:checked="engine[record.name]"></a-switch>
                              <a-input-number v-if="record.tp === 1" v-model:value="engine[record.name]">
                              </a-input-number>
                              <a-input v-if="record.tp === 2" v-model:value="engine[record.name]"></a-input>
                              <a-textarea v-if="record.tp === 3" v-model:value="engine[record.name]" :rows="6">
                              </a-textarea>
                        </template>
                  </template>
            </a-table>
      </a-card>

      <a-back-top />
</template>

<script lang="ts" setup>

import PageHeader from '@/components/pageHeader/pageHeader.vue';
import { Rule, rule } from './rules';
import { onMounted, ref } from "vue"
import { AxiosResponse } from 'axios';
import { Request } from '@/apis/rules';
import { Res } from "@/config/request"
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const col = [
      {
            title: t('common.table.name'),
            dataIndex: 'name',
            width: 50
      },
      {
            title: t('common.table.type'),
            dataIndex: 'type',
            width: 50
      },
      {
            title: t('common.desc'),
            dataIndex: 'desc',
      },

      {
            title: t('common.action'),
            dataIndex: 'action',
            width: 300
      },
]

let engine = ref({})

let rules = ref<Rule[]>(rule)

const request = new Request

const onSearch = (vl: string) => {
      rules.value = rule.filter(item => item.desc.indexOf(vl) !== -1)
}

onMounted(() => {
      request.List().then((res: AxiosResponse<Res<any>>) => { engine.value = res.data.payload.audit_role })
})

</script>