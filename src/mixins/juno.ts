import { reactive, UnwrapRef } from "vue";
import { OrderItem } from "@/types";

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
      ]
      const tableArch = [
            {
                  title: '字段名',
                  dataIndex: 'field'
            },
            {
                  title: '字段类型',
                  dataIndex: 'type',
            },
            {
                  title: '字段是否为空',
                  dataIndex: 'null',
            },
            {
                  title: '默认值',
                  dataIndex: 'default',
            },
            {
                  title: '备注',
                  dataIndex: 'comment'
            }
      ]

      const indexArch = [
            {
                  title: '索引名称',
                  dataIndex: 'IndexName'
            },
            {
                  title: '是否唯一',
                  dataIndex: 'NonUnique',
                  slots: {
                        customRender: 'NonUnique'
                  }
            },
            {
                  title: '字段名',
                  dataIndex: 'ColumnName'
            }
      ];

      const orderItems: UnwrapRef<OrderItem> = reactive({
            type: "",
            idc: "",
            source: "",
            data_base: "",
            table: "",
            text: "",
            delay: "",
            backup: 1,
            sql: "",
            relevant: [] as string[]
      })

      return {
            col,
            orderItems,
            tableArch,
            indexArch
      }
}