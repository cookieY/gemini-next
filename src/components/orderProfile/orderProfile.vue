<template>
  <a-spin :spinning="spinning">
    <a-page-header
      :title="$t('order.profile.work_id', { id: order.work_id })"
      :ghost="false"
    >
      <template #extra>
        <template
          v-if="
            route.params.tp === 'audit' && isCurrent > -1 && order.status === 2
          "
        >
          <a-button key="2" danger ghost @click="r.turnState()">{{
            $t('order.reject')
          }}</a-button>
          <a-popconfirm
            :title="$t('order.agree.tips')"
            :visible="condition"
            placement="bottomLeft"
            @confirm="next"
            @visible-change="handleVisibleChange"
          >
            <a-button key="1" type="primary" :disabled="enabled">{{
              $t('order.agree')
            }}</a-button>
          </a-popconfirm>
        </template>
        <template v-if="route.params.tp === 'common' && order.status === 2">
          <a-popconfirm
            :title="$t('order.undo.tips')"
            placement="bottomLeft"
            @confirm="undoNext"
          >
            <a-button key="1" danger ghost>{{ $t('order.undo') }}</a-button>
          </a-popconfirm>
        </template>
      </template>

      <a-row type="flex" justify="center" align="middle">
        <a-col :span="16">
          <a-descriptions :column="2">
            <a-descriptions-item :label="$t('common.table.type')">{{
              order.type === 0 ? 'DDL' : 'DML'
            }}</a-descriptions-item>
            <a-descriptions-item :label="$t('common.table.env')"
              >{{ order.idc }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('common.table.source')"
              >{{ order.source }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('common.table.schema')"
              >{{ order.data_base }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('order.profile.roll')">{{
              order.backup ? $t('common.yes') : $t('common.no')
            }}</a-descriptions-item>
            <a-descriptions-item :label="$t('order.profile.timing')">{{
              order.delay === 'none' ? $t('order.table.delay') : order.delay
            }}</a-descriptions-item>
            <a-descriptions-item :label="$t('order.profile.auditor')">
              <template v-for="i in order.assigned.split(',')" :key="i">
                <a-tag v-if="i !== $t('flow.applicant')" color="#408B9B">{{
                  i
                }}</a-tag>
              </template>
            </a-descriptions-item>
            <a-descriptions-item :label="$t('common.table.remark')">
              <a-typography-paragraph
                :style="ellipsis ? { width: '250px' } : {}"
                :ellipsis="ellipsis ? { tooltip: order.text } : false"
                :content="order.text"
              >
              </a-typography-paragraph>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="8">
          <a-progress
            :percent="
              StateUsage(order.status).isEnd
                ? 100
                : (order.current_step / orderProfileArch.timeline.length) * 100
            "
            :stroke-width="5"
            :width="150"
            :stroke-color="StateUsage(order.status).color"
            type="circle"
            style="position: relative"
          >
            <template #format>
              <span class="state_color">{{
                StateUsage(order.status).title
              }}</span>
            </template>
          </a-progress>
        </a-col>
      </a-row>

      <template #footer>
        <a-tabs size="small" default-active-key="1">
          <a-tab-pane key="1" :tab="$t('order.profile.profile')">
            <br />
            <a-row :gutter="24">
              <a-col :xs="24" :sm="5">
                <a-card
                  style="height: 300px; overflow: auto"
                  :title="$t('order.profile.progress')"
                  size="small"
                >
                  <Step
                    :current="order.current_step"
                    :step="orderProfileArch.timeline"
                    :status="order.status"
                  >
                  </Step>
                </a-card>
                <br />
                <a-alert message="Info" type="info" show-icon>
                  <template #description>{{
                    $t('order.profile.tips')
                  }}</template>
                </a-alert>
              </a-col>
              <a-col :xs="24" :sm="19">
                <a-spin :spinning="spin" :delay="100">
                  <a-card
                    title="SQL内容"
                    size="small"
                    :body-style="{ padding: 0 }"
                  >
                    <a-space direction="vertical">
                      <editor
                        ref="orderEditor"
                        readonly
                        container-id="orderEditor"
                        @get-values="testResults"
                      ></editor>
                      <a-table :columns="col" size="small" :data-source="tData">
                      </a-table>
                    </a-space>
                  </a-card>
                  <br />
                </a-spin>
              </a-col>
            </a-row>
          </a-tab-pane>

          <a-tab-pane key="2" :tab="$t('order.profile.comment')" force-render>
            <br />
            <a-card size="small">
              <Comment :work-id="order.work_id"></Comment>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="3" :tab="$t('order.profile.results')">
            <Results :work-id="order.work_id" :status="order.status"></Results>
          </a-tab-pane>

          <a-tab-pane
            v-if="order.type === 0"
            key="4"
            :tab="$t('order.profile.osc')"
          >
            <br />
            <a-card size="small">
              <OSC :work-id="order.work_id"></OSC>
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </template>
    </a-page-header>
  </a-spin>

  <RejectModal
    ref="r"
    :work-id="order.work_id"
    @spin="() => (spinning = !spinning)"
  ></RejectModal>
</template>

<script lang="ts" setup>
  import RejectModal from './rejectModal.vue';
  import Comment from './comment.vue';
  import Results from './results.vue';
  import Step from '@/components/steps/steps.vue';
  import router from '@/router';
  import OSC from './osc.vue';
  import { useStore } from '@/store';
  import { computed, ref, onMounted } from 'vue';
  import FetchMixins from '@/mixins/fetch';
  import { checkSchema, StateUsage } from '@/lib';
  import {
    changeOrderStateUndo,
    checkSQLS,
    getNextOrderState,
    SQLTestParams,
  } from '@/apis/orderPostApis';
  import { SQLTesting } from '@/types';
  import { useRoute } from 'vue-router';
  import JunoMixin from '@/mixins/juno';
  import { debounce } from 'lodash-es';
  import { queryTimeline } from '@/apis/source';
  import { useWebSocket } from '@vueuse/core';
  import { COMMON_URI } from '@/config/request';
  import editor from '@/components/editor/editor.vue';

  interface stepUsage {
    action: string;
    time: string;
    username: string;
    id: number;
  }

  const spinning = ref(false);

  const { col } = JunoMixin();

  const ellipsis = ref(true);

  const orderEditor = ref();

  const r = ref();

  const sqls = ref('');

  const store = useStore();

  const tData = ref();

  const enabled = ref(store.state.order.order.type !== 2);

  const spin = ref(false);

  const route = useRoute();

  const order = computed(() => store.state.order.order);

  const { fetchProfileSQL, orderProfileArch } = FetchMixins();

  const isCurrent = ref(-1);

  const condition = ref(false);

  const handleVisibleChange = (bool: boolean) => {
    if (enabled.value) {
      condition.value = false;
      return;
    }
    bool ? (condition.value = true) : (condition.value = false);
  };

  const checkSQL = async (sql: string) => {
    spin.value = !spin.value;

    const { data } = await checkSQLS({
      source_id: order.value.source_id as string,
      kind: order.value.type,
      data_base: order.value.data_base,
      sql: sql,
      work_id: order.value.work_id,
    } as SQLTestParams);
    let counter = 0;
    tData.value = data.payload;
    tData.value.forEach((item: SQLTesting) => {
      if (item.level !== 0) {
        counter++;
      }
    });
    enabled.value = counter !== 0;
    spin.value = !spin.value;
  };

  const testResults = debounce(() => {
    checkSQL(sqls.value);
  }, 200);

  const next = async () => {
    spinning.value = !spinning.value;
    await getNextOrderState({
      work_id: order.value.work_id as string,
      flag: order.value.current_step as number,
      tp: 'agree',
      source_id: order.value.source_id,
    });

    spinning.value = !spinning.value;
  };

  const undoNext = async () => {
    spinning.value = !spinning.value;
    await changeOrderStateUndo({
      work_id: order.value.work_id as string,
      tp: 'undo',
    });
    spinning.value = !spinning.value;
  };

  const fetchState = async () => {
    useWebSocket(
      `${checkSchema()}${COMMON_URI}/fetch/order_state?work_id=${
        order.value.work_id
      }`,
      {
        autoReconnect: {
          retries: 3,
        },
        heartbeat: {
          interval: 5000,
          message: 'ping',
        },
        protocols: [store.state.user.account.token],
        onMessage: (e, event) => {
          store.commit('order/SET_ORDER_STATUS', parseInt(event.data, 10));
        },
      }
    );
  };

  onMounted(async () => {
    fetchState();
    const { data } = await queryTimeline(
      order.value.source_id as string,
      order.value.work_id as string
    );
    if (data.code === 5555) {
      router.go(-1);
    } else {
      orderProfileArch.timeline = data.payload;
      if (orderProfileArch.timeline[order.value.current_step] !== undefined) {
        let currentStep = orderProfileArch.timeline[order.value.current_step];
        isCurrent.value = currentStep.auditor.indexOf(
          store.state.user.account.user
        );
      }
    }

    //     const step = await fetchStepUsage(order.value.work_id);
    //     usage.value = step.data.payload;
    const sql = await fetchProfileSQL(order.value.work_id);
    orderEditor.value.ChangeEditorText(sql.data.payload.sqls);

    sqls.value = sql.data.payload.sqls;
    store.commit('common/ORDER_SET_SQL', sql.data.payload.sqls);
  });
</script>
