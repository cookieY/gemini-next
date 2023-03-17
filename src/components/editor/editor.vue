<template>
  <div :id="props.containerId" :style="{ height: `${height / 4}px` }"></div>
  <a-alert
    :message="$t('common.editor.tips')"
    type="info"
    style="margin-top: 1%"
  />
</template>

<script setup lang="ts">
  import * as monaco from 'monaco-editor';
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import { onMounted, onUnmounted, ref } from 'vue';
  import { format } from 'sql-formatter';
  import { mergeDDLSTMT } from '@/apis/orderPostApis';
  import { useI18n } from 'vue-i18n';
  import { useElementSize } from '@vueuse/core';

  self.MonacoEnvironment = {
    getWorker() {
      return new editorWorker();
    },
  };

  interface Props {
    containerId: string;
    readonly?: boolean;
    isQuery?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    containerId: '',
    readonly: false,
    isQuery: false,
  });

  const emit = defineEmits(['getValues', 'changeContent']);

  const { t } = useI18n();

  let model = {} as monaco.editor.IStandaloneCodeEditor;

  let completionProvider: any;

  const beautyFunc: monaco.editor.IActionDescriptor = {
    id: 'ms-beauty',
    label: t('query.editor.beauty'),
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B],
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    run: function (ed: monaco.editor.ICodeEditor) {
      ed.setValue(format(ed.getValue()));
    },
  };

  const mergeDDL: monaco.editor.IActionDescriptor = {
    id: 'ms-merge',
    label: t('query.editor.merge'),
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M],
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    run: async function (ed: monaco.editor.ICodeEditor) {
      let s = ed.getModel() as monaco.editor.ITextModel;
      let sel = s.getValueInRange(ed.getSelection() as monaco.Selection);
      let sqls = '';
      if (sel !== '') {
        sqls = sel;
      } else {
        sqls = ed.getValue();
      }
      const { data } = await mergeDDLSTMT(sqls);
      ed.setValue(data.payload);
    },
  };

  const GetValueFunc: monaco.editor.IActionDescriptor = {
    id: 'ms-test',
    label: props.isQuery ? t('query.editor.query') : t('query.editor.test'),
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_E],
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    run: function (ed: monaco.editor.ICodeEditor) {
      let s = ed.getModel() as monaco.editor.ITextModel;
      let sel = s.getValueInRange(ed.getSelection() as monaco.Selection);
      if (!props.isQuery) {
        emit('getValues', ed.getValue());
        return;
      }
      if (sel !== '') {
        emit('getValues', sel);
      } else {
        emit('getValues', ed.getValue());
      }
    },
  };

  const ChangeEditorText = (sql: string) => {
    model.setValue(sql);
  };

  const GetValue = () => {
    return model.getValue();
  };

  //   const height = ref(250);

  const { height } = useElementSize(
    document.getElementById('app') as HTMLElement
  );

  onMounted(() => {
    model = monaco.editor.create(
      document.getElementById(props.containerId) as HTMLElement,
      {
        language: 'sql',
        fontSize: 16,
        theme:
          localStorage.getItem('theme') === 'light' ? 'vs-light' : 'vs-dark',
        automaticLayout: true,
        readOnly: props.readonly,
        accessibilityHelpUrl: 'https://next.yearning.io',
      }
    );
    model.addAction(beautyFunc);
    model.addAction(GetValueFunc);
    props.isQuery ? null : model.addAction(mergeDDL);
    model.focus();
    model.onDidChangeModelContent(() => {
      emit('changeContent');
    });
  });

  onUnmounted(() => {
    model.dispose();
    completionProvider !== undefined ? completionProvider.dispose() : null;
  });

  defineExpose({
    ChangeEditorText,
    GetValue,
  });
</script>
