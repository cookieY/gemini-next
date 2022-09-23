<template>
  <a-input-search
    v-model:value="searchValue"
    style="margin-bottom: 8px"
    :placeholder="$t('common.search')"
  />
  <a-spin :spinning="spinning">
    <a-tree
      v-model:expandedKey="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="gData"
      :height="700"
      style="overflow: auto"
      show-icon
      @expand="onLoadData"
    >
      <template #switcherIcon="{ dataRef }">
        <hdd-outlined v-if="dataRef.meta === 'Schema'" />
      </template>
      <template #title="{ title, meta, key: treeKey }">
        <a-dropdown :trigger="['contextmenu']">
          <template v-if="title !== undefined">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{
                title.substr(title.indexOf(searchValue) + searchValue.length)
              }}
            </span>
            <span v-else>{{ title }}</span>
          </template>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-if="meta === 'Table'"
                key="1"
                @click="showTableData(treeKey)"
              >
                {{ $t('query.show.table') }}</a-menu-item
              >
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>
  </a-spin>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { querySchemaList, queryTable } from '@/apis/query';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import { HddOutlined } from '@ant-design/icons-vue';
  import { useStore } from '@/store';
  import { TreeNodeProps } from 'ant-design-vue/lib/vc-tree';

  const emit = defineEmits(['showTableRef']);

  const route = useRoute();

  const searchValue = ref<string>('');

  const store = useStore();

  const expandedKeys = ref<string[]>([]);

  const autoExpandParent = ref<boolean>(false);

  const spinning = ref(false);

  const gData = ref<TreeNodeProps[]>([]);

  const schema = ref('');

  watch(searchValue, (value) => {
    let expanded: string[] = [];
    gData.value.forEach((item: any) => {
      if (item.children !== undefined) {
        if (item.children[0].key !== undefined) {
          item.children.forEach((el: any) => {
            if (el.title.indexOf(value) > -1) {
              if (expanded.indexOf(item.title) == -1) expanded.push(item.title);
            }
          });
        }
      }
    });
    expandedKeys.value = expanded;
    searchValue.value = value;
    autoExpandParent.value = false;
  });

  const onLoadData = async (keys: string, { expanded, node }: any) => {
    if (expanded) {
      if (node.dataRef.meta === 'Table') {
        return;
      }
      spin();
      const { data } = await queryTable(
        route.query.source_id as string,
        node.dataRef.title
      );
      gData.value.filter((item: any) => {
        if (item.key === node.dataRef.key) {
          item.children = data.payload.table;
        }
      });
      spin();
    }
  };

  const spin = () => {
    spinning.value = !spinning.value;
  };

  const showTableData = (key: string) => {
    emit('showTableRef', {
      source_id: store.state.common.queryInfo.source_id,
      schema: schema.value,
      sql: `select * from ${key}`,
    });
  };

  const initial = async (source_id: string) => {
    spin();
    const { data } = await querySchemaList(source_id);
    gData.value = data.payload;
    if (data.payload.length > 0) {
      store.commit('common/SET_SCHEMA_List', {
        schema: data.payload.map((item: { key: string }) => item.key),
        source: route.query.source as string,
        source_id: route.query.source_id as string,
      });
      store.commit('common/SET_SCHEMA', '');
      spin();
    }
  };

  onBeforeRouteUpdate((to) => {
    initial(to.query.source_id as string);
  });

  onMounted(() => {
    initial(route.query.source_id as string);
  });
</script>
