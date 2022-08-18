import setting from "@/lang/zh-cn/setting"
import common from "@/lang/zh-cn/common"
import menu from "@/lang/zh-cn/menu"
import autoTask from "./zh-cn/autoTask";
import order from "./zh-cn/order";
import user from "./zh-cn/user";
import antdZhCN from 'ant-design-vue/es/locale/zh_CN';
import record from "./zh-cn/record"
import query from "./zh-cn/query";
import db from "./zh-cn/db"
import flow from "./zh-cn/flow"
import rule from "./zh-cn/rule"


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
      ...order,
      ...user,
      ...record,
      ...query,
      ...db,
      ...flow,
      ...rule,
}