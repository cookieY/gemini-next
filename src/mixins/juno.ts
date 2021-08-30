import { reactive, ref, UnwrapRef } from "vue";
import { OrderItem } from "@/views/common/types";

export default function () {
      const col = [
            {
                  title: "阶段",
                  dataIndex: "status"
            },
            {
                  title: "错误等级",
                  dataIndex: "level"
            },
            {
                  title: "错误信息",
                  dataIndex: "error"
            },
            {
                  title: '当前检查的sql',
                  dataIndex: 'sql',
                  tooltip: true
            },
            {
                  title: '影响行数',
                  dataIndex: 'affect_rows',
                  width: '120'
            }
      ],

            orderItems: UnwrapRef<OrderItem> = reactive({
                  type: "",
                  idc: "",
                  source: "",
                  data_base: "",
                  table: "",
                  text: "",
                  delay: "",
                  backup: 1
            })

      return {
            col,
            orderItems
      }
}