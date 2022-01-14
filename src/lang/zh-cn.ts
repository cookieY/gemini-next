import setting from "@/lang/zh-cn/setting"
import common from "@/lang/zh-cn/common"
import menu from "@/lang/zh-cn/menu"
import autoTask from "./zh-cn/autoTask";
import order from "./zh-cn/order";
import antdZhCN from 'ant-design-vue/es/locale/zh_CN';


const components = {
      antLocale: antdZhCN,
      DayJsName: 'zh-cn',
}

export default {
      ...components,
      ...setting,
      ...common,
      ...menu,
      ...autoTask,
      ...order
}