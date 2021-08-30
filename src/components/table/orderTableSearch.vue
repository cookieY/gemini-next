<template>
      <div class="table-page-search-wrapper">
            <a-form>
                  <a-row :gutter="12">
                        <a-col :sm="8" :xs="24">
                              <a-form-item label="当前状态">
                                    <a-select placeholder="请选择" v-model:value="expr.status">
                                          <a-select-option :value="7">全部</a-select-option>
                                          <a-select-option :value="OrderState.WAIT">待执行</a-select-option>
                                          <a-select-option :value="OrderState.PROCESS">执行中</a-select-option>
                                          <a-select-option :value="OrderState.AUDIT">审核中</a-select-option>
                                          <a-select-option :value="OrderState.SUCCESS">已执行</a-select-option>
                                          <a-select-option :value="OrderState.REJECT">已驳回</a-select-option>
                                          <a-select-option :value="OrderState.ERROR">执行失败</a-select-option>
                                    </a-select>
                              </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="8">
                              <a-form-item label="工单类型">
                                    <a-select placeholder="请选择" v-model:value="expr.type">
                                          <a-select-option :value="2">全部</a-select-option>
                                          <a-select-option :value="0">DDL</a-select-option>
                                          <a-select-option :value="1">DML</a-select-option>
                                    </a-select>
                              </a-form-item>
                        </a-col>
                        <template v-if="advanced">
                              <a-col :sm="8" :xs="24">
                                    <a-form-item label="提交人">
                                          <a-input v-model:value="expr.user"></a-input>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item label="工单备注">
                                          <a-input v-model:value="expr.desc"></a-input>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item label="提交时间">
                                          <a-range-picker
                                                v-model:value="picker"
                                                placeholder="请输入提交日期"
                                                :ranges="{ '本周': [moment().startOf('week'), moment().endOf('week')], '本月': [moment().startOf('month'), moment().endOf('month')] }"
                                          />
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
                                    <a @click="toggleAdvanced" style="margin-left: 8px">
                                          {{ advanced ? '收起' : '展开' }}
                                          <!-- <a-icon :type="advanced ? 'up' : 'down'" /> -->
                                    </a>
                              </span>
                        </a-col>
                  </a-row>
            </a-form>
      </div>
</template>

<script lang="ts"  setup>
import { ref, UnwrapRef, reactive } from "@vue/runtime-core";
import moment from "moment";
import { OrderExpr, OrderState } from "../../apis/orderTableApis"

const advanced = ref(false)
const picker = ref<moment.Moment[]>([])
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
