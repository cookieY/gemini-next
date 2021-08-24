<template>
      <a-steps type="navigation" size="small">
            <a-step
                  title="Step 1"
                  sub-title="00:00:05"
                  status="process"
                  description="This is a description."
            />
            <a-step
                  title="Step 2"
                  sub-title="00:01:02"
                  status="wait"
                  description="This is a description."
            />
            <a-step
                  title="Step 3"
                  sub-title="waiting for longlong time"
                  status="wait"
                  description="This is a description."
            />
      </a-steps>
      <br />
      <a-row :gutter="24" type="flex" justify="center" align="middle">
            <a-col :sm="24" :md="8" :xl="8">
                  <a-form v-bind="layout">
                        <a-form-item label="工单类型">
                              <a-input disabled v-model:value="o"></a-input>
                        </a-form-item>
                        <a-form-item label="环境">
                              <a-input disabled v-model:value="o"></a-input>
                        </a-form-item>
                        <a-form-item label="数据源">
                              <a-input disabled v-model:value="o"></a-input>
                        </a-form-item>
                        <a-form-item label="库名">
                              <a-select></a-select>
                        </a-form-item>
                        <a-form-item label="表名">
                              <a-select></a-select>
                        </a-form-item>
                        <a-form-item label="操作">
                              <a-row type="flex" justify="end" align="middle">
                                    <a-button block>提交工单</a-button>
                              </a-row>
                        </a-form-item>
                  </a-form>
            </a-col>
            <a-col :sm="24" :md="16" :xl="16">
                  <Editor container-id="applys"></editor>
            </a-col>
      </a-row>
      <br />
      <a-table :columns="col" :data-source="tData" bordered></a-table>
</template>
<script lang="ts"  setup>
import Editor from '@/components/editor/editor.vue';
import JunoMixin from '@/mixins/juno'

const o = "xxxx"
const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
};

const {col} = JunoMixin() 

const tData = [
      {
            status: 1,
            level: 1,
            error: "xxxx",
            sql: "select * from core",
            affect_rows: 500
      }
]

</script>