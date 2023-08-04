<template>
  <a-card>
    <DBTableSearch @search="search"></DBTableSearch>
    <c-table ref="tbl" :tbl-ref="tblRef">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space size="small">
            <a-button
              type="primary"
              size="small"
              ghost
              @click="fillInfo(record)"
            >
              {{ $t('common.profile') }}</a-button
            >
            <a-popconfirm
              :title="$t('db.delete.tips')"
              @confirm="deleteSource(record.source_id).then(() => tbl.manual())"
            >
              <a-button type="primary" size="small" danger ghost
                >{{ $t('common.delete') }}
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
        <template v-if="column.dataIndex === 'db_type'">
          <span>{{ text == 0 ? 'mysql' : 'pg' }}</span>
        </template>
        <template v-if="column.dataIndex === 'is_query'">
          <a-tag v-if="text === 2" color="#43A687">{{ $t('db.rw') }}</a-tag>
          <a-tag v-if="text === 1" color="#EA495F">{{ $t('db.r') }}</a-tag>
          <a-tag v-if="text === 0" color="#B38D57">{{ $t('db.w') }}</a-tag>
        </template>
      </template>
    </c-table>
  </a-card>

  <DBModal ref="modal" :idc="idc" :rules="rules"></DBModal>
</template>

<script lang="ts" setup>
  import {
    DBExpr,
    Source,
    DBParams,
    getSourceList,
    deleteSource,
  } from '@/apis/db';
  import DBModal from './dbModal.vue';
  import DBTableSearch from './dbTableSearch.vue';
  import { ref, reactive, onMounted } from 'vue';
  import { EventBus } from '@/lib';
  import { tableRef } from '@/components/table';
  import { useI18n } from 'vue-i18n';
  import { CustomRule, getCustomRulesList } from '@/apis/rules';

  const { t } = useI18n();

  const rules = ref([] as CustomRule[]);

  const tblRef = reactive<tableRef>({
    col: [
      { title: t('common.table.name'), dataIndex: 'source' },
      { title: t('common.table.db_type'), dataIndex: 'db_type' },
      { title: t('common.table.env'), dataIndex: 'idc' },
      { title: 'IP', dataIndex: 'ip' },
      { title: t('common.table.type'), dataIndex: 'is_query' },
      { title: t('common.action'), dataIndex: 'action' },
    ],
    data: [] as Source[],
    pageCount: 1,
    expr: {
      source: '',
      ip: '',
      idc: '',
      is_query: -1,
    } as DBExpr,
    fn: async (expr: DBParams) => {
      const { data } = await getSourceList(expr);
      tblRef.data = data.payload.data;
      tblRef.pageCount = data.payload.page;
    },
  });

  const modal = ref();

  const tbl = ref();

  const idc = ref([] as string[]);

  const search = (vl: DBExpr) => {
    tblRef.expr = vl;
    tbl.value.manual();
  };

  const fillInfo = (vl: Source) => {
    modal.value.fillInfo(vl);
  };

  onMounted(async () => {
    EventBus.on('postOk', () => {
      tbl.value.manual();
    });
    const { data } = await getCustomRulesList();
    rules.value = data.payload;
  });
</script>
