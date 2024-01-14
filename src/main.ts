import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import { createGuard } from '@authing/guard-vue3'
import type { GuardOptions } from '@authing/guard-vue3'
import '@authing/guard-vue3/dist/esm/guard.min.css'
import store from '../src/components/Store.js'

const guardOptions: GuardOptions = {
    appId: '659b2eb96bdd76001d515666'
}

const app = createApp(App)
app.use(
    createGuard(guardOptions)
);
app.use(router)
app.use(store)


store.dispatch('fetchUserInfo') // 在这里调用action获取用户信息
app.mount('#app')
