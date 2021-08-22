import moment from "moment"

const FeatureList = [
      "1.支持审核人移动端(手机)审核工单",
      "2.支持自定义hook消息推送",
      "3.支持SQL文件上传提取语句",
      "4.专属微信群,及时解决问题",
      "5.额外的审核规则支持",
      "6.工单复制(适用于多环境工单流转)",
      "7.搜索功能支持多条件合并搜索"
]
const Version = "ver.2.4.0"

const Copyright = `© 2018-${moment().format("YYYY")}  Created by HenryYee `

export { FeatureList, Version, Copyright }