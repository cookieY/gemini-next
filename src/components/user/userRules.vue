<template>
      <a-modal v-model:visible="is_open" title="用户权限" @ok="editUserGroups">
            <a-form>
                  <a-form-item label="用户名">
                        <span>{{ user }}</span>
                  </a-form-item>
                  <a-form-item label="权限组" v-show="props.isManager">
                        <a-select v-model:value="rules.own" mode="multiple" @change="marge">
                              <a-select-option
                                    v-for="i in rules.groups"
                                    :key="i.id"
                                    :value="i.name"
                              >{{ i.name }}</a-select-option>
                        </a-select>
                  </a-form-item>

                  <a-form-item label="DDL数据源">
                        <a-tag color="green" v-for="i in rules.target.ddl_source" :key="i">{{ i }}</a-tag>
                  </a-form-item>
                  <a-form-item label="DML数据源">
                        <a-tag color="cyan" v-for="i in rules.target.dml_source" :key="i">{{ i }}</a-tag>
                  </a-form-item>
                  <a-form-item label="查询数据源">
                        <a-tag color="blue" v-for="i in rules.target.query_source" :key="i">{{ i }}</a-tag>
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
            target: {} as Target
      }
)

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