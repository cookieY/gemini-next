<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <a-row>
            <a-col :span="10">
                  <a-divider orientation="left">{{ $t('setting.message.push') }}</a-divider>
                  <a-form v-bind="layout">
                        <a-form-item :label="$t('setting.message.hook.addr')">
                              <a-input v-model:value="config.message.web_hook"></a-input>
                        </a-form-item>
                        <a-form-item :label="$t('setting.message.hook.key')">
                              <a-input-password v-model:value="config.message.key"></a-input-password>
                        </a-form-item>
                        <a-form-item :label="$t('setting.message.smtp')">
                              <a-input v-model:value="config.message.host"></a-input>
                        </a-form-item>
                        <a-form-item :label="$t('setting.message.smtp.enabled')">
                              <a-checkbox v-model:checked="config.message.ssl"></a-checkbox>
                        </a-form-item>
                        <a-form-item :label="$t('setting.message.smtp.port')">
                              <a-input-number v-model:value="config.message.port"></a-input-number>
                        </a-form-item>
                        <a-form-item :label="$t('setting.message.smtp.user')">
                              <a-input v-model:value="config.message.user"></a-input>
                        </a-form-item>
                        <a-form-item :label="$t('setting.message.smtp.password')">
                              <a-input-password v-model:value="config.message.password"></a-input-password>
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
                                          @click="request.Test('ding', config)"
                                    >{{ $t('setting.message.action.hook') }}</a-button>
                                    <a-button
                                          ghost
                                          @click="request.Test('mail', config)"
                                    >{{ $t('setting.message.action.mail') }}</a-button>
                              </a-space>
                        </a-form-item>
                  </a-form>
            </a-col>
            <a-col :span="11" offset="1">
                  <a-divider orientation="left">{{ $t('setting.ldap') }}</a-divider>
                  <a-form v-bind="layout">
                        <a-form-item :label="$t('setting.ldap.url')">
                              <a-input
                                    :placeholder="$t('setting.ldap.url.tips')"
                                    v-model:value="config.ldap.url"
                              ></a-input>
                        </a-form-item>
                        <a-form-item :label="$t('setting.ldap.enabled')">
                              <a-checkbox v-model:checked="config.ldap.ldaps"></a-checkbox>
                        </a-form-item>
                        <a-form-item :label="$t('setting.ldap.dn')">
                              <a-input
                                    :placeholder="$t('setting.ldap.dn.tips')"
                                    v-model="config.ldap.user"
                              ></a-input>
                        </a-form-item>
                        <a-form-item :label="$t('setting.ldap.password')">
                              <a-input
                                    :placeholder="$t('setting.ldap.password.tips')"
                                    v-model="config.ldap.password"
                                    type="password"
                              ></a-input>
                        </a-form-item>
                        <a-form-item :label="$t('setting.ldap.filter')">
                              <a-input
                                    v-model="config.ldap.type"
                                    :placeholder="$t('setting.ldap.filter.tips')"
                              ></a-input>
                        </a-form-item>
                        <a-form-item :label="$t('setting.ldap.sc')">
                              <a-input placeholder="LDAP Search Base" v-model="config.ldap.sc"></a-input>
                        </a-form-item>
                        <a-form-item :label="$t('common.action')">
                              <a-button
                                    type="primary"
                                    @click="request.Test('ldap', config)"
                              >{{ $t('setting.ldap.test') }}</a-button>
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
                              <a-input-number v-model:value="config.other.limit" :min="1000"></a-input-number>
                        </a-form-item>
                        <a-form-item :label="$t('setting.adv.env')">
                              <template v-for="item in config.other.idc" :key="item">
                                    <a-tag
                                          color="#B38D57"
                                          closable
                                          @close="closeTag(item)"
                                    >{{ item }}</a-tag>
                              </template>

                              <br />
                              <br />
                              <a-space>
                                    <a-input
                                          :placeholder="$t('setting.adv.env.tips')"
                                          v-model:value="config.other.foce"
                                    ></a-input>
                                    <a-button @click="pushEnv">{{ $t('setting.adv.env.add') }}</a-button>
                              </a-space>
                        </a-form-item>
                        <a-form-item :label="$t('setting.adv.query.open')">
                              <a-switch v-model:checked="config.other.query"></a-switch>
                        </a-form-item>
                        <a-form-item :label="$t('setting.adv.query.register')">
                              <a-switch v-model:checked="config.other.register"></a-switch>
                        </a-form-item>
                        <a-form-item :label="$t('setting.adv.query.export')">
                              <a-radio-group v-model:value="config.other.export" name="radioGroup">
                                    <a-radio :value="false">{{ $t('common.no') }}</a-radio>
                                    <a-radio :value="true">{{ $t('common.yes') }}</a-radio>
                              </a-radio-group>
                        </a-form-item>
                        <a-form-item :label="$t('setting.adv.query.expire')">
                              <a-input-number v-model:value="config.other.ex_query_time" :min="1"></a-input-number>
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
                                          show-time
                                          v-model:value="config.other.overdue"
                                          format="YYYY/MM/DD HH:mm"
                                          :ranges="dateRanges"
                                    />
                                    <a-popconfirm
                                          :title="$t('setting.data.clear.tips')"
                                          @confirm="request.Delete({ date: config.other.overdue.map(item => item.format('YYYY-MM-DD HH:mm')), tp: false })"
                                    >
                                          <a-button>{{ $t('common.delete') }}</a-button>
                                    </a-popconfirm>
                              </a-space>
                        </a-form-item>
                        <a-form-item :label="$t('setting.data.clear.query')">
                              <a-space>
                                    <a-range-picker
                                          show-time
                                          v-model:value="config.other.query_expire"
                                          format="YYYY/MM/DD HH:mm"
                                          :ranges="dateRanges"
                                    />
                                    <a-popconfirm
                                          :title="$t('setting.data.clear.tips')"
                                          @confirm="request.Delete({ date: config.other.query_expire.map(item => item.format('YYYY-MM-DD HH:mm')), tp: true })"
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
                  <a-button
                        type="primary"
                        block
                        @click="request.Post(config)"
                  >{{ $t('common.save') }}</a-button>
            </a-col>
      </a-row>
</template>

<script lang="ts" setup>
import { Request, Settings } from '@/apis/setting';
import PageHeader from '@/components/pageHeader/pageHeader.vue';
import { Res } from '@/config/request';
import CommonMixins from "@/mixins/common"
import { SmileOutlined } from '@ant-design/icons-vue';
import { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { defaultLang } from '@/lang';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({

})

const title = {
      title: t('setting.title'),
      subTitle: t('setting.desc'),
}

const { layout } = CommonMixins()

const config = ref({
      message: {},
      ldap: {},
      other: {
            export: false
      }
} as Settings)

const request = new Request

const dateRanges = defaultLang === 'en-US' ? { "this month": [dayjs().startOf('month'), dayjs().endOf('month')] } : { "本月": [dayjs().startOf('month'), dayjs().endOf('month')] }

const pushEnv = () => {
      config.value.other.idc.push(config.value.other.foce)
      config.value.other.foce = ""
}

const currentPage = () => {
      request.Get().then((res: AxiosResponse<Res<Settings>>) => {
            config.value = res.data.payload
      })
}
const closeTag = (removedTag: string) => {
      const tags = config.value.other.idc.filter(tag => tag !== removedTag);
      config.value.other.idc = tags;
}

onMounted(() => {
      currentPage()
})

</script>