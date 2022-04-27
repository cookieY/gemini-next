<template>
      <a-list item-layout="horizontal" :data-source="data" bordered size="small" :pagination="{
            size: 'small',
            total: data.length,
            showTotal: total => $t('common.count', { 'count': total }),
      
      }">
            <template #renderItem="{ item }">
                  <a-list-item>
                        <a-list-item-meta>
                              <template #title>
                                    <a-row>
                                          <div class="paste" style="cursor:pointer" :data-clipboard-text="item">
                                                <a-tooltip placement="top">
                                                      <template #title>
                                                            <span>{{ item }}</span>
                                                      </template>
                                                      {{ item.length > 30 ? `${item.substr(0, 30)}...` : item }}
                                                </a-tooltip>

                                          </div>
                                    </a-row>


                              </template>
                        </a-list-item-meta>

                  </a-list-item>

            </template>
      </a-list>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { message } from 'ant-design-vue';
import ClipboardJS from 'clipboard';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const clipboard = new ClipboardJS(".paste");

const { t } = useI18n()

const store = useStore()

const data = computed(() => store.state.order.history)

clipboard.on('success', (e) => {
      message.info(t('query.clip.is.paste'))
      e.clearSelection();
});

</script>

<style>
.paste {}
</style>