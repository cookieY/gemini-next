<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <a-row>
            <a-col :span="10">
                  <a-divider orientation="left">消息推送</a-divider>
                  <a-form v-bind="layout">
                        <a-form-item label="webhook地址:">
                              <a-input
                                    placeholder="支持钉钉/企业微信(赞助版本) webhook机器人"
                                    v-model:value="config.message.web_hook"
                              ></a-input>
                        </a-form-item>
                        <a-form-item label="webhook秘钥:">
                              <a-input-password
                                    placeholder="钉钉hook secret key"
                                    v-model:value="config.message.key"
                              ></a-input-password>
                        </a-form-item>
                        <a-form-item label="邮件SMTP服务地址:">
                              <a-input placeholder="STMP服务 地址" v-model:value="config.message.host"></a-input>
                        </a-form-item>
                        <a-form-item label="启用ssl端口">
                              <a-checkbox v-model:checked="config.message.ssl"></a-checkbox>
                        </a-form-item>
                        <a-form-item label="SMTP服务端口:">
                              <a-input-number v-model:value="config.message.port"></a-input-number>
                        </a-form-item>
                        <a-form-item label="邮件推送人用户名:">
                              <a-input placeholder="推送人 用户名" v-model:value="config.message.user"></a-input>
                        </a-form-item>
                        <a-form-item label="邮件推送人密码:">
                              <a-input-password
                                    placeholder="推送人 密码"
                                    v-model:value="config.message.password"
                              ></a-input-password>
                        </a-form-item>
                        <a-form-item label="邮件测试收件地址::">
                              <a-input
                                    placeholder="测试收件人地址填写"
                                    v-model:value="config.message.to_user"
                              ></a-input>
                        </a-form-item>
                        <a-form-item label="email推送开关:">
                              <a-switch v-model:checked="config.message.mail"></a-switch>
                        </a-form-item>
                        <a-form-item label="webhook推送开关:">
                              <a-switch v-model:checked="config.message.ding"></a-switch>
                        </a-form-item>
                        <a-form-item label="操作">
                              <a-space>
                                    <a-button
                                          type="primary"
                                          @click="request.Test('ding', config)"
                                    >hook测试</a-button>
                                    <a-button ghost @click="request.Test('mail', config)">邮件测试</a-button>
                              </a-space>
                        </a-form-item>
                  </a-form>
            </a-col>
            <a-col :span="11" offset="1">
                  <a-divider orientation="left">LDAP设置</a-divider>
                  <a-form v-bind="layout">
                        <a-form-item label="服务地址url">
                              <a-input
                                    placeholder="[ip地址或者域名]:[端口号]"
                                    v-model:value="config.ldap.url"
                              ></a-input>
                        </a-form-item>
                        <a-form-item label="启用ldaps">
                              <a-checkbox v-model:checked="config.ldap.ldaps"></a-checkbox>
                        </a-form-item>
                        <a-form-item label="LDAP管理员DN:">
                              <a-input placeholder="请填写管理员DN" v-model="config.ldap.user"></a-input>
                        </a-form-item>
                        <a-form-item label="LDAP管理员密码:">
                              <a-input
                                    placeholder="请填写管理员密码"
                                    v-model="config.ldap.password"
                                    type="password"
                              ></a-input>
                        </a-form-item>
                        <a-form-item label="LDAP_Search filter:">
                              <a-input
                                    v-model="config.ldap.type"
                                    placeholder="例如:(&(objectClass=organizationalPerson)(sAMAccountName=%s))，%s为占位符必须存在"
                              ></a-input>
                        </a-form-item>
                        <a-form-item label="LDAP_SCBASE:">
                              <a-input placeholder="LDAP Search Base" v-model="config.ldap.sc"></a-input>
                        </a-form-item>
                        <a-form-item label="操作:">
                              <a-button type="primary" @click="request.Test('ldap', config)">ldap测试</a-button>
                        </a-form-item>
                        <a-alert message="Warning" type="warning" show-icon>
                              <template #icon>
                                    <SmileOutlined></SmileOutlined>
                              </template>
                              <template #description>
                                    1.LDAP登录用户名，必须全局唯一。ldap配置请参考Grafana。
                                    <br />
                                    <br />2.由于各个邮件服务提供商对于垃圾邮件过滤的机制各不相同，可能会造成邮件无法接收的情况。所以使用前请测试是否稳定。对于使用了ssl安全协议的stmp连接需勾选启动ssl端口复选框
                                    <br />
                                    <br />3.只有开启相应的消息推送开关后，消息推送才会开启。
                                    <br />
                              </template>
                        </a-alert>
                  </a-form>
            </a-col>
      </a-row>
      <a-row>
            <a-col :span="10">
                  <a-divider orientation="left">进阶设置</a-divider>
                  <a-form v-bind="layout">
                        <a-form-item label="查询最大Limit限制:">
                              <a-input-number v-model:value="config.other.limit"></a-input-number>
                        </a-form-item>
                        <a-form-item label="自定义环境:">
                              <a-tag
                                    v-for="item in config.other.idc"
                                    color="#B38D57"
                                    closable
                                    @close="closeTag(item)"
                              >{{ item }}</a-tag>
                              <br />
                              <br />
                              <a-space>
                                    <a-input placeholder="环境名称" v-model:value="config.other.foce"></a-input>
                                    <a-button @click="pushEnv">添加环境</a-button>
                              </a-space>
                        </a-form-item>
                        <a-form-item label="查询审核:">
                              <a-switch v-model:checked="config.other.query"></a-switch>
                        </a-form-item>
                        <a-form-item label="查询时限:">
                              <a-input-number
                                    placeholder="查询时限:"
                                    v-model:value="config.other.ex_query_time"
                                    :min="1"
                              ></a-input-number>分
                        </a-form-item>
                  </a-form>
            </a-col>
            <a-col :span="11" offset="1">
                  <a-divider orientation="left">数据清除</a-divider>
                  <a-form v-bind="layout">
                        <a-form-item label="指定日期前的工单:">
                              <a-space>
                                    <a-range-picker
                                          show-time
                                          v-model:value="config.other.overdue"
                                          format="YYYY/MM/DD HH:mm"
                                          :ranges="dateRanges"
                                    />
                                    <a-popconfirm
                                          title="确认删除工单么?"
                                          @confirm="request.Delete({ date: config.other.overdue.map(item => item.format('YYYY-MM-DD HH:mm')), tp: false })"
                                    >
                                          <a-button>删除</a-button>
                                    </a-popconfirm>
                              </a-space>
                        </a-form-item>
                        <a-form-item label="指定日期前的查询工单:">
                              <a-space>
                                    <a-range-picker
                                          show-time
                                          v-model:value="config.other.query_expire"
                                          format="YYYY/MM/DD HH:mm"
                                          :ranges="dateRanges"
                                    />
                                    <a-popconfirm
                                          title="确认删除工单么?"
                                          @confirm="request.Delete({ date: config.other.query_expire.map(item => item.format('YYYY-MM-DD HH:mm')), tp: true })"
                                    >
                                          <a-button>删除</a-button>
                                    </a-popconfirm>
                              </a-space>
                        </a-form-item>
                        <a-alert message="Warning" type="warning" show-icon>
                              <template #icon>
                                    <SmileOutlined></SmileOutlined>
                              </template>
                              <template #description>
                                    1.设置最大Limit数后，所有的查询语句的查询结果都不会超过这个数值。
                                    <br />
                                    <br />2.查询审核开关开启后，所有的查询都必须通过管理员同意才能进行。关闭则可自主查询
                              </template>
                        </a-alert>
                  </a-form>
                  <br />
                  <a-button type="primary" block @click="request.Post(config)">保存</a-button>
            </a-col>
      </a-row>
</template>

<script lang="ts" setup>
import { DeleteOrder, Request, Settings } from '@/apis/setting';
import PageHeader from '@/components/pageHeader/pageHeader.vue';
import { Res } from '@/config/request';
import CommonMixins from "@/mixins/common"
import { SmileOutlined } from '@ant-design/icons-vue';
import { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

const title = {
      title: "平台设置",
      subTitle: "根据实际使用场景设置"
}

const { layout } = CommonMixins()

const config = ref({
      message: {},
      ldap: {},
      other: {}
} as Settings)

const request = new Request

const dateRanges = { '本月': [dayjs().startOf('month'), dayjs().endOf('month')] }

const pushEnv = () => {
      config.value.other.idc.push(config.value.other.foce)
      config.value.other.foce = ""
}

const currentPage = () => {
      request.Get().then((res: AxiosResponse<Res<Settings>>) => {
            config.value = res.data.payload
      })
}
const closeTag = (e: string) => {
      config.value.other.idc = config.value.other.idc.filter(item => item !== e);
}

onMounted(() => {
      currentPage()
})

</script>