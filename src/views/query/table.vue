<template>
  <div>
    <a-space>
      <span>{{ $t('order.query.execute.time') }}:{{ executeTime }} ms</span>
    </a-space>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane
        v-for="(i, idx) in results"
        :key="idx"
        :tab="`${$t('common.result')} ${idx + 1}`"
      >
        <template v-if="isExport">
          <a-button
            size="small"
            type="primary"
            ghost
            @click="downloadXLS(i.data, i.field)"
            >{{ $t('common.export') }}
          </a-button>
          <br />
          <br />
        </template>
        <div>
          <a-table
            size="small"
            bordered
            :scroll="{ x: i.field.length * 200 + 100 }"
            table-layout="fixed"
            :columns="i.field"
            :data-source="i.data"
            :pagination="{
          showTotal: (total:number) => $t('common.count', { count: total }),
        }"
            @resize-column="handleResizeColumn"
          ></a-table>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { useStore } from '@/store';
  import router from '@/router';
  import { message } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import * as XLSX from 'xlsx';
  import { encode, decode } from '@msgpack/msgpack';

  defineProps<{
    height: number;
    id: string;
  }>();

  const activeKey = ref(0);

  const store = useStore();

  const executeTime = ref(0);

  const { t } = useI18n();

  const isExport = ref(false);

  let results = ref<any[]>();

  const handleResizeColumn = (w: number, col: { width: number }) => {
    col.width = w;
  };

  const downloadXLS = (data: any, title: any) => {
    const options = {
      '!cols': [
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
      ],
    };

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, {
      header: title.map((item: any) => item.title),
    });
    worksheet['!cols'] = options['!cols'];
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'Yearning_Table_Data.xlsx');
  };

  const sock = computed(() => store.state.common.sock);

  watch(
    () => sock.value.data as any,
    (val: Blob) => {
      val !== null ? recv(val) : null;
    }
  );

  const runResults = (schema: string, sql: string) => {
    const encoded: Uint8Array = encode({ type: 4, sql: sql, schema: schema });
    sock.value.send(encoded);
    const ws = sock.value.ws as any;
    ws.onmessage = recv;
  };

  const recv = async (e: any) => {
    const h = e.data as Blob;
    if (h.size > 0) {
      const resp = decode(await h.arrayBuffer()) as any;
      if (resp.heartbeat === 'pong') {
        return;
      }
      store.commit('common/SET_SPINNING');
      console.log(resp);
      resp.status ? (router.go(-1), message.error(t('query.expire'))) : null;
      if (resp.error !== '') {
        message.error(resp.error);
        results.value = [];
      } else {
        isExport.value = resp.export;
        console.log(resp.results);
        resp.results !== null
          ? (results.value = resp.results)
          : (results.value = []);
        executeTime.value = resp.query_time;
        activeKey.value = 0;
      }
    }
    store.commit('common/SET_SPINNING');
  };

  defineExpose({
    runResults,
  });
</script>
