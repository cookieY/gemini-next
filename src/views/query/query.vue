<template>
      <a-spin :spinning="spinning">
            <a-row>
                  <a-col :span="5">
                        <a-space>
                              <a-button
                                    size="small"
                                    @click="() => hide = !hide"
                                    type="primary"
                              >{{ $t('common.hide') }}/{{ $t('common.visible') }}</a-button>
                              <a-button
                                    size="small"
                                    @click="m.turnState()"
                              >{{ $t('common.new') }}{{ $t('common.clip') }}</a-button>
                        </a-space>
                  </a-col>
            </a-row>
            <br />
            <a-row>
                  <a-col :span="hide ? 0 : 5">
                        <Tree @showTableRef="showTableRef"></Tree>
                  </a-col>
                  <a-col :span="hide ? 24 : 18" :offset="hide ? 0 : 1">
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
                                                <Input :id="pane.title" />
                                          </a-tab-pane>
                                    </a-tabs>
                              </a-tab-pane>
                              <a-tab-pane key="table" :tab="$t('query.table')" forceRender>
                                    <Table ref="tbl" :height="800"></Table>
                              </a-tab-pane>
                        </a-tabs>
                  </a-col>
            </a-row>
            <Clip></Clip>
            <Modal ref="m"></Modal>
      </a-spin>
</template>

<script lang="ts" setup>
import Tree from "./tree.vue"
import Input from "./input.vue"
import Table from "./table.vue"
import Clip from "./clip.vue"
import Modal from "./modal.vue"
import { computed, onMounted, ref } from "vue"
import { useStore } from "@/store"

const panes = ref([{ title: 'Untitled 1', key: '1', closable: false }])

const activeKey = ref()

const hide = ref(false)

const newTabIndex = ref(1);

const feat = ref("edit")

const tbl = ref()

const m = ref()

const store = useStore()

const spinning = computed(() => store.state.common.spinning)

const onEdit = (targetKey: string, action: string) => {
      if (action === 'add') {
            add();
      } else {
            remove(targetKey);
      }
}

const paste = () => {
      console.log('ok')
}

const showTableRef = (vl: any) => {
      tbl.value.runResults(vl.source_id, vl.schema, vl.sql)
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
</script>