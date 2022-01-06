<template>
      <a-row>
            <a-col :span="5">
                  <Tree></Tree>
            </a-col>
            <a-col :span="18" :offset="1">
                  <a-tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit">
                        <a-tab-pane
                              v-for="pane in panes"
                              :key="pane.key"
                              :tab="pane.title"
                              :closable="pane.closable"
                        >
                              <Input :id="pane.title" />
                        </a-tab-pane>
                  </a-tabs>
            </a-col>
      </a-row>
</template>

<script lang="ts" setup>
import Tree from "./tree.vue"
import Input from "./input.vue"
import { ref } from "vue"

const panes = ref([{ title: 'Untitled 1', key: '1', closable: true }])

const activeKey = ref("1")

const newTabIndex = ref(1);

const onEdit = (targetKey: string | MouseEvent, action: string) => {
      if (action === 'add') {
            add();
      }
}

const add = () => {
      activeKey.value = `${++newTabIndex.value}`;
      panes.value.push({ title: `Untitled${activeKey.value}`, key: `Untitled${activeKey.value}`, closable: true });
};
</script>