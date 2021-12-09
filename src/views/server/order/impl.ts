export const checkTitle = (audit: string): { [key: string]: string } => {
      return audit === "audit" ? { title: "工单审核", subTitle: "DML/DDL工单审批及执行" } : { title: "我的工单", subTitle: "我的DML/DDL工单查看" }
}