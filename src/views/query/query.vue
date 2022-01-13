<template>
      <a-spin :spinning="spinning">
            <a-row>
                  <a-col :span="5">
                        <Tree @showTableRef="showTableRef"></Tree>
                  </a-col>
                  <a-col :span="18" :offset="1">
                        <a-tabs v-model:activeKey="feat">
                              <a-tab-pane key="edit" tab="查询">
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
                              <a-tab-pane key="table" tab="表" forceRender>
                                    <Table ref="tbl" :height="800"></Table>
                              </a-tab-pane>
                        </a-tabs>
                  </a-col>
            </a-row>
      </a-spin>
</template>

<script lang="ts" setup>
import Tree from "./tree.vue"
import Input from "./input.vue"
import Table from "./table.vue"
import { computed, ref } from "vue"
import { useStore } from "@/store"

const panes = ref([{ title: 'Untitled 1', key: '1', closable: false }])

const activeKey = ref()

const newTabIndex = ref(1);

const feat = ref("edit")

const tbl = ref()

const store = useStore()

const spinning = computed(() => store.state.common.spinning)

const onEdit = (targetKey: string, action: string) => {
      if (action === 'add') {
            add();
      } else {
            remove(targetKey);
      }
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