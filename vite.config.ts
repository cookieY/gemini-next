import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
      base: "/front/",
      server: {
            proxy: {
                  '/fetch': {
                        target: 'http://127.0.0.1:8000'
                  },
                  '/login': {
                        target: 'http://127.0.0.1:8000'
                  },
                  '/api': {
                        target: 'http://127.0.0.1:8000'
                  },
                  '/downlaod/*': {
                        target: 'http://127.0.0.1:8000'
                  },
            },
      },
      plugins: [
            vue(),
            vueI18n({
                  // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
                  // compositionOnly: false,

                  // you need to set i18n resource including paths !
                  include: path.resolve(__dirname, './src/lang/**')
            })
      ],
      resolve: {
            alias: {
                  '@': path.resolve(__dirname, './src/'),
            }
      },
      css: {
            preprocessorOptions: {
                  less: {
                        javascriptEnabled: true
                  },
            }
      }
})
