<template>
      <div class="table-page-search-wrapper">
            <a-form>
                  <a-row :gutter="12">
                        <a-col :sm="8" :xs="24">
                              <a-form-item :label="$t('user.form.user')">
                                    <a-input v-model:value="expr.username"></a-input>
                              </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="8">
                              <a-form-item :label="$t('user.form.dept')">
                                    <a-input v-model:value="expr.dept"></a-input>
                              </a-form-item>
                        </a-col>
                        <template v-if="advanced">
                              <a-col :sm="8" :xs="24">
                                    <a-form-item :label="$t('user.form.role')">
                                          <a-select placeholder="请选择" v-model:value="expr.rule">
                                                <a-select-option value="all">{{ $t('common.all') }}</a-select-option>
                                                <a-select-option
                                                      value="super"
                                                >{{ $t('common.super') }}</a-select-option>
                                                <a-select-option
                                                      value="guest"
                                                >{{ $t('user.role.guest') }}</a-select-option>
                                                <a-select-option
                                                      value="admin"
                                                >{{ $t('user.role.auditor') }}</a-select-option>
                                          </a-select>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item :label="$t('user.form.real_name')">
                                          <a-input v-model:value="expr.real_name"></a-input>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item :label="$t('user.form.email')">
                                          <a-input v-model:value="expr.email"></a-input>
                                    </a-form-item>
                              </a-col>
                        </template>
                        <a-col :xs="24" :sm="8">
                              <span
                                    class="table-page-search-submitButtons"
                                    :style="advanced && { overflow: 'hidden' } || {}"
                              >
                                    <a-button
                                          type="primary"
                                          @click="search"
                                    >{{ $t('common.search') }}</a-button>
                                    <a-button
                                          style="margin-left: 8px"
                                          @click="cancel"
                                    >{{ $t('common.cancel') }}</a-button>
                                    <a
                                          @click="toggleAdvanced"
                                          style="margin-left: 8px"
                                    >{{ advanced ? $t('common.pick') : $t('common.unfold') }}</a>
                              </span>
                        </a-col>
                  </a-row>
            </a-form>
      </div>
</template>

<script lang="ts"  setup>
import { ref, UnwrapRef, reactive, unref } from "@vue/runtime-core";
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
