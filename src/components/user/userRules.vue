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
        <span>{{ user }}</span>
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
  import { Request, RespGroups, Target } from '@/apis/user';
  import CommonMixins from '@/mixins/common';
  import { ref } from 'vue';
  import { AxiosResponse } from 'axios';
  import { Res } from '@/config/request';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const props = defineProps<{
    isManager: boolean;
  }>();

  const { is_open, turnState } = CommonMixins();

  const user = ref('');

  const request = new Request();

  let rules = ref<RespGroups>({
    groups: [],
    own: [],
    target: {} as Target,
  });

  const marge = (groups: string[]) => {
    request
      .MargeGroup(groups)
      .then(
        (res: AxiosResponse<Res<Target>>) =>
          (rules.value.target = res.data.payload)
      );
  };

  const lazy = (u: string) => {
    request.GetGroup(u).then((res: AxiosResponse<Res<RespGroups>>) => {
      rules.value = res.data.payload;
    });
    user.value = u;
  };

  const editUserGroups = () => {
    if (props.isManager) {
      request.EditGroup(rules.value.own, user.value).then(() => turnState());
    }
  };

  defineExpose({
    turnState,
    lazy,
  });
</script>
