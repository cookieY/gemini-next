<template>
  <a-spin :spinning="spinning">
    <a-card ref="colsize">
      <a-row>
        <a-col :span="5">
          <a-space>
            <ArrowLeftOutlined @click="$router.go(-1)" />
            <a-button size="small" type="primary" @click="() => (hide = !hide)"
              >{{ $t('common.hide') }}/{{ $t('common.visible') }}</a-button
            >
            <a-button size="small" @click="m.turnState()"
              >{{ $t('common.new') }}{{ $t('common.clip') }}</a-button
            >
            <a-button v-if="!isOnly" size="small" @click="ss.turnState()">{{
              $t('query.query.switch')
            }}</a-button>
            <a-popconfirm :title="$t('query.query.end.tips')" @confirm="undo">
              <a-button size="small">{{ $t('query.query.end') }}</a-button>
            </a-popconfirm>
          </a-space>
        </a-col>
      </a-row>
    </a-card>
    <br />
    <a-row :gutter="[16, 16]" style="margin-top: 1%">
      <a-col :span="hide ? 0 : 4">
        <a-card ref="leftSize" size="small">
          <a-tabs v-model:activeKey="tool">
            <a-tab-pane key="tree" :tab="$t('common.table.schema')">
              <Tree @show-table-ref="showTableRef"></Tree>
            </a-tab-pane>
            <a-tab-pane key="history" :tab="$t('common.history')">
              <History></History>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="hide ? 24 : 20">
        <div :style="{ width: width - leftz - 15 + 'px' }">
          <a-card size="small">
            <a-tabs v-model:activeKey="feat">
              <a-tab-pane key="edit" :tab="$t('query.query')">
                <a-tabs
                  v-model:activeKey="activeKey"
                  type="editable-card"
                  @edit="onEdit"
                >
                  <a-tab-pane
                    v-for="pane in panes"
                    :key="pane.key"
                    :tab="pane.title"
                    :closable="pane.closable"
                  >
                    <div class="editor_border">
                      <Input :id="pane.title" @on-change="fetchFields" />
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </a-tab-pane>
              <a-tab-pane key="table" :tab="$t('query.table')" force-render>
                <Table id="tblInfo" ref="tbl" :height="800"></Table>
              </a-tab-pane>
            </a-tabs>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </a-spin>
  <Clip></Clip>
  <Modal ref="m"></Modal>
  <Switch ref="ss"></Switch>
</template>

<script lang="ts" setup>
  import History from './history.vue';
  import Tree from './tree.vue';
  import Input from './input.vue';
  import Table from './table.vue';
  import Clip from './clip.vue';
  import Modal from './modal.vue';
  import Switch from './switch.vue';
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import { useStore } from '@/store';
  import { ArrowLeftOutlined } from '@ant-design/icons-vue';
  import { checkIsQuery, queryUndoOrder } from '@/apis/query';
  import { queryHighlight } from '@/apis/source';
  import router from '@/router';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import * as monaco from 'monaco-editor';
  import { createSQLToken } from '@/components/editor/impl';
  import { useElementSize, useWebSocket } from '@vueuse/core';
  import { checkSchema } from '@/lib';
  import { COMMON_URI } from '@/config/request';
  import { message } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';

  const panes = ref([{ title: 'Untitled 1', key: '1', closable: false }]);

  const activeKey = ref();

  const colsize = ref();

  const leftSize = ref();

  const leftz = useElementSize(leftSize).width;

  const { t } = useI18n();

  const { width } = useElementSize(colsize);

  const hide = ref(false);

  const newTabIndex = ref(1);

  const feat = ref('edit');

  const tool = ref('tree');

  const tbl = ref();

  const isOnly = ref(true);

  const m = ref();

  const ss = ref();

  const store = useStore();

  const route = useRoute();

  const nonFields = ref([] as any[]);

  let monaco_editor: any = null;

  const spinning = computed(() => store.state.common.spinning);

  const onEdit = (targetKey: string, action: string) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const showTableRef = (vl: any) => {
    tbl.value.runResults(vl.schema, vl.sql);
    feat.value = 'table';
  };

  const add = () => {
    activeKey.value = `Untitled${++newTabIndex.value}`;
    panes.value.push({
      title: activeKey.value,
      key: activeKey.value,
      closable: true,
    });
  };

  const remove = (targetKey: string) => {
    let lastIndex = 0;
    panes.value.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    panes.value = panes.value.filter((pane) => pane.key !== targetKey);
    if (panes.value.length && activeKey.value === targetKey) {
      if (lastIndex >= 0) {
        activeKey.value = panes.value[lastIndex].key;
      } else {
        activeKey.value = panes.value[0].key;
      }
    }
  };

  const undo = async () => {
    await queryUndoOrder();
    router.go(-1);
  };

  const initQuery = (source_id: string) => {
    let sock = useWebSocket(
      `${checkSchema()}${COMMON_URI}/query/results?source_id=${source_id}`,
      {
        autoReconnect: {
          retries: 3,
          delay: 1000,
          onFailed() {
            message.error(t('query.ws.error'));
          },
        },
        onDisconnected: () => {
          store.commit('common/SET_DISABLED_SPINNING');
        },
        heartbeat: {
          interval: 5000,
          message: 'ping',
        },
        protocols: [store.state.user.account.token],
      }
    );

    store.commit('common/QUERY_CONN', sock);
  };

  const registerCompletionItemProvider = async (
    source_id: string,
    key: string,
    is_fields: boolean,
    source_fields: any[]
  ) => {
    const { data } = await queryHighlight(source_id, is_fields, key);
    monaco_editor = monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (
        model,
        position
      ): monaco.languages.ProviderResult<monaco.languages.CompletionList> => {
        let word = model.getWordUntilPosition(position);
        let range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        return {
          suggestions: createSQLToken(range, [
            ...data.payload,
            ...source_fields,
          ]),
        };
      },
      triggerCharacters: ['.'],
    });
    !is_fields ? (nonFields.value = data.payload) : null;
  };

  const fetchFields = async () => {
    monaco_editor !== null ? monaco_editor.dispose() : null;
    registerCompletionItemProvider(
      route.query.source_id as string,
      store.state.common.schema,
      true,
      nonFields.value
    );
  };

  const initial = async (source_id: string) => {
    registerCompletionItemProvider(source_id, source_id, false, []);
  };

  onBeforeRouteUpdate((to) => {
    monaco_editor.dispose();
    initial(to.query.source_id as string);
    initQuery(to.query.source_id as string);
  });

  onMounted(async () => {
    const { data } = await checkIsQuery();
    isOnly.value = data.payload.status;
    initQuery(route.query.source_id as string);
    initial(route.query.source_id as string);
  });

  onUnmounted(() => {
    monaco_editor.dispose();
  });
</script>
