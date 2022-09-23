<template>
  <a-page-header
    :title="$t('order.profile.work_id', { id: order.work_id })"
    :ghost="false"
    @back="() => $router.go(-1)"
  >
    <template #extra>
      <template v-if="order.status === 1">
        <a-button key="2" danger ghost @click="() => queryReject">{{
          $t('order.reject')
        }}</a-button>
        <a-button key="1" type="primary" @click="() => queryAgree">{{
          $t('order.agree')
        }}</a-button>
      </template>
    </template>
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="16">
        <a-descriptions :column="2">
          <a-descriptions-item :label="$t('query.profile.username')"
            >{{ order.username }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('query.profile.realname')"
            >{{ order.real_name }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('query.profile.export')">{{
            order.export === 1 ? $t('common.yes') : $t('common.no')
          }}</a-descriptions-item>
          <a-descriptions-item :label="$t('query.profile.date')"
            >{{ order.date }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('query.profile.text')">
            <pre>{{ order.text }}</pre>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('query.profile.approval')"
            >{{ order.approval_time }}
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
      <a-col :span="8">
        <a-progress
          :percent="100"
          :stroke-width="5"
          :width="150"
          :stroke-color="StateQueryUsage(order.status).color"
          type="circle"
          style="position: relative"
        >
          <template #format>
            <span class="state_color">{{
              StateQueryUsage(order.status).title
            }}</span>
          </template>
        </a-progress>
      </a-col>
    </a-row>
    <a-tabs>
      <a-tab-pane key="1" :tab="$t('order.profile.profile')">
        <a-table
          bordered
          :columns="col"
          :data-source="tData"
          size="small"
          :pagination="false"
        ></a-table>
        <br />
        <a-pagination
          v-model:page-size="pagination.pageSize"
          v-model:current="page"
          :total="pagination.pageCount"
          :show-total="(total:number) => `共 ${total} 条`"
          @change="currentPage"
        />
      </a-tab-pane>
    </a-tabs>
  </a-page-header>
</template>

<script lang="ts" setup>
  import {
    queryAgreeOrder,
    queryProfile,
    queryRejectOrder,
    Request,
  } from '@/apis/query';
  import { onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import CommonMixins from '@/mixins/common';
  import { AxiosResponse } from 'axios';
  import { Res } from '@/config/request';
  import { StateQueryUsage } from '@/lib';

  interface QueryRef {
    work_id: string;
    username: string;
    date: string;
    text: string;
    assigned: string;
    real_name: string;
    export: number;
    status: number;
    approval_time: string;
  }

  const { t } = useI18n();

  const query = new Request();

  const { pagination } = CommonMixins();

  const col = [
    {
      title: 'SQL',
      dataIndex: 'sql',
    },
    {
      title: t('common.table.source'),
      dataIndex: 'source',
    },
    {
      title: t('common.table.schema'),
      dataIndex: 'schema',
    },
    {
      title: t('common.table.time'),
      dataIndex: 'time',
    },
    {
      title: t('common.table.ex_time'),
      dataIndex: 'ex_time',
    },
  ];

  const tData = ref<QueryRef[]>([]);

  const route = useRoute();

  const router = useRouter();

  const page = ref(1);

  const order = ref<QueryRef>({} as QueryRef);

  const queryAgree = async () => {
    await queryAgreeOrder(order.value.work_id);
    router.go(-1);
  };

  const queryReject = async () => {
    await queryRejectOrder(order.value.work_id);
    router.go(-1);
  };

  const currentPage = async (page: number) => {
    const { data } = await queryProfile(order.value.work_id, page);
    tData.value = data.payload.data;
    pagination.pageCount = data.payload.page;
  };

  onMounted(() => {
    order.value = JSON.parse(route.query.order as string);
    currentPage(page.value);
  });
</script>
