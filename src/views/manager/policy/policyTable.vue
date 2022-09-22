<template>
  <a-row>
    <a-col :span="24">
      <a-form layout="inline">
        <a-form-item>
          <a-button
            type="primary"
            @click="
              () => {
                title = `${$t('common.new') + $t('common.policy.group')}`;
                p.newPolicy();
              }
            "
          >
            {{ $t('common.new') }}{{ $t('common.policy.group') }}
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-input-search
            :placeholder="$t('common.search') + ' ' + $t('common.policy.group')"
            enter-button
            allow-clear
            @search="onSearch"
          />
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>

  <br />
  <c-table ref="tbl" :tbl-ref="tblRef">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <a-space size="small">
          <a-button
            type="primary"
            size="small"
            ghost
            @click="
              () => {
                title = `${$t('common.edit') + $t('common.policy.group')}`;
                p.editPolicy(record);
              }
            "
          >
            {{ $t('common.profile') }}
          </a-button>
          <a-popconfirm
            title="确认要删除该权限组吗?"
            @confirm="request.Drop(record.group_id).then(() => tbl.manual())"
          >
            <a-button type="primary" size="small" danger ghost
              >{{ $t('common.delete') }}
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </template>
  </c-table>
  <PolicyModal ref="p" :title="title" @success="tbl.manual()"></PolicyModal>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import PolicyModal from './policyModal.vue';
  import {
    PolicyParams,
    PolicyExpr,
    Policy,
    PolicyResp,
    Request,
  } from '@/apis/policy';
  import { AxiosResponse } from 'axios';
  import { Res } from '@/config/request';
  import { tableRef } from '@/components/table';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const tblRef = reactive<tableRef>({
    col: [
      {
        title: t('common.policy.group') + t('common.table.name'),
        dataIndex: 'name',
      },
      { title: t('common.action'), dataIndex: 'action' },
    ],
    data: [] as Policy[],
    pageCount: 0,
    expr: {
      text: '',
    } as PolicyExpr,
    fn: (expr: PolicyParams) => {
      request.List(expr).then((res: AxiosResponse<Res<PolicyResp>>) => {
        tblRef.data = res.data.payload.data;
        tblRef.pageCount = res.data.payload.page;
      });
    },
  });

  const p = ref();

  const tbl = ref();

  const title = ref(`${t('common.new') + t('common.policy.group')}`);

  const request = new Request();

  const onSearch = (vl: string) => {
    tblRef.expr.text = vl;
    tbl.value.manual();
  };
</script>
