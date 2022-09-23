<template>
  <a-modal
    v-model:visible="is_open"
    :title="$t('user.policy')"
    :width="800"
    :ok-text="$t('common.save')"
    @ok="editUserGroups"
  >
    <a-form layout="vertical">
      <a-form-item :label="$t('user.form.user')">
        <span>{{ account }}</span>
      </a-form-item>
      <a-form-item v-show="props.isManager" :label="$t('common.policy')">
        <a-transfer
          v-model:target-keys="rules.own"
          :row-key="(record:any) => record.group_id"
          :render="(item:any) => `${item.name}`"
          :titles="[' ' + $t('common.all'), ' ' + $t('common.selected')]"
          :data-source="rules.groups"
          :list-style="{
            width: '400px',
            height: '300px',
          }"
          show-search
        >
          <template #render="item">
            <a-tooltip>
              <template #title>prompt text</template>
              <span>{{ item.name }}</span>
            </a-tooltip>
          </template>
        </a-transfer>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import {
    getUserGroups,
    RespGroups,
    Target,
    updateUserGroups,
  } from '@/apis/user';
  import CommonMixins from '@/mixins/common';
  import { ref } from 'vue';

  const props = defineProps<{
    isManager: boolean;
  }>();

  const { is_open, turnState } = CommonMixins();

  const account = ref('');

  let rules = ref<RespGroups>({
    groups: [],
    own: [],
    target: {} as Target,
  });

  const lazy = async (user: string) => {
    const { data } = await getUserGroups(user);
    rules.value = data.payload;
    account.value = user;
  };

  const editUserGroups = async () => {
    await updateUserGroups(rules.value.own, account.value);
    turnState();
  };

  defineExpose({
    turnState,
    lazy,
  });
</script>
