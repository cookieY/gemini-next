<template>
  <div class="table-page-search-wrapper">
    <a-form>
      <a-row :gutter="12">
        <a-col :sm="8" :xs="24">
          <a-form-item :label="$t('common.table.post.time')">
            <a-range-picker
              v-model:value="expr.picker"
              :ranges="ranges"
              format="YYYY-MM-DD HH:mm"
              show-time
            >
            </a-range-picker>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="8">
          <a-form-item :label="$t('common.table.type')">
            <a-select v-model:value="expr.type">
              <a-select-option :value="2">{{
                $t('order.state.all')
              }}</a-select-option>
              <a-select-option :value="0">DDL</a-select-option>
              <a-select-option :value="1">DML</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <template v-if="advanced">
          <a-col :sm="8" :xs="24">
            <a-form-item :label="$t('common.table.post.user')">
              <a-input v-model:value="expr.username"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="8">
            <a-form-item :label="$t('common.table.remark')">
              <a-input v-model:value="expr.text"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="8">
            <a-form-item :label="$t('common.table.state')">
              <a-select v-model:value="expr.status">
                <a-select-option :value="7"
                  >{{ $t('order.state.all') }}
                </a-select-option>
                <a-select-option :value="OrderState.WAIT"
                  >{{ $t('order.state.wait') }}
                </a-select-option>
                <a-select-option :value="OrderState.PROCESS">{{
                  $t('order.state.process')
                }}</a-select-option>
                <a-select-option :value="OrderState.AUDIT"
                  >{{ $t('order.state.audit') }}
                </a-select-option>
                <a-select-option :value="OrderState.SUCCESS">{{
                  $t('order.state.success')
                }}</a-select-option>
                <a-select-option :value="OrderState.REJECT">{{
                  $t('order.state.reject')
                }}</a-select-option>
                <a-select-option :value="OrderState.ERROR"
                  >{{ $t('order.state.error') }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="8">
            <a-form-item :label="$t('common.table.work_id')">
              <a-input v-model:value="expr.work_id"></a-input>
            </a-form-item>
          </a-col>
        </template>
        <a-col :xs="24" :sm="8">
          <span
            class="table-page-search-submitButtons"
            :style="(advanced && { overflow: 'hidden' }) || {}"
          >
            <a-space>
              <a-button type="primary" @click="search">{{
                $t('common.search')
              }}</a-button>
              <a-button style="margin-left: 8px" @click="cancel"
                >{{ $t('common.cancel') }}
              </a-button>
              <a style="margin-left: 8px" @click="toggleAdvanced">{{
                advanced ? $t('common.pick') : $t('common.unfold')
              }}</a>
            </a-space>
          </span>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import dayjs from 'dayjs';
  import { OrderExpr, RangeValue } from '@/apis/orderPostApis';
  import { OrderState } from '@/types';

  const advanced = ref(false);

  const ranges = {
    'This week': [dayjs().startOf('week'), dayjs().endOf('week')] as RangeValue,
    'This month': [
      dayjs().startOf('month'),
      dayjs().endOf('month'),
    ] as RangeValue,
  };

  const expr = ref<OrderExpr>({
    status: 7,
    type: 2,
    text: '',
    username: '',
  });

  let init_expr = {} as OrderExpr;

  const emit = defineEmits(['search']);

  const toggleAdvanced = () => {
    advanced.value = !advanced.value;
  };

  const search = () => {
    emit('search', expr.value);
  };

  const cancel = () => {
    expr.value = Object.assign({}, init_expr);
    emit('search', expr.value);
  };

  onMounted(() => {
    init_expr = Object.assign({}, expr.value);
  });
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
