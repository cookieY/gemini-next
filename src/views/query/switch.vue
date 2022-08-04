<template>
      <a-modal v-model:visible="is_open" :title="$t('query.query.switch')" @ok="saveHandle">
            <a-list item-layout="horizontal" :data-source="source" :rowKey="(item) => item.source_id">
                  <template #renderItem="{ item }">
                        <a-list-item>
                              <a-list-item-meta>
                                    <template #title>
                                          <router-link
                                                :to="{ path: '/apply/query', query: { idc: item.idc, source: item.source, source_id: item.source_id } }"
                                                replace>
                                                {{ item.source }}</router-link>
                                    </template>
                              </a-list-item-meta>

                        </a-list-item>
                  </template>
            </a-list>
      </a-modal>
</template>

<script lang="ts"  setup>
import { Request } from '@/apis/fetchSchema';
import { RespFetchSource } from '@/apis/listAppApis';
import { Res } from '@/config/request';
import CommonMixins from '@/mixins/common'
import { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const { is_open, turnState } = CommonMixins()

const source = ref([] as any[])

const saveHandle = () => {
      turnState()
}

const request = new Request

onBeforeRouteUpdate((to) => {
      turnState()
})

onMounted(() => {
      request.Source('query').then((res: AxiosResponse<Res<RespFetchSource[]>>) => {
            source.value = res.data.payload
      })
})

defineExpose({
      turnState
})
</script>