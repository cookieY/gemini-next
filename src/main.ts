import { createApp } from 'vue'
import App from './App.vue'
import routes from '@/router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(Antd).use(routes).mount('#app')
