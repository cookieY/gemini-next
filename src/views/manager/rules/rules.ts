import i18n from "@/lang"

interface Rule {
      desc: string
      name: string
      type: string
      tp: number
}

const { t } = i18n.global

const rule: Rule[] = [
      {
            name: 'DDLCheckTableComment',
            desc: t('DDLCheckTableComment'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDlCheckColumnComment',
            desc: t('DDlCheckColumnComment'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLCheckColumnNullable',
            desc: t('DDLCheckColumnNullable'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLCheckColumnDefault',
            desc: t('DDLCheckColumnDefault'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLCheckFloatDouble',
            desc: t('DDLCheckFloatDouble'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableAutoincrementInit',
            desc: t('DDLEnableAutoincrementInit'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLPrimaryKeyMust',
            desc: t('DDLPrimaryKeyMust'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableAutoIncrement',
            desc: t('DDLEnableAutoIncrement'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableAutoincrementUnsigned',
            desc: t('DDLEnableAutoincrementUnsigned'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLIndexNameSpec',
            desc: t('DDLIndexNameSpec'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'CheckIdentifier',
            desc: t('CheckIdentifier'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableAcrossDBRename',
            desc: t('DDLEnableAcrossDBRename'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableDropTable',
            desc: t('DDLEnableDropTable'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableDropDatabase',
            desc: t('DDLEnableDropDatabase'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLAllowPRINotInt',
            desc: t('DDLAllowPRINotInt'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLEnableNullIndexName',
            desc: t('DDLEnableNullIndexName'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLMultiToCommit',
            desc: t('DDLMultiToCommit'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLAllowMultiAlter',
            desc: t('DDLAllowMultiAlter'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLAllowColumnType',
            desc: t('DDLAllowColumnType'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'DDLAllowChangeColumnPosition',
            desc: t('DDLAllowChangeColumnPosition'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'AllowCreateView',
            desc: t('AllowCreateView'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'AllowCreatePartition',
            desc: t('AllowCreatePartition'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'AllowSpecialType',
            desc: t('AllowSpecialType'),
            type: 'DDL',
            tp: 0
      },
      {
            name: 'SupportCollation',
            desc: t('SupportCollation'),
            type: 'DDL',
            tp: 2
      },
      {
            name: 'SupportCharset',
            desc: t('SupportCharset'),
            type: 'DDL',
            tp: 2
      },
      {
            name: 'MustHaveColumns',
            desc: t('MustHaveColumns'),
            type: 'DDL',
            tp: 2
      },
      {
            name: 'DDLMaxKeyParts',
            desc: t('DDLMaxKeyParts'),
            type: 'DDL',
            tp: 1
      },
      {
            name: 'DDLMaxKey',
            desc: t('DDLMaxKey'),
            type: 'DDL',
            tp: 1
      },
      {
            name: 'MaxDDLAffectRows',
            desc: t('MaxDDLAffectRows'),
            type: 'DDL',
            tp: 1
      },
      {
            name: 'DDLMaxCharLength',
            desc: t('DDLMaxCharLength'),
            type: 'DDL',
            tp: 1
      },
      {
            name: 'MaxTableNameLen',
            desc: t('MaxTableNameLen'),
            type: 'DDL',
            tp: 1
      },
      {
            name: 'DMLMaxInsertRows',
            desc: t('DMLMaxInsertRows'),
            type: 'DML',
            tp: 1
      },
      {
            name: 'DMLAllowLimitSTMT',
            desc: t('DMLAllowLimitSTMT'),
            type: 'DML',
            tp: 0
      },
      {
            name: 'DMLAllowInsertNull',
            desc: t('DMLAllowInsertNull'),
            type: 'DML',
            tp: 0
      },
      {
            name: 'DDLImplicitTypeConversion',
            desc: t('DDLImplicitTypeConversion'),
            type: 'DML',
            tp: 0
      },
      {
            name: 'DMLInsertColumns',
            desc: t('DMLInsertColumns'),
            type: 'DML',
            tp: 0
      },
      {
            name: 'DMLWhere',
            desc: t('DMLWhere'),
            type: 'DML',
            tp: 0
      },
      {
            name: 'DMLOrder',
            desc: t('DMLOrder'),
            type: 'DML',
            tp: 0
      },
      {
            name: 'DMLSelect',
            desc: t('DMLSelect'),
            type: 'DML',
            tp: 0
      },
      {
            name: 'MaxAffectRows',
            desc: t('MaxAffectRows'),
            type: 'DML',
            tp: 1
      },
      {
            name: 'IsOSC',
            desc: t('IsOSC'),
            type: 'Online-DDL',
            tp: 0
      },
      {
            name: 'OscSize',
            desc: t('OscSize'),
            type: 'Online-DDL',
            tp: 1
      },
      {
            name: 'OSCExpr',
            desc: t('OSCExpr'),
            type: 'Online-DDL',
            tp: 3
      },
]


export {
      rule,
      Rule
}