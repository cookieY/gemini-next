import { reactive, ref } from "vue";
import { RuleObject } from 'ant-design-vue/es/form/interface';

export default function () {
      const is_open = ref(false)

      function close () {
            is_open.value = false
      }

      function open () {
            is_open.value = true
      }

      const pagination = reactive({
            pageSize: 15,
            pageCount: 1,
      })

      const regExpPassword = async (rule: RuleObject, value: string) => {
            let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
            if (!pPattern.test(value)) {
                  return Promise.reject('至少1个大写字母，1个小写字母，1个数字')
            } else {
                  return Promise.resolve();
            }
      }


      const turnState = () => {
            is_open.value = !is_open.value
      }

      const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
      }

      return {
            pagination,
            is_open,
            open,
            close,
            regExpPassword,
            turnState,
            layout
      }
}