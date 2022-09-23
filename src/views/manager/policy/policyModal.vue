<template>
  <a-modal
    v-model:visible="is_open"
    :title="props.title"
    :width="800"
    @ok="postPolicy"
  >
    <a-form layout="vertical">
      <a-form-item :label="$t('common.policy.group') + $t('common.table.name')">
        <a-input v-model:value="selfRuse.name" :disabled="isEdit"></a-input>
      </a-form-item>
      <template v-for="i in range" :key="i">
        <a-transfer
          v-model:target-keys="selfRuse[`${i}_source`]"
          :titles="[
            ' ' +
              $t('common.all') +
              `${i.toLocaleUpperCase()} ` +
              $t('common.policy'),
            ' ' +
              $t('common.selected') +
              `${i.toLocaleUpperCase()} ` +
              $t('common.policy'),
          ]"
          :row-key="(record:any) => record.source_id"
          :data-source="i === 'query' ? ruse.query : ruse.source"
          show-search
          :render="(item:any) => item.source"
          :list-style="{
            width: '400px',
            height: '300px',
          }"
        />
        <a-divider></a-divider>
      </template>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import {
    getPolicySources,
    Policy,
    PolicyPost,
    PolicyRuse,
    updatePolicy,
  } from '@/apis/policy';
  import CommonMixins from '@/mixins/common';
  import { onMounted, reactive, unref, ref } from 'vue';

  const emit = defineEmits(['success']);

  const { is_open, turnState } = CommonMixins();

  const props = defineProps<{
    title: string;
  }>();

  const isEdit = ref(false);

  const ruse = reactive<PolicyRuse>({
    source: [],
    query: [],
  });

  const selfRuse = reactive<PolicyPost>({
    ddl_source: [],
    dml_source: [],
    query_source: [],
    name: '',
    id: 0,
  });

  let initRune = Object.assign({}, selfRuse);

  enum range {
    DDL = 'ddl',
    DML = 'dml',
    QUERY = 'query',
  }

  const postPolicy = async () => {
    await updatePolicy(selfRuse);
    turnState();
    emit('success');
  };

  const editPolicy = (vl: Policy) => {
    isEdit.value = true;
    selfRuse.id = vl.id;
    selfRuse.name = vl.name;
    vl.permissions.query_source === null
      ? (selfRuse.query_source = [])
      : (selfRuse.query_source = vl.permissions.query_source);
    vl.permissions.dml_source === null
      ? (selfRuse.dml_source = [])
      : (selfRuse.dml_source = vl.permissions.dml_source);
    vl.permissions.ddl_source === null
      ? (selfRuse.ddl_source = [])
      : (selfRuse.ddl_source = vl.permissions.ddl_source);
    turnState();
  };

  const newPolicy = () => {
    isEdit.value = false;
    Object.assign(selfRuse, unref(initRune));
    turnState();
  };

  onMounted(async () => {
    const { data } = await getPolicySources();
    ruse.source = data.payload.source;
    ruse.query = data.payload.query;
  });

  defineExpose({
    newPolicy,
    editPolicy,
  });
</script>
