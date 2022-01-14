import i18n from '@/lang'

const { t } = i18n.global

export default function () {
      const col = [
            {
                  title: t('common.table.work_id'),
                  dataIndex: 'work_id',
                  width: 200
            },
            {
                  title: t('common.table.remark'),
                  dataIndex: 'text',
            },
            {
                  title: t('common.table.type'),
                  dataIndex: 'type',
            },
            {
                  title: t('common.table.post.time'),
                  dataIndex: 'date',
            },
            {
                  title: t('common.table.post.user'),
                  dataIndex: 'username',
            },
            {
                  title: t('common.table.post.real_name'),
                  dataIndex: 'real_name',

            },
            {
                  title: t('order.profile.timing'),
                  dataIndex: 'delay',
            },
            {
                  title: t('order.profile.auditor'),
                  dataIndex: 'assigned',
            },
            {
                  title: t('common.table.state'),
                  dataIndex: 'status',

            },
            {
                  title: t('common.action'),
                  dataIndex: 'action',
                  width: 200,
            }
      ];
      return {
            col
      }
}