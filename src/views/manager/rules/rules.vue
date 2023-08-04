<template>
  <a-row>
    <a-col :span="19">
      <a-input-search
        placeholder="input search text"
        enter-button
        @search="onSearch"
      />
    </a-col>
    <a-col :span="4" offset="1">
      <a-button type="primary" @click="onSave">{{
        $t('common.save')
      }}</a-button>
    </a-col>
  </a-row>
  <br />
  <a-table bordered :columns="col" :data-source="rules" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <a-switch
          v-if="record.tp === 0"
          v-model:checked="engine[record.name]"
        ></a-switch>
        <a-input-number
          v-if="record.tp === 1"
          v-model:value="engine[record.name]"
        >
        </a-input-number>
        <a-input
          v-if="record.tp === 2"
          v-model:value="engine[record.name]"
        ></a-input>
        <a-textarea
          v-if="record.tp === 3"
          v-model:value="engine[record.name]"
          :rows="6"
        >
        </a-textarea>
      </template>
    </template>
  </a-table>

  <a-back-top />
</template>

<script lang="ts" setup>
  import { Rule, rule } from './rules';
  import { ref } from 'vue';
  import {
    Rules,
    updateRules,
    updateGlobalRules,
    addRules,
  } from '@/apis/rules';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    global?: boolean;
    desc: string;
    isAdd?: boolean;
  }>();

  const { t } = useI18n();

  const emit = defineEmits(['ok']);

  const col = [
    {
      title: t('common.table.name'),
      dataIndex: 'name',
      width: 50,
    },
    {
      title: t('common.table.type'),
      dataIndex: 'type',
      width: 50,
    },
    {
      title: t('common.desc'),
      dataIndex: 'desc',
    },

    {
      title: t('common.action'),
      dataIndex: 'action',
      width: 300,
    },
  ];

  const engine = ref({} as Rules);

  const rules = ref<Rule[]>(rule);

  const id = ref(0);

  const onSearch = (vl: string) => {
    rules.value = rule.filter((item) => item.desc.indexOf(vl) !== -1);
  };
  const onRules = (r: Rules, ids: number) => {
    engine.value = r;
    id.value = ids;
  };

  const onSave = async () => {
    if (props.isAdd) {
      await addRules({ desc: props.desc, audit_role: engine.value });
    } else {
      props.global
        ? await updateGlobalRules(engine.value)
        : await updateRules({
            desc: props.desc,
            audit_role: engine.value,
            id: id.value,
          });
    }
    emit('ok');
  };

  defineExpose({
    onRules,
  });
</script>
