<template>
      <div :id="props.containerId" :style="{ height: props.height + 'px' }"></div>
</template>
<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { createSQLToken, beautyFunc, testFunc } from "@/components/editor/impl"
import { nextTick, defineExpose, onMounted, onUnmounted } from '@vue/runtime-core';
interface Props {
      containerId: string,
      height?: number,
      readonly?: boolean
}
const props = withDefaults(defineProps<Props>(), {
      containerId: "",
      height: 400,
      readonly: false
})

let model = {} as monaco.editor.IStandaloneCodeEditor

const RunEditor = (highlight: { [key: string]: string }[]) => {

      monaco.languages.registerCompletionItemProvider('sql', {
            provideCompletionItems: (model, position): monaco.languages.ProviderResult<monaco.languages.CompletionList> => {
                  let word = model.getWordUntilPosition(position);
                  let range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                  };
                  return {
                        suggestions: createSQLToken(range, highlight)
                  }
            }
      });
}

const ChangeEditorText = (sql: string) => {
      model.setValue(sql)
}

onMounted(() => {

      model = monaco.editor.create(document.getElementById(props.containerId) as HTMLElement, {
            language: "sql",
            fontSize: 16,
            theme: "vs-dark",
            automaticLayout: true,
            readOnly: props.readonly

      });

      model.addAction(beautyFunc)
      model.addAction(testFunc)

})

onUnmounted(() => {
      model.dispose()
})



defineExpose({
      RunEditor,
      ChangeEditorText
})

</script>