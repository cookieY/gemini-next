import { createApp } from 'vue'
import App from './App.vue'
import routes from '@/router'
import Antd from 'ant-design-vue';
import { store, key } from '@/store/index'
import './style/theme.less';

createApp(App).use(store, key).use(Antd).use(routes).mount('#app')
