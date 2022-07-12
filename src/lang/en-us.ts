import setting from "@/lang/en-us/setting"
import common from "@/lang/en-us/common"
import menu from "@/lang/en-us/menu"
import autoTask from "./en-us/autoTask";
import order from "./en-us/order";
import antdEnUS from 'ant-design-vue/es/locale/en_US';
import user from "@/lang/en-us/user"
import reocrd from "./en-us/record"
import query from "./en-us/query";
import db from "./en-us/db"
import flow from "./en-us/flow"


const components = {
      antLocale: antdEnUS,
      DayJsName: 'en-us',
}

export default {
      ...components,
      ...setting,
      ...common,
      ...menu,
      ...autoTask,
      ...order,
      ...user,
      ...reocrd,
      ...query,
      ...db,
      ...flow
}