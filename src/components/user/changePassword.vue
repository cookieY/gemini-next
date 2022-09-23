<template>
  <a-modal
    :title="$t('user.password.title')"
    v-on="$attrs"
    @cancel="Object.assign(formItem, initItem)"
    @ok="
      emit('post', formItem);
      Object.assign(formItem, initItem);
    "
  >
    <a-form ref="formRef" :model="formItem" :rules="rules" layout="vertical">
      <a-form-item
        :label="$t('user.password.new')"
        name="password"
        has-feedback
      >
        <a-input-password v-model:value="formItem.password"></a-input-password>
      </a-form-item>
      <a-form-item
        :label="$t('user.password.confirm')"
        name="confirm_password"
        has-feedback
      >
        <a-input-password
          v-model:value="formItem.confirm_password"
        ></a-input-password>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { UnwrapRef, reactive } from 'vue';
  import { Password } from '@/apis/user';
  import CommonMixins from '@/mixins/common';
  import { RuleObject } from 'ant-design-vue/es/form/interface';

  const formItem: UnwrapRef<Password> = reactive({
    password: '',
    confirm_password: '',
    origin: '',
  });

  const emit = defineEmits(['post']);

  const initItem = Object.assign({}, formItem);

  const { regExpPassword } = CommonMixins();

  const validPassword = async (rule: RuleObject, value: string) => {
    if (value !== formItem.password && value !== '') {
      return Promise.reject('输入的密码不一致');
    } else {
      return Promise.resolve();
    }
  };

  const rules = {
    origin: [{ message: '请输入原密码', trigger: 'blur', required: true }],
    password: [{ validator: regExpPassword, trigger: 'blur', required: true }],
    confirm_password: [
      { trigger: 'blur', message: '请确认密码', required: true },
      { required: true, validator: validPassword, trigger: 'blur' },
    ],
  };
</script>
