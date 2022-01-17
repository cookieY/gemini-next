
import enUS from "./en-us"
import zhCN from "./zh-cn"
import { createI18n } from 'vue-i18n'

const messages = {
      'en-US': {
            ...enUS
      },
      'zh-CN': {
            ...zhCN
      }
}


export let defaultLang = 'zh-CN'


const i18n = createI18n({
      globalInjection: true,
      silentTranslationWarn: true,
      locale: defaultLang,
      fallbackLocale: defaultLang,
      messages
})

export default i18n