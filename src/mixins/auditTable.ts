export default function () {
    const col = [
        {
            title: '工单编号:',
            dataIndex: 'work_id',
            width: 200
        },
        {
            title: '工单说明:',
            dataIndex: 'text',
        },
        {
            title: '工单类型',
            dataIndex: 'type',
        },
        {
            title: '提交时间:',
            dataIndex: 'date',
        },
        {
            title: '提交账号',
            dataIndex: 'username',
        },
        {
            title: '真实姓名',
            dataIndex: 'real_name',

        },
        {
            title: '定时执行',
            dataIndex: 'delay',
        },
        {
            title: '当前操作人',
            dataIndex: 'assigned',
        },
        {
            title: '状态',
            dataIndex: 'status',

        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 200,
        }
    ];
    return {
        col
    }
}