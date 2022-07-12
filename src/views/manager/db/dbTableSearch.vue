<template>
      <div class="table-page-search-wrapper">
            <a-form>
                  <a-row :gutter="12">
                        <a-col :sm="8" :xs="24">
                              <a-form-item :label="$t('common.table.name')">
                                    <a-input v-model:value="expr.source"></a-input>
                              </a-form-item>
                        </a-col>
                        <a-col :sm="8" :xs="24">
                              <a-form-item label="ip">
                                    <a-input v-model:value="expr.ip"></a-input>
                              </a-form-item>
                        </a-col>
                        <template v-if="advanced">
                              <a-col :sm="8" :xs="24">
                                    <a-form-item :label="$t('common.table.type')">
                                          <a-select v-model:value="expr.is_query">
                                                <a-select-option :value="-1">{{ $t('common.all') }}</a-select-option>
                                                <a-radio :value="2">{{ $t('db.rw') }}</a-radio>
                                                <a-radio :value="0">{{ $t('db.w') }}</a-radio>
                                                <a-radio :value="1">{{ $t('db.r') }}</a-radio>
                                          </a-select>
                                    </a-form-item>
                              </a-col>
                              <a-col :xs="24" :sm="8">
                                    <a-form-item :label="$t('common.table.env')">
                                          <a-select v-model:value="expr.idc">
                                                <a-select-option v-for="i in idc" :key="i" :value="i">{{ i }}
                                                </a-select-option>
                                          </a-select>
                                    </a-form-item>
                              </a-col>
                        </template>
                        <a-col :xs="24" :sm="8" :offset="advanced ? 8 : 0">
                              <span class="table-page-search-submitButtons"
                                    :style="advanced && { overflow: 'hidden' } || {}">
                                    <a-button type="primary" @click="search">{{ $t('common.query') }}</a-button>
                                    <a-button style="margin-left: 8px" @click="cancel">{{ $t('common.cancel') }}
                                    </a-button>
                                    <a @click="toggleAdvanced" style="margin-left: 8px">{{ advanced ? $t('common.pick')
                                                :
                                                $t('common.unfold')
                                    }}</a>
                              </span>
                        </a-col>
                  </a-row>
            </a-form>
      </div>
</template>

<script lang="ts" setup>
import { DBExpr } from "@/apis/db";
import { useStore } from "@/store";
import { UnwrapRef, reactive, ref, unref, computed } from "vue"

const store = useStore()

const advanced = ref(false)

const emit = defineEmits(['search'])

const expr: UnwrapRef<DBExpr> = reactive({
      idc: "",
      ip: "",
      source: "",
      is_query: -1
})

const idc = computed(() => {
      return store.state.common.idc
})

const initExpr = Object.assign({}, expr)

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