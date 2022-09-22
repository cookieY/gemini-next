import { reactive, ref } from 'vue';
import { RuleObject } from 'ant-design-vue/es/form/interface';
import i18n from '@/lang';
// @ts-ignore
const { t } = i18n.global;

export default function () {
  const is_open = ref(false);

  function close() {
    is_open.value = false;
  }

  function open() {
    is_open.value = true;
  }

  const pagination = reactive({
    pageSize: 15,
    pageCount: 1,
  });

  const checkStepState = (type: number) => {
    if (type === -1) {
      return t('common.step.commit');
    } else if (type === 0) {
      return t('common.step.audit');
    } else if (type === 1) {
      return t('common.step.execute');
    } else {
      return t('common.step.done');
    }
  };

  const regExpPassword = async (rule: RuleObject, value: string) => {
    const pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!pPattern.test(value)) {
      return Promise.reject(t('user.form.valid.password'));
    } else {
      return Promise.resolve();
    }
  };

  const turnState = () => {
    is_open.value = !is_open.value;
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const taskTp = [
    {
      title: 'Insert',
      v: 0,
    },
    {
      title: 'Update',
      v: 1,
    },
    {
      title: 'Delete',
      v: 2,
    },
  ];

  return {
    pagination,
    is_open,
    open,
    close,
    regExpPassword,
    turnState,
    layout,
    taskTp,
    checkStepState,
  };
}
