import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { MysqlKeywords } from '@/components/editor/keyword'

const createSQLToken = (range: any, exact: { [key: string]: string }[]): monaco.languages.CompletionItem[] => {
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

      exact.forEach((item: { [key: string]: string }) => {
            token.push(
                  {
                        label: item.vl,
                        kind: monaco.languages.CompletionItemKind.Field,
                        insertText: item.vl,
                        range: range,
                        detail: item.meta
                  }
            )
      });

      return token
}

export { createSQLToken }