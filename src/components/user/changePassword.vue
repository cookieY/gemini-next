<template>
      <a-modal
            v-model:visible="is_open"
            :title="$t('user.password.title')"
            @ok="handlePassword"
            @cancel="Object.assign(formItem, initItem)"
      >
            <a-form ref="formRef" :model="formItem" :rules="rules" layout="vertical">
                  <a-form-item :label="$t('user.password.old')" name="origin" has-feedback>
                        <a-input-password v-model:value="formItem.origin" password></a-input-password>
                  </a-form-item>
                  <a-form-item :label="$t('user.password.new')" name="password" has-feedback>
                        <a-input-password v-model:value="formItem.password"></a-input-password>
                  </a-form-item>
                  <a-form-item
                        :label="$t('user.password.confirm')"
                        name="confirm_password"
                        has-feedback
                  >
                        <a-input-password v-model:value="formItem.confirm_password"></a-input-password>
                  </a-form-item>
            </a-form>
      </a-modal>
</template>
<script lang="ts" setup>
import { UnwrapRef, reactive } from "vue"
import { Password, ChangePasswordApi } from "@/apis/user";
import CommonMixins from "@/mixins/common"
import { RuleObject } from 'ant-design-vue/es/form/interface';

interface propsAttr {
      user: string
      isManager?: boolean
}

const props = withDefaults(defineProps<propsAttr>(), {
      isManager: false
})

const formItem: UnwrapRef<Password> = reactive({
      password: "",
      confirm_password: "",
      origin: ""
})

const initItem = Object.assign({}, formItem)

const { is_open, regExpPassword, turnState } = CommonMixins()


const validPassword = async (rule: RuleObject, value: string) => {
      if (value !== formItem.password && value !== "") {
            return Promise.reject('输入的密码不一致')
      } else {
            return Promise.resolve();
      }
};

const rules = {
      origin: [{ message: "请输入原密码", trigger: 'blur', required: true }],
      password: [{ validator: regExpPassword, trigger: 'blur', required: true }],
      confirm_password: [{ trigger: 'blur', message: "请确认密码", required: true }, { required: true, validator: validPassword, trigger: 'blur' }],

}

const handlePassword = () => {
      ChangePasswordApi(formItem, props.user, props.isManager).then(() => turnState()).finally(() => Object.assign(formItem, initItem))
}

const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
};

defineExpose({
      turnState,
      handlePassword
})

</script>