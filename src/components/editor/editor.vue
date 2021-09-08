<template>
      <div :id="props.containerId" :style="{ height: props.height + 'px' }"></div>
</template>
<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { createSQLToken } from "@/components/editor/impl"
import { defineExpose, onMounted, onUnmounted } from '@vue/runtime-core';
import { format } from 'sql-formatter';

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

const emit = defineEmits(['testResults'])

const beautyFunc: monaco.editor.IActionDescriptor = {
      id: 'ms-beauty',
      label: 'SQL美化',
      keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B,
      ],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: function (ed: monaco.editor.ICodeEditor) {
            ed.setValue(format(ed.getValue()))

      }
}

const testFunc: monaco.editor.IActionDescriptor = {
      id: 'ms-test',
      label: 'SQL检测',
      keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_R,
      ],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: function (ed: monaco.editor.ICodeEditor) {
            emit("testResults", ed.getValue())
      }
}

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

const GetValue = () => {
      return model.getValue()
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
      ChangeEditorText,
      GetValue
})

</script>