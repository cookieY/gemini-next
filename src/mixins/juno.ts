import { reactive, UnwrapRef } from "vue";
import { OrderItem } from "@/types";
import i18n from "@/lang"

const { t } = i18n.global

export default function () {

      const col = [
            {
                  title: t('common.table.stage'),
                  dataIndex: "status"
            },
            {
                  title: t('common.table.level'),
                  dataIndex: "level"
            },
            {
                  title: t('common.table.error'),
                  dataIndex: "error"
            },
            {
                  title: t('common.table.sql'),
                  dataIndex: 'sql',
                  tooltip: true
            },
            {
                  title: t('common.table.max'),
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
            type: -1,
            idc: "",
            source: "",
            data_base: "",
            table: "",
            text: "",
            delay: "",
            backup: 1,
            sql: "",
            source_id: "",
            relevant: [] as string[]
      })

      return {
            col,
            orderItems,
            tableArch,
            indexArch
      }
}