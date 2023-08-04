<template>
  <a-modal v-model:visible="is_open" title="工单流转" @ok="postOrder">
    <a-form ref="formRef" :model="wrapper" :rules="rules" form="wrapper">
      <a-form-item label="环境" name="env">
        <a-select v-model:value="wrapper.env" @change="fetchSource">
          <a-select-option
            v-for="i in local.env"
            :key="i"
            :value="i"
          ></a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="数据源" name="source_id">
        <a-select v-model:value="wrapper.source_id" @change="fetchSchema">
          <a-select-option
            v-for="i in local.source"
            :key="i.source_id"
            :value="i.source_id"
          >
            {{ i.source }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="数据库" name="data_base">
        <a-select v-model:value="wrapper.data_base">
          <a-select-option v-for="i in local.schema" :key="i" :value="i">
            {{ i }}</a-select-option
          >
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import CommonMixins from '@/mixins/common';
  import { debounce } from 'lodash-es';
  import { onMounted, reactive, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import { AxiosResponse } from 'axios';
  import { Res } from '@/config/request';
  import { userPostOrder } from '@/apis/orderPostApis';
  import {
    queryIDCList,
    querySchemaList,
    querySourceList,
  } from '@/apis/source';
  const { t } = useI18n();
  const { is_open, turnState } = CommonMixins();

  const formRef = ref();

  const wrapper = reactive<any>({
    idc: '',
    source_id: '',
    data_base: '',
    type: 0,
    backup: 0,
    sql: '',
  });

  const local = reactive<any>({
    env: [],
    source: [],
    schema: [],
  });

  const rules = {
    env: [
      { required: true, message: t('common.check.env'), trigger: 'change' },
    ],
    source_id: [
      { required: true, message: t('common.check.source'), trigger: 'change' },
    ],
    data_base: [
      { required: true, message: t('common.check.schema'), trigger: 'change' },
    ],
  };

  const postOrder = debounce(() => {
    formRef.value
      .validate()
      .then(async () => {
        await userPostOrder(wrapper);
        turnState();
      })
      .catch(() => {
        message.error(t('order.apply.form.commit'));
      });
  }, 200);

  const fetchSource = (vl: string) => {
    querySourceList('all', vl).then((res: AxiosResponse<Res<any>>) => {
      local.source = res.data.payload;
    });
  };

  const fetchSchema = (vl: string) => {
    querySchemaList(vl, true).then((res: AxiosResponse<Res<any>>) => {
      local.schema = res.data.payload;
    });
  };

  const openModel = (order: any) => {
    wrapper.sql = order.sql;
    wrapper.type = order.type;
    wrapper.backup = order.backup;
    turnState();
  };

  onMounted(() => {
    queryIDCList().then((res: AxiosResponse<Res<any>>) => {
      local.env = res.data.payload;
    });
  });

  defineExpose({
    openModel,
  });
</script>
