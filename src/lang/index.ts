
import enUS from "./en-us"
import zhCN from "./zh-cn"
import { createI18n } from "vue-i18n";

const messages = {
      'en_US': {
            ...enUS
      },
      'zh_CN': {
            ...zhCN
      }
}


export let defaultLang = 'en_US'
if (localStorage.getItem("lang") === null) {
      defaultLang = 'zh_CN'
} else {
      defaultLang = localStorage.getItem("lang") as string
}

const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      silentTranslationWarn: true,
      locale: defaultLang,
      fallbackLocale: defaultLang,
      messages
})

export default i18n