<template>
  <a-modal v-model:visible="is_open" :title="$t('auto.title')" @ok="postOk">
    <a-form ref="formRef" layout="vertical" :model="autotask" :rules="rules">
      <a-form-item :label="$t('auto.edit.name')" name="name">
        <a-input v-model:value="autotask.name"></a-input>
      </a-form-item>
      <a-form-item :label="$t('common.table.type')">
        <a-select v-model:value="autotask.tp">
          <a-select-option v-for="i in taskTp" :key="i.v" :value="i.v">{{
            i.title
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('common.table.env')" name="idc">
        <a-select v-model:value="autotask.idc" @change="fetchSource">
          <a-select-option v-for="i in fetchList.idc" :key="i" :value="i">{{
            i
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('common.table.source')" name="sourceLabel">
        <a-select
          v-model:value="autotask.sourceLabel"
          label-in-value
          option-label-prop="label"
          @change="fetchSchema"
        >
          <a-select-option
            v-for="i in fetchList.source"
            :key="i.source_id"
            :value="i.source_id"
            :label="i.source"
            >{{ i.source }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('common.table.schema')" name="data_base">
        <a-select v-model:value="autotask.data_base" @change="fetchTable">
          <a-select-option v-for="i in fetchList.schema" :key="i" :value="i">{{
            i
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('common.table.table')" name="table">
        <a-select v-model:value="autotask.table">
          <a-select-option v-for="i in fetchList.tables" :key="i" :value="i">{{
            i
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('common.table.max')">
        <a-input-number
          v-model:value="autotask.affect_rows"
          :min="0"
        ></a-input-number>
      </a-form-item>
      <a-form-item :label="$t('auto.edit.enabled')">
        <a-switch
          v-model:checked="autotask.status"
          :checked-value="1"
          :un-checked-value="0"
        ></a-switch>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { AutoTask, Request as Re } from '@/apis/autotask';
  import {
    ISource,
    queryIDCList,
    querySchemaList,
    querySourceList,
    queryTableList,
    Request,
  } from '@/apis/source';
  import CommonMixins from '@/mixins/common';
  import { LabelInValue } from '@/types';
  import { RuleObject } from 'ant-design-vue/es/form';
  import { onMounted, reactive, unref, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const formRef = ref();

  const fetchList = reactive({
    source: [] as AutoTask[] | ISource[],
    idc: [] as string[],
    schema: [] as string[],
    tables: [] as string[],
  });

  const autotask = ref<AutoTask>({
    name: '',
    tp: 0,
    sourceLabel: {} as LabelInValue,
    data_base: '',
    table: '',
    affect_rows: 0,
    idc: '',
  });

  const checkSource = async (_rule: RuleObject, value: LabelInValue) => {
    if (value.value === undefined) {
      return Promise.reject(t('common.check.source'));
    }
    return Promise.resolve();
  };

  const rules = {
    name: [
      { required: true, trigger: 'blur', message: t('common.check.name') },
    ],
    idc: [
      { required: true, trigger: 'change', message: t('common.check.env') },
    ],
    sourceLabel: [
      { required: true, trigger: 'change', validator: checkSource },
    ],
    data_base: [
      { required: true, trigger: 'change', message: t('common.check.schema') },
    ],
    table: [
      { required: true, trigger: 'change', message: t('common.check.table') },
    ],
  };

  const initTask = Object.assign({}, autotask);

  const postTask = new Re();

  const emit = defineEmits(['success']);

  const { is_open, turnState, taskTp } = CommonMixins();

  const newTask = () => {
    Object.assign(autotask, unref(initTask));
    turnState();
  };

  const editTask = (task: AutoTask) => {
    autotask.value = Object.assign({}, task);
    turnState();
  };

  const postOk = () => {
    formRef.value.validateFields().then(() => {
      postTask.Post('curd', autotask.value).then(() => {
        turnState();
        emit('success');
      });
    });
  };

  const fetchSource = async (vl: string) => {
    const { data } = await querySourceList('idc', vl);
    fetchList.source = data.payload as ISource[];
  };

  const fetchSchema = async (vl: LabelInValue) => {
    const { data } = await querySchemaList(vl.value);
    fetchList.schema = data.payload;
  };

  const fetchTable = async (schema: string) => {
    const { data } = await queryTableList(
      autotask.value.sourceLabel.value,
      schema
    );
    fetchList.tables = data.payload;
  };

  onMounted(async () => {
    const { data } = await queryIDCList();
    fetchList.idc = data.payload;
  });

  defineExpose({
    newTask,
    editTask,
  });
</script>
