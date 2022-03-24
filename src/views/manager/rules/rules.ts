interface Rule {
      desc: string
      name: string
      type: string
      tp: number
}

const rule: Rule[] = [
      {
            name: 'DDLCheckTableComment',
            desc: '强制表必须拥有表注释',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDlCheckColumnComment',
            desc: '强制表字段必须拥有列注释',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLCheckColumnNullable',
            desc: '强制非timestamp类型字段必须为NOT NULL',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLCheckColumnDefault',
            desc: '强制非text,blob,json,timestamp类型字段必须拥有默认值',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLCheckFloatDouble',
            desc: '强制float/double类型变更为decimal类型',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableAutoincrementInit',
            desc: '强制自增列初始值为1',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLPrimaryKeyMust',
            desc: '强制主键名称为ID',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableAutoIncrement',
            desc: '强制主键为自增列',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableAutoincrementUnsigned',
            desc: '强制主键必须使用无符号标志unsigned',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLIndexNameSpec',
            desc: '开启索引名称规范(索引名必须以idx_为开头)',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'CheckIdentifier',
            desc: '开启mysql关键词检查',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableAcrossDBRename',
            desc: '允许跨库表迁移',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableDropTable',
            desc: '允许删除表',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableDropDatabase',
            desc: '允许删除库',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLAllowPRINotInt',
            desc: '允许主键类型为非int/bigint',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableNullIndexName',
            desc: '允许索引名为空',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLMultiToCommit',
            desc: '允许单个工单提交多条DDL语句',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLAllowColumnType',
            desc: '允许字段进行类型转换(不同字段之间的转换或长度从长变短。如:int -> bigint,int(50) -> int(20))',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLAllowChangeColumnPosition',
            desc: '允许使用after/first',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'AllowCreateView',
            desc: '允许创建视图',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'AllowCreatePartition',
            desc: '允许创建分区表',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'AllowSpecialType',
            desc: '允许添加bit,enum,set类型字段',
            type: 'DDL',
            tp: 0
      },
      {
            name: 'SupportCollation',
            desc: 'create/alter 表或字段时允许的Collate范围。多个请使用逗号进行分割',
            type: 'DDL',
            tp: 2
      },
      {
            name: 'SupportCharset',
            desc: 'create/alter 表或字段时允许的Charset范围。多个请使用逗号进行分割',
            type: 'DDL',
            tp: 2
      },
      {
            name: 'MustHaveColumns',
            desc: '建表必须拥有的字段,多个字段请用逗号分隔',
            type: 'DDL',
            tp: 2
      },
      {
            name: 'DDLMaxKeyParts',
            desc: '单个索引指定字段上限',
            type: 'DDL',
            tp: 1
      },
      {
            name: 'DDLMaxKey',
            desc: '单个表最多允许几个索引',
            type: 'DDL',
            tp: 1
      },
      {
            name: 'MaxDDLAffectRows',
            desc: 'DDL最大影响行数',
            type: 'DDL',
            tp: 1
      },
      {
            name: 'DDLMaxCharLength',
            desc: 'char字段最大长度',
            type: 'DDL',
            tp: 1
      },
      {
            name: 'MaxTableNameLen',
            desc: '表名最大长度限制',
            type: 'DDL',
            tp: 1
      },
      {
            name: 'DMLMaxInsertRows',
            desc: 'Insert最大插入行数上限',
            type: 'DML',
            tp: 1
      },
      {
            name: 'DMLAllowLimitSTMT',
            desc: '允许update/insert 语句使用limit关键字',
            type: 'DML',
            tp: 0
      },
      {
            name: 'DDLImplicitTypeConversion',
            desc: '不允许隐式转换',
            type: 'DML',
            tp: 0
      },
      {
            name: 'DMLInsertColumns',
            desc: '检查Insert语句中插入的字段名是否存在',
            type: 'DML',
            tp: 0
      },
      {
            name: 'DMLWhere',
            desc: '强制DML语句必须拥有where条件',
            type: 'DML',
            tp: 0
      },
      {
            name: 'DMLOrder',
            desc: '禁止DML语句使用Order by子句',
            type: 'DML',
            tp: 0
      },
      {
            name: 'DMLSelect',
            desc: '禁止DML语句使用Select子句',
            type: 'DML',
            tp: 0
      },
      {
            name: 'MaxAffectRows',
            desc: 'DML最大影响行数',
            type: 'DML',
            tp: 1
      },
      {
            name: 'IsOSC',
            desc: '开启相关在线表变更工具',
            type: 'Online-DDL',
            tp: 0
      },
      {
            name: 'OscSize',
            desc: '表体系大于该值后出发在线表变更同步，单位:M',
            type: 'Online-DDL',
            tp: 1
      },
      {
            name: 'OSCExpr',
            desc: '同步工具参数。如: PT-OSC中的--dry-run 请注意! 此处仅填写参数。请使用以下变量名替换对应输入值 $SQL $ADDR $PORT $USER $PASSWORD $SCHEMA $TABLE。例子: (pt-osc配置) pt-online-schema-change  --alter $SQL --user=$USER  --password=$PASSWORD  --host=$ADDR P=$PORT,D=$SCHEMA,t=$TABLE  --execute',
            type: 'Online-DDL',
            tp: 3
      },
]


export {
      rule,
      Rule
}