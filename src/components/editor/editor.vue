<template>
      <div :id="props.containerId" style="height: 400px"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { createSQLToken, beautyFunc, testFunc } from "@/components/editor/impl"
import { nextTick, onMounted, } from '@vue/runtime-core';

const props = defineProps<{
      containerId: string,
}>()


onMounted(() => {

      nextTick(() => {
            const model = monaco.editor.create(document.getElementById(props.containerId) as HTMLElement, {
                  language: "sql",
                  fontSize: 16,
                  theme: "vs-dark",
                  automaticLayout: true

            });

            model.addAction(beautyFunc)
            model.addAction(testFunc)
      })

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