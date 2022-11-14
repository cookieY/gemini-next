<template>
  <PageHeader :title="title.title" :sub-title="title.subTitle"></PageHeader>
  <a-card>
    <a-row>
      <a-col :span="10">
        <a-divider orientation="left">{{
          $t('setting.message.push')
        }}</a-divider>
        <a-form v-bind="layout">
          <a-form-item :label="$t('setting.message.hook.addr')">
            <a-input v-model:value="config.message.web_hook"></a-input>
          </a-form-item>
          <a-form-item :label="$t('setting.message.hook.key')">
            <a-input-password
              v-model:value="config.message.key"
            ></a-input-password>
          </a-form-item>
          <a-form-item :label="$t('setting.message.smtp')">
            <a-input v-model:value="config.message.host"></a-input>
          </a-form-item>
          <a-form-item :label="$t('setting.message.smtp.enabled')">
            <a-checkbox v-model:checked="config.message.ssl"></a-checkbox>
          </a-form-item>
          <a-form-item :label="$t('setting.message.smtp.port')">
            <a-input-number
              v-model:value="config.message.port"
            ></a-input-number>
          </a-form-item>
          <a-form-item :label="$t('setting.message.smtp.user')">
            <a-input v-model:value="config.message.user"></a-input>
          </a-form-item>
          <a-form-item :label="$t('setting.message.smtp.password')">
            <a-input-password
              v-model:value="config.message.password"
            ></a-input-password>
          </a-form-item>
          <a-form-item :label="$t('setting.message.smtp.test')">
            <a-input v-model:value="config.message.to_user"></a-input>
          </a-form-item>
          <a-form-item :label="$t('setting.message.mail.switch')">
            <a-switch v-model:checked="config.message.mail"></a-switch>
          </a-form-item>
          <a-form-item :label="$t('setting.message.hook.switch')">
            <a-switch v-model:checked="config.message.ding"></a-switch>
          </a-form-item>
          <a-form-item :label="$t('common.action')">
            <a-space>
              <a-button
                type="primary"
                @click="testMessageHook('ding', config)"
                >{{ $t('setting.message.action.hook') }}</a-button
              >
              <a-button ghost @click="testMessageHook('mail', config)">{{
                $t('setting.message.action.mail')
              }}</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="11" offset="1">
        <a-divider orientation="left">{{ $t('setting.ldap') }}</a-divider>
        <a-form v-bind="layout">
          <a-form-item :label="$t('setting.ldap.url')">
            <a-input
              v-model:value="config.ldap.url"
              :placeholder="$t('setting.ldap.url.tips')"
            >
            </a-input>
          </a-form-item>
          <a-form-item :label="$t('setting.ldap.ssl')">
            <a-checkbox v-model:checked="config.ldap.ldaps"></a-checkbox>
          </a-form-item>
          <a-form-item :label="$t('setting.ldap.dn')">
            <a-input
              v-model:value="config.ldap.user"
              :placeholder="$t('setting.ldap.dn.tips')"
            >
            </a-input>
          </a-form-item>
          <a-form-item :label="$t('setting.ldap.password')">
            <a-input-password
              v-model:value="config.ldap.password"
              :placeholder="$t('setting.ldap.password.tips')"
            ></a-input-password>
          </a-form-item>
          <a-form-item :label="$t('setting.ldap.filter')">
            <a-input
              v-model:value="config.ldap.type"
              :placeholder="$t('setting.ldap.filter.tips')"
            >
            </a-input>
          </a-form-item>
          <a-form-item :label="$t('setting.ldap.sc')">
            <a-input
              v-model:value="config.ldap.sc"
              placeholder="LDAP Search Base"
            ></a-input>
          </a-form-item>
          <a-form-item :label="$t('setting.ldap.map')">
            <a-textarea
              v-model:value="config.ldap.map"
              :rows="5"
              allow-clear
              :placeholder="$t('setting.ldap.map.tips')"
            ></a-textarea>
          </a-form-item>
          <a-form-item :label="$t('setting.ldap.test.user')">
            <a-input
              v-model:value="config.ldap.test_user"
              placeholder="LDAP Test User"
            >
            </a-input>
          </a-form-item>
          <a-form-item :label="$t('setting.ldap.test.password')">
            <a-input-password
              v-model:value="config.ldap.test_password"
              placeholder="LDAP Test User Password"
            >
              >
            </a-input-password>
          </a-form-item>
          <a-form-item :label="$t('common.action')">
            <a-button type="primary" @click="testMessageHook('ldap', config)">{{
              $t('setting.ldap.test')
            }}</a-button>
          </a-form-item>
          <a-alert message="Warning" type="warning" show-icon>
            <template #icon>
              <SmileOutlined></SmileOutlined>
            </template>
            <template #description>
              <div v-html="$t('setting.ldap.alert')"></div>
            </template>
          </a-alert>
        </a-form>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="10">
        <a-divider orientation="left">{{ $t('setting.adv') }}</a-divider>
        <a-form v-bind="layout">
          <a-form-item :label="$t('setting.adv.query.limit')">
            <a-input-number
              v-model:value="config.other.limit"
              :min="1"
            ></a-input-number>
          </a-form-item>
          <a-form-item :label="$t('setting.adv.env')">
            <template v-for="item in config.other.idc" :key="item">
              <a-tag color="#B38D57" closable @close="closeTag(item)">{{
                item
              }}</a-tag>
            </template>

            <br />
            <br />
            <a-space>
              <a-input
                v-model:value="config.other.force"
                :placeholder="$t('setting.adv.env.tips')"
              ></a-input>
              <a-button @click="pushEnv">{{
                $t('setting.adv.env.add')
              }}</a-button>
            </a-space>
          </a-form-item>
          <a-form-item :label="$t('setting.adv.query.open')">
            <a-switch v-model:checked="config.other.query"></a-switch>
          </a-form-item>
          <a-form-item :label="$t('setting.adv.query.register')">
            <a-switch v-model:checked="config.other.register"></a-switch>
          </a-form-item>
          <a-form-item :label="$t('setting.adv.query.export')">
            <a-radio-group
              v-model:value="config.other.export"
              name="radioGroup"
            >
              <a-radio :value="false">{{ $t('common.no') }}</a-radio>
              <a-radio :value="true">{{ $t('common.yes') }}</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="$t('setting.adv.query.expire')">
            <a-input-number v-model:value="config.other.ex_query_time" :min="1">
            </a-input-number>
            {{ $t('setting.adv.query.mins') }}
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="11" offset="1">
        <a-divider orientation="left">{{ $t('setting.data.clear') }}</a-divider>
        <a-form v-bind="layout">
          <a-form-item :label="$t('setting.data.clear.order')">
            <a-space>
              <a-range-picker
                v-model:value="config.other.overdue"
                show-time
                format="YYYY/MM/DD HH:mm"
                :ranges="dateRanges"
              />
              <a-popconfirm
                :title="$t('setting.data.clear.tips')"
                @confirm="clearOrder"
              >
                <a-button>{{ $t('common.delete') }}</a-button>
              </a-popconfirm>
            </a-space>
          </a-form-item>
          <a-form-item :label="$t('setting.data.clear.query')">
            <a-space>
              <a-range-picker
                v-model:value="config.other.query_expire"
                show-time
                format="YYYY/MM/DD HH:mm"
                :ranges="dateRanges"
              />
              <a-popconfirm
                :title="$t('setting.data.clear.tips')"
                @confirm="clearQuery"
              >
                <a-button>{{ $t('common.delete') }}</a-button>
              </a-popconfirm>
            </a-space>
          </a-form-item>
          <a-alert message="Warning" type="warning" show-icon>
            <template #icon>
              <SmileOutlined></SmileOutlined>
            </template>
            <template #description>
              <div v-html="$t('setting.data.clear.alert')"></div>
            </template>
          </a-alert>
        </a-form>
        <br />
        <a-button type="primary" block @click="updateSettingInfo(config)">{{
          $t('common.save')
        }}</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
  import {
    updateSettingInfo,
    getSettingInfo,
    testMessageHook,
    Settings,
    deleteOrderRecords,
  } from '@/apis/setting';
  import PageHeader from '@/components/pageHeader/pageHeader.vue';
  import CommonMixins from '@/mixins/common';
  import { SmileOutlined } from '@ant-design/icons-vue';
  import { onMounted, ref } from 'vue';
  import dayjs from 'dayjs';
  import { defaultLang } from '@/lang';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n({});

  const title = {
    title: t('setting.title'),
    subTitle: t('setting.desc'),
  };

  const { layout } = CommonMixins();

  const config = ref({
    message: {},
    ldap: {},
    other: {
      limit: 0,
      export: false,
    },
  } as Settings);

  const clearQuery = async () => {
    if (config.value.other.query_expire !== undefined) {
      await deleteOrderRecords({
        date: config.value.other.query_expire.map((item) =>
          item.format('YYYY-MM-DD HH:mm')
        ),
        tp: true,
      });
    }
  };

  const clearOrder = async () => {
    if (config.value.other.overdue !== undefined) {
      await deleteOrderRecords({
        date: config.value.other.overdue.map((item) =>
          item.format('YYYY-MM-DD HH:mm')
        ),
        tp: false,
      });
    }
  };

  const dateRanges =
    defaultLang === 'en_US'
      ? { 'this month': [dayjs().startOf('month'), dayjs().endOf('month')] }
      : { 本月: [dayjs().startOf('month'), dayjs().endOf('month')] };

  const pushEnv = () => {
    config.value.other.idc.push(config.value.other.force);
    config.value.other.force = '';
  };

  const currentPage = async () => {
    const { data } = await getSettingInfo();
    config.value = data.payload;
  };
  const closeTag = (removedTag: string) => {
    const tags = config.value.other.idc.filter((tag) => tag !== removedTag);
    config.value.other.idc = tags;
  };

  onMounted(() => {
    currentPage();
  });
</script>
