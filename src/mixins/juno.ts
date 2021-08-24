import { ref } from "vue";

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
      return {
            col
      }
}