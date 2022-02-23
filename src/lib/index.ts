import i18n from "@/lang"
import { OrderState, QueryState } from "@/types"
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from "@ant-design/icons-vue"
import mitt from 'mitt'
// @ts-ignore
const { t } = i18n.global

export const StateUsege = (state: number) => {
      switch (state) {
            case OrderState.PROCESS:
                  return { color: "#408B9B", title: t('order.state.process'), icon: SyncOutlined }
            case OrderState.WAIT:
                  return { color: "#408B9B", title: t('order.state.wait'), icon: SyncOutlined }
            case OrderState.AUDIT:
                  return { color: "#408B9B", title: t('order.state.audit'), icon: SyncOutlined }
            case OrderState.SUCCESS:
                  return { color: "#43A687", title: t('order.state.success'), icon: CheckCircleOutlined }
            case OrderState.REJECT:
                  return { color: "#EA495F", title: t('order.state.reject'), icon: CloseCircleOutlined }
            case OrderState.ERROR:
                  return { color: "#EA495F", title: t('order.state.error'), icon: CloseCircleOutlined }
            default:
                  return {}
      }
}

export const StateQueryUsege = (state: number) => {
      switch (state) {
            case QueryState.AUDIT:
                  return { color: "#408B9B", title: t('order.state.audit'), icon: SyncOutlined }
            case QueryState.PROCESS:
                  return { color: "#408B9B", title: t('order.query.audit.state.process'), icon: SyncOutlined }
            case QueryState.DONE:
                  return { color: "#EA495F", title: t('order.query.audit.state.done'), icon: CloseCircleOutlined }
            case QueryState.REJECT:
                  return { color: "#EA495F", title: t('order.state.reject'), icon: CloseCircleOutlined }
            default:
                  return {}
      }
}

interface wsRecv {
      data: any
}

export const EventBus = mitt()