<template>
      <a-spin :spinning="spinning">
            <a-card>
                  <a-row>
                        <a-col :span="5">
                              <a-space>
                                    <ArrowLeftOutlined @click="$router.go(-1)" />
                                    <a-button size="small" @click="() => hide = !hide" type="primary">{{
                                                $t('common.hide')
                                    }}/{{ $t('common.visible') }}</a-button>
                                    <a-button size="small" @click="m.turnState()">{{ $t('common.new') }}{{
                                                $t('common.clip')
                                    }}</a-button>
                                    <a-button size="small" @click="ss.turnState()" v-if="!isOnly">{{
                                                $t('query.query.switch')
                                    }}</a-button>
                                    <a-popconfirm :title="$t('query.query.end.tips')" @confirm="undo">
                                          <a-button size="small">{{
                                                      $t('query.query.end')
                                          }}</a-button>
                                    </a-popconfirm>

                              </a-space>
                        </a-col>
                  </a-row>
            </a-card>
            <a-row :gutter="[16, 16]" style="margin-top: 1%;">
                  <a-col :span="hide ? 0 : 5">
                        <a-card size="small">
                              <a-tabs v-model:activeKey="tool">
                                    <a-tab-pane key="tree" :tab="$t('common.table.schema')">
                                          <Tree @showTableRef="showTableRef"></Tree>
                                    </a-tab-pane>
                                    <a-tab-pane key="history" :tab="$t('common.history')">
                                          <History></History>
                                    </a-tab-pane>
                              </a-tabs>
                        </a-card>
                  </a-col>
                  <a-col :span="hide ? 24 : 19">
                        <a-card size="small">
                              <a-tabs v-model:activeKey="feat">
                                    <a-tab-pane key="edit" :tab="$t('query.query')">
                                          <a-tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit">
                                                <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title"
                                                      :closable="pane.closable">
                                                      <div class="editor_border">
                                                            <Input :id="pane.title" />
                                                      </div>
                                                </a-tab-pane>
                                          </a-tabs>
                                    </a-tab-pane>
                                    <a-tab-pane key="table" :tab="$t('query.table')" forceRender>
                                          <Table ref="tbl" :height="800" id="tblInfo"></Table>
                                    </a-tab-pane>
                              </a-tabs>
                        </a-card>
                  </a-col>
            </a-row>

      </a-spin>
      <Clip></Clip>
      <Modal ref="m"></Modal>
      <Switch ref="ss"></Switch>
</template>

<script lang="ts" setup>
import History from "./history.vue"
import Tree from "./tree.vue"
import Input from "./input.vue"
import Table from "./table.vue"
import Clip from "./clip.vue"
import Modal from "./modal.vue"
import Switch from "./switch.vue"
import Socket from "@/socket"
import { computed, onMounted, onUnmounted, ref } from "vue"
import { useStore } from "@/store"
import { encode } from "@msgpack/msgpack";
import { ArrowLeftOutlined } from "@ant-design/icons-vue"
import { Request } from "@/apis/query"
import { Request as Query } from "@/apis/fetchSchema"
import router from "@/router"
import { AxiosResponse } from "axios"
import { Res } from "@/config/request"
import { onBeforeRouteUpdate, useRoute } from "vue-router"
import * as monaco from 'monaco-editor';
import { createSQLToken } from "@/components/editor/impl"

const panes = ref([{ title: 'Untitled 1', key: '1', closable: false }])

const activeKey = ref()

const hide = ref(false)

const newTabIndex = ref(1);

const feat = ref("edit")

const tool = ref("tree")

const query = new Query

const request = new Request

const tbl = ref()

const isOnly = ref(true)

const m = ref()

const ss = ref()

const store = useStore()

const route = useRoute()

const spinning = computed(() => store.state.common.spinning)

const onEdit = (targetKey: string, action: string) => {
      if (action === 'add') {
            add();
      } else {
            remove(targetKey);
      }
}

const showTableRef = (vl: any) => {
      tbl.value.runResults(vl.schema, vl.sql)
      feat.value = "table"
}

const add = () => {
      activeKey.value = `Untitled${++newTabIndex.value}`;
      panes.value.push({
            title: activeKey.value, key: activeKey.value, closable: true
      });
};

const remove = (targetKey: string) => {
      let lastIndex = 0;
      panes.value.forEach((pane, i) => {
            if (pane.key === targetKey) {
                  lastIndex = i - 1;
            }
      });
      panes.value = panes.value.filter(pane => pane.key !== targetKey);
      if (panes.value.length && activeKey.value === targetKey) {
            if (lastIndex >= 0) {
                  activeKey.value = panes.value[lastIndex].key;
            } else {
                  activeKey.value = panes.value[0].key;
            }
      }
}

const closeWS = () => {
      const encoded: Uint8Array = encode({ "type": 1 });
      store.state.common.sock?.send(encoded)
      store.state.common.sock.close()
}

const undo = () => {
      request.Undo().then(() => router.go(-1))
}

const initQuery = (source_id: string) => {
      const sock = new Socket(`/query/results?source_id=${source_id}`, store.state.user.account.token)
      sock.create()
      sock.msgping()
      sock.check()
      sock.msginit()
      store.commit("common/QUERY_CONN", sock)
}

const initial = (source_id: string) => {
      const highlight = store.state.highlight.highlight
      if (highlight[source_id as string] === undefined) {
            query.HighLight(source_id).then((res: AxiosResponse<Res<any>>) => {
                  store.commit("highlight/SAVE_HIGHLIGHT", { key: source_id, highlight: res.data.payload })
            })
      }
      monaco.languages.registerCompletionItemProvider('sql', {
            provideCompletionItems: (model, position): monaco.languages.ProviderResult<monaco.languages.CompletionList> => {
                  let word = model.getWordUntilPosition(position);
                  let range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                  };
                  return {
                        suggestions: createSQLToken(range, store.state.highlight.highlight[source_id])
                  }
            },
            triggerCharacters: ['.']

      });
}

onBeforeRouteUpdate((to) => {
      closeWS()
      initial(to.query.source_id as string)
      initQuery(to.query.source_id as string)
})

onMounted(() => {
      query.IsQuery().then((res: AxiosResponse<Res<any>>) => isOnly.value = res.data.payload.status)
      initQuery(route.query.source_id as string)
      initial(route.query.source_id as string)
})


onUnmounted(() => {
      closeWS()
})


</script>