import { reactive, UnwrapRef } from 'vue';
import { OrderItem } from '@/types';
import i18n from '@/lang';
// @ts-ignore
const { t } = i18n.global;
export default function () {
  const col = [
    {
      title: t('common.table.stage'),
      dataIndex: 'status',
    },
    {
      title: t('common.table.level'),
      dataIndex: 'level',
    },
    {
      title: t('common.table.error'),
      dataIndex: 'error',
    },
    {
      title: t('common.table.sql'),
      dataIndex: 'sql',
      ellipsis: true,
    },
    {
      title: t('common.table.max'),
      dataIndex: 'affect_rows',
      width: '120',
    },
  ];

  const tableArch = [
    {
      title: t('order.table.field'),
      dataIndex: 'field',
    },
    {
      title: t('order.table.type'),
      dataIndex: 'type',
    },
    {
      title: t('order.table.isnull'),
      dataIndex: 'null',
    },
    {
      title: t('order.table.default'),
      dataIndex: 'default',
    },
    {
      title: t('order.table.extra'),
      dataIndex: 'comment',
    },
  ];

  const indexArch = [
    {
      title: t('order.table.index'),
      dataIndex: 'IndexName',
    },
    {
      title: t('order.table.isunique'),
      dataIndex: 'NonUnique',
    },
    {
      title: t('order.table.field'),
      dataIndex: 'ColumnName',
    },
  ];

  const orderItems: UnwrapRef<OrderItem> = reactive({
    type: -1,
    idc: '',
    source: '',
    data_base: '',
    table: '',
    text: '',
    delay: '',
    backup: 1,
    sql: '',
    source_id: '',
    relevant: [] as string[],
  });

  return {
    col,
    orderItems,
    tableArch,
    indexArch,
  };
}
