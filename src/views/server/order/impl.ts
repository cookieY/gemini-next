import i18n from '@/lang'

const { t } = i18n.global

export const checkTitle = (audit: string): { [key: string]: string } => {
      return audit === "audit" ? { title: t('menu.order.order') + t('menu.order.title'), subTitle: t('order.desc.audit') } : { title: t('menu.order.self'), subTitle: t('order.desc.self') }
}