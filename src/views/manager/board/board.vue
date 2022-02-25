<template>
      <PageHeader :title="title.title" :subTitle="title.subTitle"></PageHeader>
      <div id="mavon-editor-id">
            <Editor
                  v-model="editValue"
                  previewBackground="#2A2e37"
                  toolbarsBackground="#2A2e37"
                  editorBackground="#2A2e37"
                  :ishljs="true"
                  @save="(vl) => request.Post(vl)"
            />
      </div>
</template>

<script lang="ts" setup>
import mavonEditor from 'mavon-editor'
import PageHeader from '@/components/pageHeader/pageHeader.vue';
import { Request } from "@/apis/board"
import 'mavon-editor/dist/css/index.css'
import { onMounted, ref } from 'vue';
import { AxiosResponse } from 'axios';
import { Res } from '@/config/request';

const Editor = mavonEditor.mavonEditor

const editValue = ref('')

const request = new Request()

const title = {
      title: "公告",
      subTitle: "主页公告栏内容编辑"
}

onMounted(() => {
      request.Get().then((res: AxiosResponse<Res<string>>) => editValue.value = res.data.payload)
})

</script>

<style lang="less">
.v-note-edit {
      background-color: #2a2e37;

      .auto-textarea-wrapper .auto-textarea-input {
            font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New",
                  "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei",
                  sans-serif;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            margin: 0;
            padding: 0;
            overflow-y: hidden;
            color: #ffffff;
            background-color: #2a2e37;
      }
}

.v-note-wrapper .v-note-panel .v-note-show {
      flex: 0 0 50%;
      width: 50%;
      overflow-y: auto;
      padding: 0 0;
      transition: all 0.2s linear 0s;
      color: #ffffff;
}
</style>