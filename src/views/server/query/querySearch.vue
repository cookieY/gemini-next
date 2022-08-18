<template>
      <div class="table-page-search-wrapper">
            <a-form>
                  <a-row :gutter="12">
                        <a-col :xs="24" :sm="8">
                              <a-form-item :label="$t('order.query.table.work_id')">
                                    <a-input v-model:value="expr.work_id"></a-input>
                              </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="8">
                              <a-form-item :label="$t('order.query.table.username')">
                                    <a-input v-model:value="expr.username"></a-input>
                              </a-form-item>
                        </a-col>
                        <template v-if="advanced">
                              <a-col :xs="24" :sm="8">
                                    <a-form-item :label="$t('order.query.table.status')">
                                          <a-select v-model:value="expr.status">
                                                <a-select-option :value="7">{{ $t('common.all') }}</a-select-option>
                                                <a-select-option :value="1">{{ $t('order.state.audit') }}
                                                </a-select-option>
                                                <a-select-option :value="2">{{ $t('order.query.audit.state.process') }}
                                                </a-select-option>
                                                <a-select-option :value="3">{{ $t('order.query.audit.state.done') }}
                                                </a-select-option>
                                                <a-select-option :value="4">{{ $t('order.state.reject') }}
                                                </a-select-option>
                                          </a-select>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item :label="$t('order.query.table.real_name')">
                                          <a-input v-model:value="expr.real_name"></a-input>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item :label="$t('order.query.table.time')">
                                          <a-range-picker v-model:value="expr.picker" format="YYYY-MM-DD HH:mm"
                                                show-time
                                                :ranges="{ 'This week': [dayjs().startOf('week'), dayjs().endOf('week')], 'This month': [dayjs().startOf('month'), dayjs().endOf('month')] }" />
                                    </a-form-item>
                              </a-col>
                        </template>
                        <a-col :xs="24" :sm="8">
                              <span class="table-page-search-submitButtons"
                                    :style="advanced && { overflow: 'hidden' } || {}">
                                    <a-button type="primary" @click="search">{{ $t('common.search') }}</a-button>
                                    <a-button style="margin-left: 8px" @click="cancel">{{ $t('common.cancel') }}
                                    </a-button>
                                    <a @click="toggleAdvanced" style="margin-left: 8px">{{ advanced ? $t('common.pick')
                                                : $t('common.unfold')
                                    }}</a>
                              </span>
                        </a-col>
                  </a-row>
            </a-form>
      </div>
</template>

<script lang="ts" setup>
import { QueryExpr } from '@/apis/query';
import { ref, unref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

const emit = defineEmits(['search'])


let expr = ref<QueryExpr>({
      username: "",
      status: 7,
      work_id: "",
      export: 0,
      real_name: "",
})

const initExpr = Object.assign({}, expr.value)

const advanced = ref(false)

const cancel = () => {
      expr.value = Object.assign({}, initExpr)
      emit('search', unref(initExpr))
}

const search = () => {
      emit('search', expr.value)
}

const toggleAdvanced = () => {
      advanced.value = !advanced.value
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

                  >.ant-form-item-label {
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
