<template>
  <a-form ref="formRef" :model="registerForm" :rules="rules" v-bind="layout">
    <a-form-item :label="$t('user.form.user')" name="username" has-feedback>
      <a-input v-model:value="registerForm.username"></a-input>
    </a-form-item>
    <a-form-item :label="$t('user.form.password')" name="password" has-feedback>
      <a-input v-model:value="registerForm.password" type="password"></a-input>
    </a-form-item>
    <a-form-item
      :label="$t('user.form.confirm')"
      name="confirm_password"
      has-feedback
    >
      <a-input
        v-model:value="registerForm.confirm_password"
        type="password"
      ></a-input>
    </a-form-item>
    <a-form-item
      :label="$t('user.form.real_name')"
      name="real_name"
      has-feedback
    >
      <a-input v-model:value="registerForm.real_name"></a-input>
    </a-form-item>
    <a-form-item :label="$t('user.form.dept')" name="department" has-feedback>
      <a-input v-model:value="registerForm.department"></a-input>
    </a-form-item>
    <a-form-item :label="$t('user.form.email')" name="email" has-feedback>
      <a-input v-model:value="registerForm.email"></a-input>
    </a-form-item>
    <a-form-item :label="$t('common.action')">
      <a-button type="primary" @click="registered">{{
        $t('user.form.title')
      }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import CommonMixins from '@/mixins/common';
  import { reactive, UnwrapRef, ref, withDefaults } from 'vue';
  import { RegisterForm, Request } from '@/apis/user';
  import { RuleObject } from 'ant-design-vue/es/form/interface';
  import { EventBus } from '@/lib';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  interface propsAttr {
    isManager: boolean;
  }

  const props = withDefaults(defineProps<propsAttr>(), {
    isManager: false,
  });

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const registerForm: UnwrapRef<RegisterForm> = reactive({
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    real_name: '',
    department: '',
  });

  const request = new Request();

  const { regExpPassword } = CommonMixins();

  let validPassword = async (rule: RuleObject, value: string) => {
    if (value !== registerForm.password && value !== '') {
      return Promise.reject(t('user.form.valid.valid'));
    } else {
      return Promise.resolve();
    }
  };

  const rules = {
    username: [
      { trigger: 'blur', message: t('user.form.valid.user'), required: true },
    ],
    password: [{ validator: regExpPassword, trigger: 'blur', required: true }],
    confirm_password: [
      {
        trigger: 'blur',
        message: t('user.form.valid.confirm'),
        required: true,
      },
      { required: true, validator: validPassword, trigger: 'blur' },
    ],
    real_name: [
      {
        trigger: 'blur',
        message: t('user.form.valid.real_name'),
        required: true,
      },
    ],
    department: [
      { trigger: 'blur', message: t('user.form.valid.dept'), required: true },
    ],
    email: [
      {
        type: 'email',
        message: t('user.form.valid.email'),
        trigger: 'blur',
        required: true,
      },
    ],
  };

  const formRef = ref();

  const registered = (): boolean =>
    formRef.value.validate().then(() => {
      request.Register(registerForm, props.isManager).then(() => {
        resetFields();
        EventBus.emit('closeState');
      });
    });

  const resetFields = () => {
    formRef.value.resetFields();
  };

  defineExpose({
    registered,
    resetFields,
  });
</script>
