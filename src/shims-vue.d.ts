declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'nprogress';

declare module 'vue-super-flow';

declare module 'sql-formatter';

declare module 'lodash-es';

declare module 'insert-css';
declare module 'marked';
