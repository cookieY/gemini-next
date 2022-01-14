<template>
      <div class="table-page-search-wrapper">
            <a-form>
                  <a-row :gutter="12">
                        <a-col :sm="8" :xs="24">
                              <a-form-item :label="$t('common.table.state')">
                                    <a-select v-model:value="expr.status">
                                          <a-select-option :value="7">{{ $t('order.state.all') }}</a-select-option>
                                          <a-select-option
                                                :value="OrderState.WAIT"
                                          >{{ $t('order.state.wait') }}</a-select-option>
                                          <a-select-option
                                                :value="OrderState.PROCESS"
                                          >{{ $t('order.state.process') }}</a-select-option>
                                          <a-select-option
                                                :value="OrderState.AUDIT"
                                          >{{ $t('order.state.audit') }}</a-select-option>
                                          <a-select-option
                                                :value="OrderState.SUCCESS"
                                          >{{ $t('order.state.success') }}</a-select-option>
                                          <a-select-option
                                                :value="OrderState.REJECT"
                                          >{{ $t('order.state.reject') }}</a-select-option>
                                          <a-select-option
                                                :value="OrderState.ERROR"
                                          >{{ $t('order.state.error') }}</a-select-option>
                                    </a-select>
                              </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="8">
                              <a-form-item :label="$t('common.table.type')">
                                    <a-select v-model:value="expr.type">
                                          <a-select-option :value="2">{{ $t('order.state.all') }}</a-select-option>
                                          <a-select-option :value="0">DDL</a-select-option>
                                          <a-select-option :value="1">DML</a-select-option>
                                    </a-select>
                              </a-form-item>
                        </a-col>
                        <template v-if="advanced">
                              <a-col :sm="8" :xs="24">
                                    <a-form-item :label="$t('common.table.post.user')">
                                          <a-input v-model:value="expr.user"></a-input>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item :label="$t('common.table.remark')">
                                          <a-input v-model:value="expr.desc"></a-input>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item :label="$t('common.table.post.time')">
                                          <a-range-picker
                                                v-model:value="picker"
                                                :ranges="{ '本周': [dayjs().startOf('week'), dayjs().endOf('week')], '本月': [dayjs().startOf('month'), dayjs().endOf('month')] }"
                                          />
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
import { ref, UnwrapRef, reactive } from "@vue/runtime-core";
import dayjs, { Dayjs } from 'dayjs';
import { OrderExpr } from "@/apis/orderPostApis"
import { OrderState } from "@/types"
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const advanced = ref(false)
const picker = ref<Dayjs[]>([])
const expr: UnwrapRef<OrderExpr> = reactive({

})

const onPicker = () => {
      const dateString = [] as string[]
      for (const i of picker.value) {
            dateString.push(i.format("YYYY-MM-DD"))
      }
      expr.picker = dateString
}

const toggleAdvanced = () => {
      advanced.value = !advanced.value
}

const search = () => {

}

const cancel = () => {

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
