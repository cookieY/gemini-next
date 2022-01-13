import * as monaco from 'monaco-editor';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';


self.MonacoEnvironment.getWorkerUrl = function () {
      return "./sql.worker.js";
}

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);