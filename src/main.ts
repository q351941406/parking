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
    appId: '65d8b5d805fe059574b1ff72',
    redirectUri:`${import.meta.env.VITE_APP_API_BASE_URL}/auth/loginCallback`,
    // redirectUri:`${window.location.origin}/callback`,
}

const app = createApp(App)
app.use(
    createGuard(guardOptions)
);
app.use(router)
app.use(store)


store.dispatch('fetchUserInfo') // 在这里调用action获取用户信息
app.mount('#app')
