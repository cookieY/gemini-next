import { createApp } from 'vue'
import App from './App.vue'
import routes from '@/router'
import Antd from 'ant-design-vue';
import './style/theme.less';

createApp(App).use(Antd).use(routes).mount('#app')
