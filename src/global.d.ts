import { VueElement } from 'vue';

declare global {
  interface Window {
    MonacoEnvironment: any;
  }
}
