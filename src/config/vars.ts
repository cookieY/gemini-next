import dayjs from 'dayjs';

const FeatureList = [
  '1.支持审核人移动端(手机)审核工单',
  '2.支持自定义hook消息推送',
  '3.支持SQL文件上传提取语句',
  '4.专属微信群,及时解决问题',
  '5.额外的审核规则支持',
  '6.工单复制(适用于多环境工单流转)',
  '7.搜索功能支持多条件合并搜索',
];

const Announce = [
  'Yearning MYSQL SQL语句审核平台。提供查询，SQL审核等多种功能。非常欢迎大家体验并使用Yearning!',
  '关于二次开发的声明:',
  '作为一款开源平台。Yearning很希望有更多的开发者一起参与到开发中。同时也鼓励各公司根据自身业务对平台进行二次开发及定制。',
  'Yearning 采用AGPL 3.0许可证,以下为许可中相关的义务与责任。',
  '1.未经原作者授权不得将Yearning 用于任何商业目的。包括通过网络提供任何基于Yearning的商业服务。',
  '2.如果你修改了代码，需要在被修改的文件中说明。',
  '3.如二次开发并公布的情况下(内部使用不在该条款之内)，该软件必须为开源项目，不可为任何商业性质的商业软件。如需商业化必须获得原作者授权。',
  '4.本平台所有条款符合相应开源许可，请严格按照相关许可使用及开发。',
  '免责声明:',
  '由Yearning平台所产生的一切后果,Yearning作者本人不负一切责任! 请在进行安全评估及测试体验后使用。',
  '当然用的喜欢,就打赏下我吧 ^_^ 登录界面赞助按钮',
];

const AnnounceEN = [
  'Yearning MYSQL SQL statement auditing platform. Provide query, SQL audit and other functions. You are welcome to try and use Yearning!',
  'Declaration regarding secondary Development:',
  'As an open source platform. Ten years ago, we would like to see more developers come together. Companies are also encouraged to re-develop and customize the platform for their own business.',
  'Yearning is licensed under an AGPL 3.0 license. The following are the obligations and responsibilities associated with this license.',
  '1. Yearning shall not be used for any commercial purpose without the authorization of the original author. Including providing any jack-based commercial service over the web.',
  '2. If you change the code, you need to explain it in the modified file.',
  '3. In the case of secondary development and publication (internal use is not covered by this clause), the software must be an open source project and not commercial software of any commercial nature. To commercialize must obtain original authorship.',
  '4. All terms of the platform comply with the relevant open source license, please use and develop in strict accordance with the relevant license.',
  'Disclaimer :',
  'Yearning platform produced by all the consequences, Yearning author himself is not responsible for all! Please use it after safety evaluation and testing experience.',
  'Of course you like it, please tip me to login interface sponsorship button ',
];

const Version = 'ver.2.4.0';

const Copyright = `Yearning © 2018-${dayjs().format(
  'YYYY'
)}  Created by HenryYee `;

export { FeatureList, Version, Copyright, Announce, AnnounceEN };
