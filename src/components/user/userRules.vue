<template>
      <a-modal v-model:visible="is_open" title="用户权限" @ok="editUserGroups" :width="800">
            <a-form layout="vertical">
                  <a-form-item label="用户名">
                        <span>{{ user }}</span>
                  </a-form-item>
                  <a-form-item label="权限组" v-show="props.isManager">
                        <a-transfer
                              :rowKey="record => record.group_id"
                              :render="item => `${item.name}`"
                              :titles="[' 全部', ' 已选']"
                              :data-source="rules.groups"
                              v-model:target-keys="rules.own"
                              :list-style="{
                                    width: '400px',
                                    height: '300px',
                              }"
                              show-search
                              @change="handleChange"
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
import { EditUserMargeGroupsApi, GetUserGroupsApi, GetUserMargeGroupsApi, RespGroups, Target } from "@/apis/user"
import CommonMixins from "@/mixins/common"
import { ref } from "vue"
import { AxiosResponse } from "axios"
import { Res } from "@/config/request";

const props = defineProps<{
      isManager: boolean,
}>()

const { is_open, turnState } = CommonMixins()

const user = ref("")

let rules = ref<RespGroups>(
      {
            groups: [],
            own: [],
            target: {} as Target,
      }
)

const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
      console.log('targetKeys: ', nextTargetKeys);
      console.log('direction: ', direction);
      console.log('moveKeys: ', moveKeys);
};

const marge = (groups: string[]) => {
      GetUserMargeGroupsApi(groups).then((res: AxiosResponse<Res<Target>>) => rules.value.target = res.data.payload)
}

const lazy = (u: string) => {
      GetUserGroupsApi(u).then((res: AxiosResponse<Res<RespGroups>>) => {
            rules.value = res.data.payload
      })
      user.value = u
}

const editUserGroups = () => {
      if (props.isManager) {
            EditUserMargeGroupsApi(rules.value.own, user.value).then(() => turnState())
      }
}

defineExpose({
      turnState,
      lazy
})

</script>