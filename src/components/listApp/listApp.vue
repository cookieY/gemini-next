<template>
  <a-row :gutter="24">
    <a-col :xs="24" :md="8">
      <a-select
        v-model:value="selected"
        show-search
        allow-clear
        placeholder="数据源搜索"
        style="width: 100%"
        :filter-option="filterOption"
        @change="handleChange"
      >
        <a-select-option value="all">{{
          $t('order.state.all')
        }}</a-select-option>
        <a-select-option
          v-for="i in options"
          :key="i.source"
          :value="i.source"
          >{{ i.source }}</a-select-option
        >
      </a-select>
    </a-col>
  </a-row>
  <br />
  <a-list
    :loading="loading"
    :data-source="source"
    :grid="{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4, xxxl: 4 }"
    :pagination="pagination"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <div
          @click="
            () =>
              router.push({
                path: props.type !== 'query' ? '/apply/order' : '/apply/query',
                query: {
                  type: props.id,
                  idc: item.idc,
                  source: item.source,
                  source_id: item.source_id,
                },
              })
          "
        >
          <a-card :body-style="{ paddingBottom: 20 }" hoverable>
            <a-card-meta :title="item.source">
              <template #description>{{
                $t('order.apply.card.env', {
                  env: item.idc,
                })
              }}</template>
              <template #avatar>
                <a-avatar :style="{ backgroundColor: '#Ff9900' }">
                  <template #icon>
                    <CodepenCircleOutlined />
                  </template>
                </a-avatar>
              </template>
            </a-card-meta>
            <template #actions>
              <a-tooltip
                :title="
                  $t('order.apply.tab.source_id', { env: item.source_id })
                "
              >
                <SubnodeOutlined />
              </a-tooltip>
              <a-tooltip :title="$t('order.apply.card.env', { env: item.idc })">
                <ShareAltOutlined />
              </a-tooltip>
              <a-dropdown>
                <a-tooltip :title="$t('order.apply.card.enter')">
                  <a
                    class="ant-dropdown-link"
                    @click="
                      () =>
                        router.push({
                          path:
                            props.type !== 'query'
                              ? '/apply/order'
                              : '/apply/query',
                          query: {
                            type: props.id,
                            idc: item.idc,
                            source: item.source,
                            source_id: item.source_id,
                          },
                        })
                    "
                  >
                    <EnterOutlined />
                  </a>
                </a-tooltip>
              </a-dropdown>
            </template>
          </a-card>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
  import {
    SubnodeOutlined,
    EnterOutlined,
    ShareAltOutlined,
    CodepenCircleOutlined,
  } from '@ant-design/icons-vue';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ISource, querySourceList } from '@/apis/source';

  const props = defineProps<{
    type: string;
    id: number;
    isExport?: boolean;
  }>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const emit = defineEmits(['enter']);

  const router = useRouter();

  const pagination = {
    pageSize: 20,
  };

  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const handleChange = (value: string) => {
    value === '' || value === undefined || value === 'all'
      ? (source.value = tmpSource)
      : (source.value = tmpSource.filter(
          (item: ISource) => item.source === value
        ));
  };

  const selected = ref('all');

  let tmpSource = [] as ISource[];

  const source = ref([] as ISource[]);

  const options = ref([] as ISource[]);

  const loading = ref(true);

  onMounted(async () => {
    try {
      const { data } = await querySourceList(props.type);
      tmpSource = source.value = options.value = data.payload as ISource[];
      loading.value = false;
    } catch (error) {
      console.log(error);
    }
  });
</script>
