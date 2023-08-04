<template>
  <a-form ref="formRef" :model="dbForm" :rules="rules" v-bind="layout">
    <a-form-item :label="$t('common.table.env')" name="idc">
      <a-select v-model:value="dbForm.idc">
        <a-select-option v-for="i in idc" :key="i" :value="i">{{
          i
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="$t('common.table.db_type')">
      <a-select v-model:value="dbForm.db_type">
        <a-select-option
          v-for="i in db_type"
          :key="i.value"
          :value="i.value"
          :disabled="i.value === 1"
          >{{ i.label }}</a-select-option
        >
      </a-select>
    </a-form-item>
    <a-form-item :label="$t('common.table.name')" name="source">
      <a-input v-model:value="dbForm.source"></a-input>
    </a-form-item>
    <a-form-item :label="$t('db.addr')" name="ip">
      <a-input v-model:value="dbForm.ip"></a-input>
    </a-form-item>
    <a-form-item :label="$t('db.port')" name="port">
      <a-input-number v-model:value="dbForm.port"></a-input-number>
    </a-form-item>
    <a-form-item :label="$t('db.kind')">
      <a-switch
        v-model:checked="checked"
        :checked-children="$t('db.ssl')"
        :un-checked-children="$t('user.password')"
      />
    </a-form-item>
    <template v-if="checked">
      <a-form-item :label="$t('db.ssl.ca')">
        <a-button size="small" @click="open.ca = true">
          {{ $t('db.upload') }}
        </a-button>
      </a-form-item>
      <a-form-item :label="$t('db.ssl.certificate')">
        <a-button size="small" @click="open.cert = true">
          {{ $t('db.upload') }}
        </a-button>
      </a-form-item>
      <a-form-item :label="$t('db.ssl.key')">
        <a-button size="small" @click="open.key = true">
          {{ $t('db.upload') }}
        </a-button>
      </a-form-item>
    </template>
    <a-form-item :label="$t('user.username')" name="username">
      <a-input v-model:value="dbForm.username"></a-input>
    </a-form-item>
    <a-form-item :label="$t('user.password')" name="password">
      <a-input-password v-model:value="dbForm.password"></a-input-password>
    </a-form-item>
    <a-form-item :label="$t('menu.manage.flow')" name="flow_id">
      <a-select v-model:value="dbForm.flow_id">
        <a-select-option v-for="i in flow" :key="i.id" :value="i.id">{{
          i.source
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="$t('db.principal')" name="principal">
      <a-select
        v-model:value="dbForm.principal"
        style="width: 100%"
        show-search
        :options="
          principalList.map((item) => ({
            label: item.username,
            value: item.username,
          }))
        "
      >
      </a-select>
    </a-form-item>
    <a-form-item :label="$t('common.table.type')" name="is_query">
      <a-radio-group v-model:value="dbForm.is_query" name="radioGroup">
        <a-radio :value="2">{{ $t('db.rw') }}</a-radio>
        <a-radio :value="0">{{ $t('db.w') }}</a-radio>
        <a-radio :value="1">{{ $t('db.r') }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label="$t('common.action')">
      <a-space size="small">
        <a-button
          type="dashed"
          :loading="loading"
          size="small"
          @click="checkConn"
          >{{ $t('db.test') }}
        </a-button>
        <a-button type="primary" size="small" @click="createSource">{{
          $t('common.create')
        }}</a-button>
        <a-button type="primary" danger size="small" @click="resetFields"
          >{{ $t('common.cancel') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
  <ssl_model
    v-model:visible="open.ca"
    title="CA"
    @save="(text:string) =>{ dbForm.ca_file = text;open.ca = false}"
  ></ssl_model>
  <ssl_model
    v-model:visible="open.cert"
    title="Cert"
    @save="(text:string) => {dbForm.cert = text;open.cert = false}"
  ></ssl_model>
  <ssl_model
    v-model:visible="open.key"
    title="KeyFile"
    @save="(text:string) => {dbForm.key_file = text;open.key = false}"
  ></ssl_model>
</template>

<script lang="ts" setup>
  import { ref, computed, reactive } from 'vue';
  import { Source, createSource as cs } from '@/apis/db';
  import CommonMixins from '@/mixins/common';
  import { useStore } from '@/store';
  import { EventBus } from '@/lib';
  import { RuleObject } from 'ant-design-vue/es/form';
  import { useI18n } from 'vue-i18n';
  import ssl_model from './sslModal.vue';

  const { t } = useI18n();

  const checked = ref(false);

  const open = reactive({
    ca: false,
    cert: false,
    key: false,
  });

  const store = useStore();

  const regExp_Name = (rule: RuleObject, value: string) => {
    let pPattern = new RegExp(
      "[`~!@#$^&*()={}':;',\\[\\]<>/?~！@#￥……&*（）——{}【】‘；：”“'。，、？]"
    );
    if (pPattern.test(value)) {
      return Promise.reject(t('db.exp.name'));
    } else {
      return Promise.resolve();
    }
  };

  const regExp_password = (rule: RuleObject, value: string) => {
    let pPattern = new RegExp('[`?？^$]');
    if (pPattern.test(value)) {
      return Promise.reject(t('db.exp.password'));
    } else {
      return Promise.resolve();
    }
  };

  const rules = {
    idc: [{ required: true, message: t('db.check.env'), trigger: 'change' }],
    source: [
      { required: true, message: t('db.check.name'), trigger: 'blur' },
      { validator: regExp_Name, trigger: 'blur' },
    ],
    ip: [{ required: true, message: t('db.check.addr'), trigger: 'blur' }],
    username: [
      { required: true, message: t('db.check.username'), trigger: 'blur' },
    ],
    port: [
      {
        required: true,
        message: t('db.check.port'),
        trigger: 'blur',
        type: 'number',
      },
    ],
    flow_id: [
      { required: true, message: t('db.check.flow'), trigger: 'change' },
    ],
    principal: [
      { required: true, message: t('db.check.principal'), trigger: 'change' },
    ],
    password: [
      { required: true, message: t('db.check.password'), trigger: 'blur' },
      { validator: regExp_password, trigger: 'blur' },
    ],
  };

  const { layout } = CommonMixins();

  const loading = ref(false);

  const principalList = computed(() => store.state.common.principal);

  const idc = computed(() => {
    return store.state.common.idc;
  });

  const flow = computed(() => {
    return store.state.common.flow;
  });

  const db_type = [
    {
      value: 0,
      label: 'mysql',
    },
    {
      value: 1,
      label: 'pg',
    },
  ];

  const dbForm = ref({
    idc: '',
    source: '',
    ip: '',
    port: 3306,
    password: '',
    username: '',
    is_query: 2,
    flow_id: null as any,
    principal: '',
    ca_file: '',
    cert: '',
    key_file: '',
    db_type: 0,
  } as Source);

  const formRef = ref();

  const resetFields = () => {
    formRef.value.resetFields();
  };

  const fill = (vl: Source) => {
    dbForm.value = vl;
  };

  const createSource = () => {
    formRef.value.validate().then(async () => {
      await cs({ db: dbForm.value, tp: 'create' });
      EventBus.emit('postOk');
      resetFields();
    });
  };

  const checkConn = async () => {
    loading.value = !loading.value;
    await cs({ db: dbForm.value, tp: 'test' });
    loading.value = !loading.value;
  };

  defineExpose({
    fill,
  });
</script>
