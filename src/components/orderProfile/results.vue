<template>
  <a-form v-if="route.params.tp !== 'record'" layout="inline">
    <a-space>
      <template v-if="route.params.tp === 'audit' && status === 1">
        <a-popconfirm
          :title="$t('order.profile.results.roll.tips')"
          @confirm="submit"
        >
          <a-button>{{ $t('order.profile.results.commit.rollback') }}</a-button>
        </a-popconfirm>
      </template>
      <template
        v-else-if="
          route.params.tp === 'common' && (status === 0 || status === 4)
        "
      >
        <a-popconfirm
          :title="$t('order.profile.results.recommit.tips')"
          @confirm="recommit"
        >
          <a-button>{{ $t('order.profile.results.commit.recommit') }}</a-button>
        </a-popconfirm>
      </template>
    </a-space>
  </a-form>
  <br />
  <a-collapse v-model:activeKey="activeKey" accordion>
    <a-collapse-panel key="1" :header="$t('order.profile.results.result')">
      <c-table :tbl-ref="resultTable" size="small"></c-table>
    </a-collapse-panel>
    <a-collapse-panel key="2" :header="$t('order.profile.results.roll')">
      <c-table :tbl-ref="rollTable" is-all size="small"></c-table>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
  import { Request } from '@/apis/orderPostApis';
  import { onMounted, reactive, ref } from 'vue';
  import { AxiosResponse } from 'axios';
  import { Res } from '@/config/request';
  import { useStore } from '@/store';
  import { useRoute, useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { tableRef } from '../table';
  import { message } from 'ant-design-vue';

  const { t } = useI18n();

  const route = useRoute();

  const props = defineProps<{
    workId: string;
    status: number;
  }>();

  const activeKey = ref('1');

  const request = new Request();

  const resultTable = reactive<tableRef>({
    col: [
      {
        title: t('common.table.sql'),
        dataIndex: 'sql',
        ellipsis: true,
      },
      {
        title: t('common.table.result'),
        dataIndex: 'state',
      },
      {
        title: t('common.table.rows'),
        dataIndex: 'affect_row',
      },
      {
        title: t('common.table.time'),
        dataIndex: 'time',
      },
      {
        title: t('common.table.error'),
        dataIndex: 'error',
      },
    ],
    data: [],
    pageCount: 0,
    fn: ({ expr, current, pageSize }) => {
      request
        .Results(props.workId, { current: current, pageSize: pageSize })
        .then((res: AxiosResponse<Res<any>>) => {
          resultTable.data = res.data.payload.record;
          resultTable.pageCount = res.data.payload.count;
        });
    },
  });

  const rollTable = reactive<tableRef>({
    col: [
      {
        title: t('common.table.sql'),
        dataIndex: 'sql',
      },
    ],
    data: [],
    pageCount: 0,
  });

  const router = useRouter();

  const store = useStore();

  const currentRolling = (vl: number) => {
    request.Roll(props.workId, vl).then((res: AxiosResponse<Res<any>>) => {
      rollTable.data = res.data.payload.sql;
      rollTable.pageCount = res.data.payload.count;
    });
  };

  const submit = () => {
    const warpper = Object.assign({}, store.state.order.order);
    warpper.delay = 'none';
    warpper.sql = rollTable.data.map((item) => item.sql).join('\n');
    if (warpper.sql === '') {
      message.warning(t('order.roll.tips'));
      return;
    }
    request.Post(warpper as any).finally(() => router.go(-1));
  };

  const recommit = () => {
    router.push({
      name: 'apply/order',
      query: {
        type: store.state.order.order.type,
        idc: store.state.order.order.idc,
        source: store.state.order.order.source,
        source_id: store.state.order.order.source_id,
        remark: 'true',
      },
    });
  };

  onMounted(() => {
    currentRolling(1);
  });
</script>

<style></style>
