import { RuleObject } from 'ant-design-vue/es/form/interface';
export default function () {
      const regExp_Name = (rule: RuleObject, value: string) => {
            let pPattern = new RegExp("[`~!@#$^&*()={}':;',\\[\\]<>/?~！@#￥……&*（）——{}【】‘；：”“'。，、？]");
            if (pPattern.test(value)) {
                  return Promise.reject('特殊字符仅可使用|与-');
            } else {
                  return Promise.resolve();
            }
      };

      const regExp_password = (rule: RuleObject, value: string) => {
            let pPattern = new RegExp("[`?？^$]");
            if (pPattern.test(value)) {
                  return Promise.reject('密码中不得含有? @ ^ $')
            } else {
                  return Promise.resolve();
            }
      };
      const rules = {
            idc: [{ required: true, message: '请选择对应环境', trigger: 'change' }],
            source: [{ required: true, message: '请填写连接名称', trigger: 'blur', }, { validator: regExp_Name, trigger: 'blur' }],
            ip: [{ required: true, message: '请填写连接地址', trigger: 'blur' }],
            username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
            port: [{ required: true, message: '请填写端口', trigger: 'blur', type: 'number' }],
            flow_id: [{ required: true, message: '请选择流程', trigger: 'change' }],
            principal: [{ required: true, message: '请选择负责人', trigger: 'change' }],
            password: [{ required: true, message: '请填写密码', trigger: 'blur' }, { validator: regExp_password, trigger: 'blur' }]
      }

      return {
            rules
      }
}