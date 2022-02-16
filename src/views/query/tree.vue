<template>
      <a-card>
            <template #title>
                  <a-space>
                        <ArrowLeftOutlined @click="$router.go(-1)" />
                        <span>数据列</span>
                  </a-space>
            </template>
            <a-input-search
                  v-model:value="searchValue"
                  style="margin-bottom: 8px"
                  placeholder="搜索"
            />
            <a-spin :spinning="spinning">
                  <a-tree
                        :expanded-keys="expandedKeys"
                        :auto-expand-parent="autoExpandParent"
                        :tree-data="gData"
                        :height="700"
                        @expand="onExpand"
                  >
                        <template #switcherIcon="{ dataRef, defaultIcon }">
                              <template v-if="dataRef.meta === 'Schema'">
                                    <hdd-outlined />
                              </template>
                              <template v-else-if="dataRef.meta === 'Table'">
                                    <table-outlined />
                              </template>
                              <template v-else>
                                    <CloudOutlined />
                              </template>
                        </template>

                        <template #title="{ title, meta, key: treeKey, }">
                              <a-dropdown :trigger="['contextmenu']">
                                    <template v-if="title !== undefined">
                                          <span v-if="title.indexOf(searchValue) > -1">
                                                {{ title.substr(0, title.indexOf(searchValue)) }}
                                                <span
                                                      style="color: #f50"
                                                >{{ searchValue }}</span>
                                                {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                                          </span>
                                          <span v-else>{{ title }}</span>
                                    </template>
                                    <template #overlay>
                                          <a-menu>
                                                <a-menu-item
                                                      key="1"
                                                      v-if="meta === 'Table'"
                                                      @click="showTableData(treeKey)"
                                                >查看表数据</a-menu-item>
                                          </a-menu>
                                    </template>
                              </a-dropdown>
                        </template>
                  </a-tree>
            </a-spin>
      </a-card>
</template>

<script lang="ts" setup>

import { onMounted, ref, watch } from "vue"
import { Request } from "@/apis/query";
import { useRoute } from "vue-router";
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";
import { HddOutlined, TableOutlined, CloudOutlined, ArrowLeftOutlined } from "@ant-design/icons-vue";
import { useStore } from "@/store";
import { EventBus } from "@/lib";

const emit = defineEmits(["showTableRef"])

const route = useRoute()

const searchValue = ref<string>("")

const store = useStore()

const expandedKeys = ref<any[]>([])

const autoExpandParent = ref<boolean>(true)

const spinning = ref(false)

let gData = ref<any>([])

let dataList = [] as any[]

const request = new Request

const schema = ref("")

watch(searchValue, value => {
      let expanded: string[] = []
      gData.value.forEach((item: any) => {
            if (item.children[0].key !== undefined) {
                  item.children.forEach((el: any) => {
                        if (el.key.indexOf(value) > -1) {
                              if (expanded.indexOf(item.key) == -1)
                                    expanded.push(item.key)
                        }
                  });

            }
      });
      expandedKeys.value = expanded
      searchValue.value = value;
      autoExpandParent.value = true;
});

const onExpand = (keys: string[], vl: any) => {
      if (vl.node.meta === "Table") {
            return
      }
      expandedKeys.value = keys
      autoExpandParent.value = false
      if (vl.node.children.length == 1) {
            spin()
            schema.value = vl.node.title
            request.QueryTable(route.query.source_id as string, vl.node.title).then((res: AxiosResponse<Res<any>>) => {
                  for (let i = 0; i < gData.value.length; i++) {
                        if (gData.value[i].key === vl.node.key) {
                              gData.value[i].children = res.data.payload.table
                              dataList[i].children = res.data.payload.table
                        }
                  }
            }).finally(() => {
                  spin()
            })
      }


}

const spin = () => {
      spinning.value = !spinning.value
}

const showTableData = (key: string) => {
      emit("showTableRef", { source_id: store.state.common.queryInfo.source_id, schema: schema.value, sql: `select * from ${key}` })
}

onMounted(() => {
      spin()
      request.QuerySchema(route.query.source_id as string).then((res: AxiosResponse<Res<any>>) => {
            gData.value = res.data.payload.info
            dataList = res.data.payload.info
            expandedKeys.value = [res.data.payload.info.key]
            store.commit("common/SET_SCHEMA_List",
                  {
                        schema: res.data.payload.info.map((item: { key: string; }) => item.key),
                        source: route.query.source as string,
                        source_id: route.query.source_id as string
                  }
            )
            EventBus.emit("highlight", res.data.payload.highlight)
      }
      ).finally(() => spin())
})

</script>