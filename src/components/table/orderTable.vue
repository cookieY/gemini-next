<template>
  <div ref="container">
    <a-card>
      <order-table-search
        ref="search"
        @search="
          (exp) => {
            tblRef.expr = exp;
            tbl.manual();
          }
        "
      >
      </order-table-search>
      <c-table ref="tbl" :tbl-ref="tblRef" :size="props.size">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'type'">
            <span>{{ text === 0 ? 'DDL' : 'DML' }}</span>
          </template>
          <template v-if="column.dataIndex === 'assigned'">
            <a-tag v-for="i in text.split(',')" :key="i">{{ i }}</a-tag>
          </template>
          <template v-if="column.dataIndex === 'delay'">{{
            text === 'none' ? $t('order.table.delay') : text
          }}</template>
          <template v-if="column.dataIndex === 'status'">
            <state-tags :state="text"></state-tags>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-button type="primary" size="small" @click="profile(record)"
              >{{ $t('common.profile') }}
            </a-button>
          </template>
        </template>
      </c-table>
    </a-card>
    <Profile :visible="visible" :width="width" @close="onClose" />
  </div>
</template>

<script lang="ts" setup>
  import StateTags from './stateTags.vue';
  import OrderTableSearch from './orderTableSearch.vue';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { OrderExpr, OrderParams, checkUri } from '@/apis/orderPostApis';
  import { OrderTableData } from '@/types';
  import { useStore } from '@/store';
  import { useI18n } from 'vue-i18n';
  import { tableRef } from '.';
  import { useWebSocket, useElementSize } from '@vueuse/core';
  import { checkSchema } from '@/lib';
  import Profile from '@/components/orderProfile/index.vue';
  import Container from '@antv/g-base/lib/abstract/container';

  interface propsAttr {
    size?: string;
  }

  const props = withDefaults(defineProps<propsAttr>(), {
    size: 'default',
  });

  const search = ref();

  const { t } = useI18n();

  const isAudit = ref('');

  const route = useRoute();

  const visible = ref<boolean>(false);

  const store = useStore();

  const tbl = ref();

  const container = ref();

  const { width } = useElementSize(container);

  const tblRef = reactive<tableRef>({
    col: [
      {
        title: t('common.table.work_id'),
        dataIndex: 'work_id',
        width: 200,
      },
      {
        title: t('common.table.remark'),
        dataIndex: 'text',
        ellipsis: true,
      },
      {
        title: t('common.table.type'),
        dataIndex: 'type',
      },
      {
        title: t('common.table.post.time'),
        dataIndex: 'date',
      },
      {
        title: t('common.table.post.user'),
        dataIndex: 'username',
      },
      {
        title: t('common.table.post.real_name'),
        dataIndex: 'real_name',
      },
      {
        title: t('order.profile.timing'),
        dataIndex: 'delay',
      },
      {
        title: t('order.profile.auditor'),
        dataIndex: 'assigned',
      },
      {
        title: t('common.table.state'),
        dataIndex: 'status',
      },
      {
        title: t('common.action'),
        dataIndex: 'action',
        width: 200,
      },
    ],
    data: [] as OrderTableData[],
    pageCount: 0,
    defaultPageSize: 20,
    expr: {
      status: 7,
      type: 2,
      text: '',
      username: '',
    } as OrderExpr,
    isloop: true,
    websocket: useWebSocket(
      `${checkSchema()}${checkUri(route.params.tp as string)}`,
      {
        autoReconnect: {
          retries: 3,
        },
        protocols: [store.state.user.account.token],
        onMessage: (e, event) => {
          let payload = JSON.parse(event.data);
          tblRef.data = payload.payload.data;
          tblRef.pageCount = payload.payload.page;
        },
      }
    ),
    fn: (expr: OrderParams) => {
      tblRef.websocket?.send(JSON.stringify(expr));
    },
  });

  const onClose = () => {
    visible.value = false;
  };

  const profile = (record: OrderTableData) => {
    store.commit('order/ORDER_STORE', record);
    visible.value = true;
    //     if (route.params.tp === 'audit') {
    //       router.push({ path: '/server/order/audit/profile' });
    //     } else if (route.params.tp === 'common') {
    //       router.push({ path: '/server/order/common/profile' });
    //     } else {
    //       router.push({ path: '/server/order/record/profile' });
    //     }
  };

  onBeforeRouteUpdate((to) => {
    isAudit.value = to.params.tp as string;
    tbl.value.manual();
  });
</script>
