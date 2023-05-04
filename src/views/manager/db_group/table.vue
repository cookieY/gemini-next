<template>
  <a-button type="primary" @click="flow.newFlow()"
    >{{ $t('common.new') }}{{ $t('menu.manage.source_group') }}</a-button
  >
  <br />
  <br />
  <a-table
    :columns="tblRef.col"
    :data-source="tblRef.data"
    bordered
    :pagination="{
          total: tblRef.pageCount,
          showTotal: (total:number) => $t('common.count', { count: total }),
          position: ['bottomLeft'],
          showSizeChanger: true,
          defaultPageSize: 10,
        }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <a-space size="small">
          <a-button
            type="primary"
            size="small"
            ghost
            @click="flow.editFlow(record)"
          >
            {{ $t('common.profile') }}</a-button
          >
          <a-popconfirm
            :title="$t('flow.delete.tips')"
            @confirm="() => deleteFlow(record.id).finally(() => currentPage())"
          >
            <a-button type="primary" size="small" danger ghost
              >{{ $t('common.delete') }}
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </template>
    <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
                (e:any) => setSelectedKeys(e.target.value ? [e.target.value] : [])
              "
          @press-enter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon>
            <SearchOutlined />
          </template>
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
          >Reset</a-button
        >
      </div>
    </template>
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
  </a-table>
  <GroupsModel ref="group" :title="title" @success="currentPage"></GroupsModel>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { deleteFlow, getFlowList, RespTPLs } from '@/apis/flow';
  import GroupsModel from './modal.vue';
  import { tableRef } from '@/components/table';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const tblRef = reactive<tableRef>({
    col: [
      {
        title: t('menu.manage.source_group') + t('common.table.name'),
        dataIndex: 'source',
        customFilterDropdown: true,
        onFilter: (
          value: string,
          record: { source: { toString: () => string } }
        ) =>
          record.source.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      { title: t('common.action'), dataIndex: 'action' },
    ] as any,
    data: [] as RespTPLs[],
    pageCount: 0,
  });

  const searchInput = ref();

  const title = ref(t('common.new') + t('menu.manage.source_group'));

  const flow = ref();

  const state = reactive({
    searchText: '',
    searchedColumn: '',
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    state.searchText = selectedKeys[0];
    state.searchedColumn = dataIndex;
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    state.searchText = '';
  };

  const currentPage = async () => {
    const { data } = await getFlowList();
    tblRef.data = data.payload;
    tblRef.pageCount = data.payload.length;
  };

  onMounted(() => {
    currentPage();
  });
</script>
