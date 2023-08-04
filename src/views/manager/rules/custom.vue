<template>
  <a-card ref="card">
    <a-row>
      <a-col :span="19">
        <a-input-search
          placeholder="input search text"
          enter-button
          @search="onSearch"
        />
      </a-col>
      <a-col :span="4" offset="1">
        <a-button
          type="primary"
          @click="
            is_open = true;
            ist_add = true;
          "
          >{{ $t('common.add') }}</a-button
        >
      </a-col>
    </a-row>
    <br />
    <a-table bordered :columns="col" :data-source="list">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button
            size="small"
            @click="
              () => {
                r.onRules(record.audit_role, record.id);
                desc = record.desc;
                turnState();
              }
            "
            >{{ $t('common.profile') }}</a-button
          >
        </template>
      </template>
    </a-table>
  </a-card>

  <a-drawer
    v-model:visible="is_open"
    force-render
    :title="$t('custom')"
    placement="right"
    :width="width"
  >
    <a-input
      v-model:value="desc"
      :placeholder="$t('common.table.name')"
    ></a-input>
    <br />
    <br />
    <rules
      ref="r"
      :desc="desc"
      :is-add="ist_add"
      @ok="
        turnState();
        get();
      "
    />
  </a-drawer>
</template>

<script setup lang="ts">
  import { getCustomRulesList } from '@/apis/rules';
  import { onMounted, ref } from 'vue';
  import CommonMixins from '@/mixins/common';
  import rules from './rules.vue';
  import { useElementSize } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';

  const { is_open, turnState } = CommonMixins();

  const card = ref();

  const ist_add = ref(false);

  const r = ref();

  const { width } = useElementSize(card);

  const desc = ref('');

  const { t } = useI18n();

  const col = [
    {
      title: t('common.table.name'),
      dataIndex: 'desc',
    },
    {
      title: t('common.action'),
      dataIndex: 'action',
      slotName: 'action',
    },
  ];

  const list = ref([] as any);

  const onSearch = (vl: string) => {
    list.value = list.value.filter((item) => item.desc.indexOf(vl) !== -1);
  };

  const get = async () => {
    const { data } = await getCustomRulesList();
    list.value = data.payload;
  };

  onMounted(async () => {
    get();
  });
</script>

<style scoped></style>
