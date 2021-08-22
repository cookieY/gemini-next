import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { MysqlKeywords } from '@/components/editor/keyword'
import { format } from 'sql-formatter';

const beautyFunc: monaco.editor.IActionDescriptor = {
      id: 'ms-beauty',
      label: 'SQL美化',
      keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B,
      ],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: function (ed: monaco.editor.ICodeEditor) {
            console.log(ed.getValue())
            console.log(format("select * from c where id =2 and u = '1'", { language: "mysql" }))
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
            console.log(ed.getValue())
            console.log(format("select * from c where id =2 and u = '1'", { language: "mysql" }))
            ed.setValue(format(ed.getValue()))

      }
}

const createSQLToken = (range: any): monaco.languages.CompletionItem[] => {
      let token = [] as any
      MysqlKeywords.forEach((item: string) => {
            token.push(
                  {
                        label: `"${item}"`,
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: `${item}`,
                        range: range,
                        detail: "关键字"
                  }
            )
      })
      return token
}

export { createSQLToken, beautyFunc, testFunc }