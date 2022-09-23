<template>
  <a-modal
    v-model:visible="is_open"
    :title="$t('db.edit.title')"
    width="1000px"
    :ok-text="$t('common.save')"
    @ok="editDB"
  >
    >
    <a-row>
      <a-col :span="15">
        <a-form :model="dbForm" v-bind="layout">
          <a-form-item :label="$t('common.table.env')" name="idc">
            <a-select v-model:value="dbForm.idc">
              <a-select-option v-for="i in idc" :key="i" :value="i"
                >{{ i }}
              </a-select-option>
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
          <a-form-item :label="$t('user.username')" name="username">
            <a-input v-model:value="dbForm.username"></a-input>
          </a-form-item>
          <a-form-item :label="$t('common.password')" name="password">
            <a-input-password
              v-model:value="dbForm.password"
            ></a-input-password>
          </a-form-item>
          <a-form-item :label="$t('common.table.type')" name="is_query">
            <a-radio-group v-model:value="dbForm.is_query" name="radioGroup">
              <a-radio :value="2">{{ $t('db.rw') }}</a-radio>
              <a-radio :value="0">{{ $t('db.w') }}</a-radio>
              <a-radio :value="1">{{ $t('db.r') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('menu.manage.flow')">
            <a-select v-model:value="dbForm.flow_id" @change="mergeFlow">
              <a-select-option v-for="i in flow" :key="i.id" :value="i.id"
                >{{ i.source }}
              </a-select-option>
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
          <a-form-item :label="$t('db.excluded.schema')">
            <a-select
              v-model:value="excludeDB"
              mode="multiple"
              show-search
              style="width: 100%"
              :max-tag-count="6"
            >
              <a-select-option v-for="i in schemaList" :key="i" :value="i"
                >{{ i }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('db.excluded.field')">
            <a-select
              v-model:value="insulateWord"
              mode="tags"
              style="width: 100%"
              placeholder="Tags Mode"
              :max-tag-count="6"
            ></a-select>
          </a-form-item>
          <a-form-item :label="$t('common.action')">
            <a-button ghost :loading="loading" @click="checkConn"
              >{{ $t('db.test') }}
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="8" offset="1">
        <a-steps direction="vertical" size="small" :current="0">
          <a-step v-for="i in steps" :key="i.desc" :title="i.desc">
            <template #description>
              <a-tag v-for="k in i.auditor" :key="k" color="#108ee9">{{
                k
              }}</a-tag>
            </template>
          </a-step>
        </a-steps>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script lang="ts" setup>
  import { Request as Flow, RespSteps, Steps } from '@/apis/flow';
  import CommonMixins from '@/mixins/common';
  import { ref, computed } from 'vue';
  import { useStore } from '@/store';
  import { AxiosResponse } from 'axios';
  import { Res } from '@/config/request';
  import { Source, Request as DB } from '@/apis/db';
  import { querySchemaList } from '@/apis/source';
  import { EventBus } from '@/lib';

  const { is_open, turnState, layout } = CommonMixins();

  const store = useStore();

  const loading = ref(false);

  const idc = computed(() => {
    return store.state.common.idc;
  });

  const flow = computed(() => {
    return store.state.common.flow;
  });

  const steps = ref([] as Steps[]);

  const db = new DB();

  const flowReq = new Flow();

  const principalList = computed(() => store.state.common.principal);

  let dbForm = ref({
    idc: '',
    source: '',
    ip: '',
    port: 0,
    password: '',
    username: '',
    is_query: 2,
    flow_id: 0,
    source_id: '',
    exclude_db_list: '',
    insulate_word_list: '',
  } as Source);

  const schemaList = ref<string[]>([]);

  const excludeDB = ref<string[]>([]);

  const insulateWord = ref<string[]>([]);

  const mergeFlow = (vl: number) => {
    flowReq
      .Profile(vl)
      .then(
        (res: AxiosResponse<Res<RespSteps>>) =>
          (steps.value = res.data.payload.steps)
      );
  };

  const editDB = () => {
    dbForm.value.exclude_db_list = excludeDB.value.join(',');
    dbForm.value.insulate_word_list = insulateWord.value.join(',');
    db.Ops({ db: dbForm.value, tp: 'edit' }).then(() => {
      turnState();
      EventBus.emit('postOk');
    });
  };

  const fetchSchema = async () => {
    const { data } = await querySchemaList(dbForm.value.source_id);
    schemaList.value = data.payload;
  };

  const fillInfo = (vl: any) => {
    dbForm.value = Object.assign({}, vl);
    turnState();
    excludeDB.value = dbForm.value.exclude_db_list.split(',');
    insulateWord.value = dbForm.value.insulate_word_list.split(',');
    fetchSchema();
    flowReq
      .Profile(dbForm.value.flow_id)
      .then(
        (res: AxiosResponse<Res<RespSteps>>) =>
          (steps.value = res.data.payload.steps)
      );
  };

  const checkConn = () => {
    loading.value = !loading.value;
    db.Ops({ db: dbForm.value, tp: 'test', encrypt: true }).finally(
      () => (loading.value = !loading.value)
    );
  };

  defineExpose({
    fillInfo,
  });
</script>
