import { ref } from "vue";

export default function () {
      const col = [
            {
                  title: '工单编号:',
                  dataIndex: 'work_id',
                  sortable: true,
                  sortType: 'desc',
                  width: 155
            },
            {
                  title: '工单说明:',
                  dataIndex: 'text',
                  tooltip: true
            },
            {
                  title: '工单类型',
                  dataIndex: 'type',
            },
            {
                  title: '提交时间:',
                  dataIndex: 'date',
                  sortable: true
            },
            {
                  title: '提交账号',
                  dataIndex: 'username',
                  sortable: true
            },
            {
                  title: '真实姓名',
                  dataIndex: 'real_name',
                  sortable: true
            },
            {
                  title: '定时执行',
                  dataIndex: 'delay',
                  slot: 'delay'
            },
            {
                  title: '当前操作人',
                  dataIndex: 'assigned',
                  sortable: true
            },
            {
                  title: '状态',
                  dataIndex: 'status',
                  width: 150,
                  sortable: true
            },
            {
                  title: '操作',
                  dataIndex: 'action',
                  width: 200,
                  align: 'center',
                  slot: 'action'
            }
      ];
      return {
            col
      }
}