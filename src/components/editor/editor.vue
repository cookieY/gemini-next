<template>
      <div id="editor" style="height: 400px"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { createSQLToken, beautyFunc, testFunc } from "@/components/editor/impl"
import { nextTick, onMounted, } from '@vue/runtime-core';


onMounted(() => {
      nextTick(() => {
            const model = monaco.editor.create(document.getElementById("editor") as HTMLElement, {
                  language: "sql",
                  fontSize: 16,
                  theme: "vs-dark",
                  automaticLayout: true

            });

            model.addAction(beautyFunc)
            model.addAction(testFunc)
      })

      // monaco.editor.defineTheme('myTheme', {
      //       base: 'vs-dark',
      //       inherit: true,
      //       rules: [{ background: 'EDF9FA', token: "theme" }],
      //       colors: {
      //             // 'editor.foreground': '#000000',
      //             'editor.background': '#2A2e37',
      //             // 'editorCursor.foreground': '#8B0000',
      //             'editor.lineHighlightBackground': '#3B3E49FF',
      //             'editorLineNumber.focusBorder': '#ffffff',
      //             'editor.selectionBackground': '#88000030',
      //             // 'editor.inactiveSelectionBackground': '#88000015'
      //       },
      // });
      // monaco.editor.setTheme('myTheme');

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
                        suggestions: createSQLToken(range)
                  }
            }
      });
})
</script>