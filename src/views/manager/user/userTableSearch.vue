<template>
      <div class="table-page-search-wrapper">
            <a-form>
                  <a-row :gutter="12">
                        <a-col :sm="8" :xs="24">
                              <a-form-item label="用户名">
                                    <a-input v-model:value="expr.username"></a-input>
                              </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="8">
                              <a-form-item label="部门">
                                    <a-input v-model:value="expr.dept"></a-input>
                              </a-form-item>
                        </a-col>
                        <template v-if="advanced">
                              <a-col :sm="8" :xs="24">
                                    <a-form-item label="角色">
                                          <a-select placeholder="请选择" v-model:value="expr.rule">
                                                <a-select-option value="all">全部</a-select-option>
                                                <a-select-option value="super">超级管理员</a-select-option>
                                                <a-select-option value="guest">普通用户</a-select-option>
                                                <a-select-option value="admin">审核用户</a-select-option>
                                          </a-select>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item label="真实姓名">
                                          <a-input v-model:value="expr.real_name"></a-input>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item label="邮箱">
                                          <a-input v-model:value="expr.email"></a-input>
                                    </a-form-item>
                              </a-col>
                        </template>
                        <a-col :xs="24" :sm="8">
                              <span
                                    class="table-page-search-submitButtons"
                                    :style="advanced && { overflow: 'hidden' } || {}"
                              >
                                    <a-button type="primary" @click="search">查询</a-button>
                                    <a-button style="margin-left: 8px" @click="cancel">重置</a-button>
                                    <a
                                          @click="toggleAdvanced"
                                          style="margin-left: 8px"
                                    >{{ advanced ? '收起' : '展开' }}</a>
                              </span>
                        </a-col>
                  </a-row>
            </a-form>
      </div>
</template>

<script lang="ts"  setup>
import { ref, UnwrapRef, reactive, defineEmits, unref } from "@vue/runtime-core";
import { UserExpr } from "@/apis/user";

const advanced = ref(false)
const expr: UnwrapRef<UserExpr> = reactive({
      username: "",
      dept: "",
      real_name: "",
      rule: "all",
      email: ""
})

const initExpr = Object.assign({}, expr)

const emit = defineEmits(['search'])

const toggleAdvanced = () => {
      advanced.value = !advanced.value
}

const search = () => {
      emit('search', expr)
}

const cancel = () => {
      emit('search', Object.assign(expr, unref(initExpr)))
}

</script>


<style lang="less" scoped>
.table-page-search-wrapper {
      .ant-form-inline {
            .ant-form-item {
                  display: flex;
                  margin-bottom: 24px;
                  margin-right: 0;
                  .ant-form-item-control-wrapper {
                        flex: 1 1;
                        display: inline-block;
                        vertical-align: middle;
                  }

                  > .ant-form-item-label {
                        line-height: 32px;
                        padding-right: 5px;
                  }
                  .ant-form-item-control {
                        height: 32px;
                        line-height: 32px;
                  }
            }
      }

      .table-page-search-submitButtons {
            display: block;
            margin-bottom: 24px;
            white-space: nowrap;
      }
}
</style>
