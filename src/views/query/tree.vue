<template>
      <a-card>
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

                        <template #title="{ key: treeKey, title, meta }">
                              <a-dropdown :trigger="['contextmenu']">
                                    <span>{{ title }}</span>
                                    <template #overlay>
                                          <a-menu>
                                                <a-menu-item key="1" v-if="meta === 'Table'">查看表数据</a-menu-item>
                                          </a-menu>
                                    </template>
                              </a-dropdown>
                        </template>
                  </a-tree>
            </a-spin>
      </a-card>
</template>

<script lang="ts" setup>

import { onMounted, ref } from "vue"
import { Request } from "@/apis/query";
import { useRoute } from "vue-router";
import { AxiosResponse } from "axios";
import { Res } from "@/config/request";
import { HddOutlined, TableOutlined, CloudOutlined } from "@ant-design/icons-vue";
import { useStore } from "@/store";


const route = useRoute()

const searchValue = ref("")

const store = useStore()

const expandedKeys = ref<(string | number)[]>([])

const autoExpandParent = ref<boolean>(true)

const spinning = ref(false)

let gData = ref<any>([])

const request = new Request

let high = [] as any

const onExpand = (keys: string[], vl: any) => {

      if (vl.node.parent.node.meta === "Schema") {
            return
      }

      if (vl.node.key !== expandedKeys.value[0] && vl.node.children.length == 1) {
            spin()
            request.QueryTable(route.query.source_id as string, vl.node.key).then((res: AxiosResponse<Res<any>>) => {
                  for (let i = 0; i < gData.value[0].children.length; i++) {
                        if (gData.value[0].children[i].key === vl.node.key) {
                              gData.value[0].children[i].children = res.data.payload.table
                        }
                  }
            }).finally(() => {
                  spin()
            })
      }
      expandedKeys.value = keys
      autoExpandParent.value = false

}

const spin = () => {
      spinning.value = !spinning.value
}

onMounted(() => {
      spin()
      request.QuerySchema(route.query.source_id as string).then((res: AxiosResponse<Res<any>>) => {
            gData.value = res.data.payload.info
            expandedKeys.value = [res.data.payload.info[0].key]
            store.commit("common/SET_SCHEMA_List",
                  {
                        schema: res.data.payload.info[0].children.map((item: { key: string; }) => item.key),
                        source: res.data.payload.info[0].key,
                        source_id: route.query.source_id as string
                  }
            )
            store.commit("common/SET_HIGHLIGHT", res.data.payload.highlight)
      }
      ).finally(() => spin())
})

</script>