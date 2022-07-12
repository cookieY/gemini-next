<template>
      <PageHeader :title="$t('menu.manage.policy')" :subTitle="$t('common.policy.sub')"></PageHeader>
      <a-card>
            <RuleTable></RuleTable>
      </a-card>
</template>
<script lang="ts" setup>
import PageHeader from "@/components/pageHeader/pageHeader.vue";
import RuleTable from "./policyTable.vue";
</script>