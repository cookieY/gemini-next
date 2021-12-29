import { OrderState } from "@/types"
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from "@ant-design/icons-vue"
import mitt from 'mitt'

export const StateUsege = (state: number) => {
      switch (state) {
            case OrderState.PROCESS:
                  return { color: "#B38D57", title: "执行中", icon: SyncOutlined }
            case OrderState.WAIT:
                  return { color: "#B38D57", title: "待执行", icon: SyncOutlined }
            case OrderState.AUDIT:
                  return { color: "#B38D57", title: "审核中", icon: SyncOutlined }
            case OrderState.SUCCESS:
                  return { color: "#43A687", title: "已执行", icon: CheckCircleOutlined }
            case OrderState.REJECT:
                  return { color: "#EA495F", title: "已驳回", icon: CloseCircleOutlined }
            case OrderState.ERROR:
                  return { color: "#EA495F", title: "执行失败", icon: CloseCircleOutlined }
            default:
                  return {}

      }
}

export const EventBus = mitt()